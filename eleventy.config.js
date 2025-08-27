import path from "node:path";
import feedPlugin from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import dateFilter from "nunjucks-date-filter";
import pluginIcons from "eleventy-plugin-icons";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import markdownItFootnote from "markdown-it-footnote";
import { createMathjaxInstance, mathjax } from "@mdit/plugin-mathjax";
import htmlmin from "html-minifier-terser";
import * as sass from "sass";
import videoPreprocessor from "./videoPreprocessor.js";

const OUTPUT_DIR = "dist";

export default function(eleventyConfig) {
	/* Built-in filters */
	const slugify = eleventyConfig.getFilter("slugify");

	/* Plugins */
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		urlPath: "/assets/img/",
		outputDir: `./${OUTPUT_DIR}/assets/img`,
		widths: ["auto"],
		formats: ["webp"],
		htmlOptions: {
			imgAttributes: {
				// loading: "lazy",
			}
		},
		sharpOptions: {
			animated: true
		},
		failOnError: false,
		statsOnly: process.env.IMAGES_STATS_ONLY ? true : false,
	});
	eleventyConfig.addPlugin(feedPlugin);
	eleventyConfig.addPlugin(pluginIcons, {
		sources: [
			{ name: 'heroicons', path: 'node_modules/heroicons/16/solid', default: true },
			{ name: 'si', path: 'node_modules/simple-icons/icons' },
		]
	});

	/* Template Engine Plugins */
	eleventyConfig.amendLibrary("md", (md) => {
		return md
			.enable("code")
			.use(markdownItAnchor)
			.use(markdownItAttrs)
			.use(markdownItFootnote)
			.use(mathjax, createMathjaxInstance({ output: "chtml" }))
	});
	eleventyConfig.amendLibrary("njk", (njk) => {
		return njk.addFilter('date', dateFilter);
	});
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		useLayouts: true,
		compile: async function(inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			if (parsed.name.startsWith("_")) return;

			let result = sass.compileString(inputContent, {
				loadPaths: [parsed.dir || ".", this.config.dir.includes,]
			})

			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css
			}
		}
	})

	eleventyConfig.addTemplateFormats("scss");

	/* Template Preprocessors */
	eleventyConfig.addPreprocessor("video-preprocess", "md", videoPreprocessor);

	/* Template Transforms */
	// https://www.11ty.dev/docs/transforms/#minify-html-output
	eleventyConfig.addTransform("htmlmin", function(content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
			});
			return minified;
		}
		return content;
	});


	/* Filters */
	eleventyConfig.addFilter("siteTitle", function(title) {
		return `${title ? `${title} | ` : ``} ${this.ctx.meta.title}`;
	});

	eleventyConfig.addFilter("getGlobalData", function(key) {
		return this.ctx[key]
	})

	eleventyConfig.addFilter("markdownify", function(content) {
		return markdownIt().render(content)
	})

	eleventyConfig.addFilter("takeThree",
		/**
		 * 
		 * @param {any[]} array 
		 * @returns first 3 items from array
		 */
		function(array) {
			return array.slice(0, 3);
		});

	eleventyConfig.addFilter("keys", function(object) { return Object.keys(object) });

	/* Custom Shortcodes */
	// eleventyConfig.addShortcode("firstImage", function (collection) {
	//     const image = this.ctx.environments[collection].at(0)
	//     return `![${image.alt}](${image.img})`
	// })

	/* Global Data */
	eleventyConfig.addGlobalData("buildDate", () => new Date().toISOString());

	/* Custom Collections */
	eleventyConfig.addCollection("topics", collectionsApi => {
		const collections = collectionsApi.getAll();
		const topics = Array.from(new Set(collections.flatMap(c => c.data.topics).filter(topic => !!topic)));
		const posts = Object.fromEntries(topics.map(topic => [
			topic,
			collections
				.filter(col => col.data.topics)
				.filter(col => col.data.topics.includes(topic)
				)
		])
		);
		return posts
	});

	eleventyConfig.addCollection("collectionsByGallery", (collectionsApi) => {
		const galleries = collectionsApi.items[0].data.galleries;

		return Object.keys(galleries).flatMap(key => {
			const gallery = galleries[key];
			gallery.key = key;
			return gallery.collections.map((collection, i, collections) => {
				collection.gallery = key;
				return {
					...collection,
					gallery: key,
					permalink: `/stuff/${key}/${collection.title}/index.html`
				}
			})
		})
	});

	eleventyConfig.addCollection("imagesByCollection", (collectionsApi) => {
		const galleries = collectionsApi.items[0].data.galleries;
		return Object.keys(galleries).flatMap((galleryKey) => {
			const gallery = galleries[galleryKey];
			return gallery.collections.flatMap((collection) => {
				// console.log(Object.keys(collection));
				return collection.images.flatMap((image, i, images) => {
					const urlRoot = `/stuff/${slugify(galleryKey)}/${slugify(collection.title)}`
					image.gallery = galleryKey;
					image.collection = collection.title;
					return {
						...image,
						permalink: urlRoot + `/${slugify(image.title)}/index.html`,
						pagination: {
							href: {
								previous: i > 0 ? urlRoot + `/${slugify(images[i - 1].title)}/` : ``,
								next: i < images.length - 1 ? urlRoot + `/${slugify(images[i + 1].title)}/` : ``
							}
						}
					}
				})
			})
		})
	});

	/* Passthrough Directories */
	// eleventyConfig.addPassthroughCopy("src/assets/icons");
	eleventyConfig.addPassthroughCopy("src/assets/img");
	eleventyConfig.addPassthroughCopy("src/assets/js");
	eleventyConfig.addPassthroughCopy("src/assets/font");

	/* Watch Targets */
	eleventyConfig.addWatchTarget("./src/assets/");

	/* Enable Template Language Extensions */
	// eleventyConfig.addExtension("11ty.js");

	/* Custom Directories */
	return {
		dir: {
			input: "src",
			output: OUTPUT_DIR,
			layouts: "_layouts"
		},
		templateFormats: ['njk', 'md', '11ty.js',]
	}
}
