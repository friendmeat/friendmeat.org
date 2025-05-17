import path from "node:path";
import feedPlugin from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import dateFilter from "nunjucks-date-filter";
import pluginIcons from "eleventy-plugin-icons";
import githubRepos from "eleventy-plugin-github-repos";
import markdownIt from "markdown-it";
import markdownItCallouts from "markdown-it-callouts";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import htmlmin from "html-minifier-terser";
import * as sass from "sass";

console.log(process.env.ELEVENTY_RUN_MODE)

export default function (eleventyConfig) {
    /* Built-in filters */
    const slugify = eleventyConfig.getFilter("slugify");

    /* Plugins */
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        urlPath: "/assets/img/",
        widths: ["auto"],
        formats: ["avif", "webp", "jpeg", "gif"],
        htmlOptions: {
            imgAttributes: {
                // loading: "lazy",
            }
        },
        sharpOptions: {
            animated: true
        }
    });
    eleventyConfig.addPlugin(feedPlugin);
    // eleventyConfig.addPlugin(pluginRev);
    // eleventyConfig.addPlugin(eleventySass, {
    // });
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginIcons, {
        sources: [
            { name: 'heroicons', path: 'node_modules/heroicons/16/solid', default: true },
            { name: 'si', path: 'node_modules/simple-icons/icons' },
        ]
    });

    // Run github plugin only when building
    if (process.env.ELEVENTY_RUN_MODE === 'build') {
        eleventyConfig.addPlugin(githubRepos, {
            userAccount: "friendmeat",
            apiKey: process.env.GITHUB_API_TOKEN,
            debugMode: false,
            quitOnError: false,
        });
    }

    /* Template Engine Plugins */
    eleventyConfig.amendLibrary("md", (md) => {
        return md
            .enable("code")
            .use(markdownItCallouts)
            .use(markdownItAnchor)
            .use(markdownItAttrs)
    });
    eleventyConfig.amendLibrary("njk", (njk) => {
        return njk.addFilter('date', dateFilter);
    });
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        useLayouts: true,
        compile: async function (inputContent, inputPath) {
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

    /* Tempate Transforms */
    // https://www.11ty.dev/docs/transforms/#minify-html-output
    eleventyConfig.addTransform("htmlmin", function (content) {
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
    eleventyConfig.addFilter("siteTitle", function (title) {
        return `${title ? `${title} | ` : ``} ${this.ctx.meta.title}`;
    });

    eleventyConfig.addFilter("getGlobalData", function (key) {
        return this.ctx[key]
    })

    eleventyConfig.addFilter("markdownify", function (content) {
        return markdownIt().render(content)
    })

    eleventyConfig.addFilter("takeThree",
        /**
         * 
         * @param {any[]} array 
         * @returns first 3 items from array
         */
        function (array) {
            return array.slice(0, 3);
        });

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

    eleventyConfig.addCollection("images_by_gallery", (collectionsApi) => {
        const galleries = collectionsApi.items[0].data.galleries;

        return Object
            .keys(galleries)
            .flatMap(key => {
                const gallery = galleries[key];
                gallery.key = key;
                return gallery.images.map((image, i, allImages) => {
                    return ({
                        ...image,
                        gallery,
                        permalink: `/stuff/${key}/${slugify(image.title)}/index.html`,
                        pagination: {
                            href: {
                                previous: i > 0 ? "/stuff/" + key + "/" + slugify(allImages[i - 1].title) : null,
                                next: i < allImages.length - 1 ? "/stuff/" + key + "/" + slugify(allImages[i + 1].title) : null,
                            }
                        }
                    })
                })
            });
    })

    /* Passthrough Directories */
    // eleventyConfig.addPassthroughCopy("src/assets/icons");
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/font");

    /* Watch Targets */
    eleventyConfig.addWatchTarget("./src/assets/")

    /* Enable Template Language Extensions */
    // eleventyConfig.addExtension("11ty.js");

    /* Custom Directories */
    return {
        // htmlTemplateEngine: "njk",
        // markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
            layouts: "_layouts"
        },
        templateFormats: ['njk', 'md', '11ty.js',]
    }
}