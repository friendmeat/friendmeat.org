import pluginRss from "@11ty/eleventy-plugin-rss";
import bundlePlugin from "@11ty/eleventy-plugin-bundle";
import Image, { eleventyImageOnRequestDuringServePlugin } from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from "markdown-it-attrs";
import mathjax3 from "markdown-it-mathjax3";
import { escapeAttribute } from "entities";
import * as cheerio from 'cheerio';
import dayjs from "dayjs";
import videoPreprocessor from "./videoPreprocessor.js";

const OUTPUT_DIR = "dist";
const ASSETS_DIR = "";

const properCase = text => text.replace(/[^a-zA-Z1-9]/g, ' ').split(' ').map(w => w.split('').map((c, i) => i == 0 ? c.toUpperCase() : c).join('')).join(' ');

export default function(eleventyConfig) {

    /* Passthrough Assets */
    eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" });

    /* Watch Targets */
    eleventyConfig.addWatchTarget("./src/assets/");

    /* Plugins */
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(bundlePlugin);
    eleventyConfig.addPlugin(eleventyImageOnRequestDuringServePlugin);

    /* Bundle Plugin */
    eleventyConfig.addBundle("css");
    eleventyConfig.addBundle("js");

    /* Filters */
    const slugify = eleventyConfig.getFilter("slugify");
    // Note: this overrides the default nunjucks 'slice' function
    eleventyConfig.addNunjucksFilter("slice", function(data, start, end) {
        return data.slice(start, end);
    });

    eleventyConfig.addNunjucksFilter("split", function(str, sep = " ") {
        return str.split(sep);
    });

    // Flatten nested arrays OR return key from objects...? Why?
    eleventyConfig.addNunjucksFilter("flatmap", function(object, key) {
        if (Array.isArray(object)) {
            return object.flatMap(obj => obj[key]);
        } else if (typeof object == 'object') {
            return object[key]
        } else {
            return null
        }
    });

    // Add date formatting to nunjucks
    eleventyConfig.addNunjucksFilter("date", (date, format) => dayjs(date).format(format));

    // Return an object as a [key, value] pair sorted by the value.
    eleventyConfig.addNunjucksFilter("valuesort", (obj) => {

    });


    // Return number of years since input date
    eleventyConfig.addFilter("yearsSince", date => Math.abs(new Date(new Date() - new Date(date)).getUTCFullYear() - 1970));

    // Capitalize first letter of every word in string
    eleventyConfig.addFilter("properCase", properCase);

    // Add a pipe and the site title after the page title
    eleventyConfig.addFilter("siteTitle", function(title) {
        const baseTitle = this.ctx.meta.title;
        if (title == baseTitle) {
            return title
        } else {
            return `${title ? `${title} | ` : ``} ${this.ctx.meta.title}`
        }
    });

    // Crop and threshold opengraph images
    eleventyConfig.addFilter("threshold", async function(src, width = 500, height = 120, sizes = [500], threshold = 128) {
        //!TODO add "sizes" arg and return multiple urls to generate srcsets
        return await Image(src, {
            formats: ["webp"],
            cacheDuration: "1w",
            outputDir: `${OUTPUT_DIR}/assets/img`,
            urlPath: "/assets/img",
            transform: (sharp) => {
                sharp
                    .resize(width, height, { fit: "cover", strategy: "entropy" })
                    .threshold(threshold, { greyscale: true });
            }
        })
            .then(({ webp }) => webp[0])
            .then(data => data.url);
    });

    eleventyConfig.addFilter("thresholdPicture", async function(src, alt, widths = [300, 600], height = 120, threshold = 128) {
        return await Image(src, {
            widths,
            formats: ["jpeg"],
            outputDir: `${OUTPUT_DIR}/assets/img`,
            urlPath: "/assets/img",
            transform: async sharp => {
                sharp
                    .resize({ height, width: height * 3.2, fit: "cover", strategy: "entropy" })
                    .threshold(threshold)
            }
        })
            .then(({ jpeg }) => jpeg)
    })

    eleventyConfig.addFilter("thumbnail", async function(src, width, aspectRatio = 1) {
        return await Image(src, {
            widths: [width], formats: ["jpeg"],
            outputDir: `${OUTPUT_DIR}/assets/img`,
            urlPath: "/assets/img",
            transform: async sharp => {
                sharp
                    .resize({ width, height: width * aspectRatio, fit: "cover", strategy: "entropy" })
            }
        })
            .then(({ jpeg }) => jpeg[0].url)
    });

    eleventyConfig.addFilter("properCase", properCase);

    /* Custom Shortcodes */

    /* Template Libraries */
    // MarkdownIt
    eleventyConfig.amendLibrary("md", (md) => {
        md
            // markdown-it-attrs plugin
            .use(markdownItAttrs)

            // markdown mathjax plugin 
            .use(mathjax3)

            // markdown footnotes plugin
            .use(markdownItFootnote);

        return md
    });


    /* Global Data */
    eleventyConfig.addGlobalData("buildDate", new Date().toISOString());

    /* Custom Collections */
    eleventyConfig.addCollection("galleries", function(collectionsApi) {
        const images = collectionsApi.getFilteredByTag("stuff");
        const galleries = Object.groupBy(images, ({ inputPath }) => inputPath.split("/").slice(-2, -1));
        return Object
            .entries(galleries)
            .map(([k, v]) => ({
                "title": k,
                "key": properCase(k),
                "cover": v.filter(({ data }) => data.cover).map(({ data }) => ({ "src": data.src, "alt": data.alt }))[0],
                "collections": Object.entries(Object.groupBy(v, ({ data }) => data.collection))
                    .map(([j, m]) => ({
                        "title": j,
                        "key": properCase(j),
                        "images": m,
                        "cover": m.filter(({ data }) => data.collectionCover).map(({ data }) => ({ src: data.src, alt: data.alt }))[0],
                    })),
            }));
    });

    eleventyConfig.addCollection("imageCollections", function(collectionsApi) {
        // {"gallery":"photos", "collection":"kansas", "key":"Kansas", "images":[...] }
        const images = collectionsApi.getFilteredByTag("stuff");
        const collections = Object.groupBy(images, ({ data }) => data.collection);

        const result = Object.entries(collections).map(([collection, images]) => {
            return {
                images,
                "key": properCase(collection),
                "title": collection,
                "gallery": properCase(images[0].page.inputPath.split("/").slice(-2, -1)[0])
            }
        });
        return result

    });

    eleventyConfig.addCollection("topics", function(collectionsApi) {
        const pageSize = 5;
        const allPosts = collectionsApi.getFilteredByTag("posts")
        const allTopics = [...new Set(allPosts.flatMap(({ data }) => data.topics).filter(e => e !== undefined))];
        const topics = [];
        const pages = [];
        for (const topic of allTopics) {
            const posts = allPosts.filter(({ data }) => data.topics?.includes(topic)).sort((a, b) => a.date > b.date).reverse();
            topics.push([topic, posts.length]);
            const totalPages = Math.ceil(posts.length / pageSize)
            for (let i = 0; i < totalPages; i++) {
                pages.push({
                    topic,
                    page: i,
                    totalPages,
                    posts: posts.slice(i * pageSize, (i + 1) * pageSize)
                })
            }
        }
        return {
            topics,
            pages
        }
    });

    /* Template Pre-processing */
    eleventyConfig.addPreprocessor("videoLinks", "md", videoPreprocessor);

    /* Template Post-processing */
    const sectionSymbol = "§"
    eleventyConfig.addTransform("header-anchors", async function(content) {
        // Add heading anchors only to the bodies of blog posts
        if (this.page.inputPath.includes("blog")) {
            // !TODO: This conditional includes the blog pagination pages, not just posts. Can we fix it to filter out the pagination too?
            const $ = cheerio.load(content);
            $("article")
                .find("h1, h2, h3, h4, h5, h6")
                .map(function() {
                    const el = $(this);
                    const text = slugify(el.text(), { customReplacements: [[':', ''], ["'", '']] });
                    el
                        .attr("id", text)
                        .append(`<a class="header-anchor-link" href="#${text}">${sectionSymbol}</a>`);
                });
            content = $.html();
        }
        return content
    });

    return {
        dir: {
            input: "src",
            output: OUTPUT_DIR,
        },
        markdownTemplateEngine: "njk",
        // htmlTemplateEngine: "njk",
        templateFormats: ['njk', 'md', '11ty.js'],
    }
}
