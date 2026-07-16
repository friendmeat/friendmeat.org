import fs from "node:fs/promises";
import pluginRss from "@11ty/eleventy-plugin-rss";
import bundlePlugin from "@11ty/eleventy-plugin-bundle";
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import Image, { eleventyImageTransformPlugin, eleventyImageOnRequestDuringServePlugin } from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginTOC from '@uncenter/eleventy-plugin-toc';
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from "markdown-it-attrs";
import mathjax3 from "markdown-it-mathjax3";
import markdownItCallouts from "markdown-it-callouts";
import markdownItAnchor from "markdown-it-anchor";
import { escapeAttribute } from "entities";
import * as cheerio from 'cheerio';
import dayjs from "dayjs";
import videoPreprocessor from "./videoPreprocessor.js";

const OUTPUT_DIR = "dist";
const ASSETS_DIR = "";

const properCase = text => text.replace(/[^a-zA-Z1-9]/g, ' ').split(' ').map(w => w.split('').map((c, i) => i == 0 ? c.toUpperCase() : c).join('')).join(' ');

const camelCase = text => text.split(/[^a-z0-9]/gi).map((part, i) => i !== 0 ? properCase(part) : part).join("");

export default function(eleventyConfig) {

    /* Passthrough Assets */
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" });

    /* Watch Targets */
    eleventyConfig.addWatchTarget("./src/assets/");

    /* Plugins */
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(bundlePlugin);
    eleventyConfig.addPlugin(eleventyImageOnRequestDuringServePlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // failOnError: false,
        formats: ["webp","gif"],
        widths: ["auto"],
        sharpOptions: {
            animated: true
        }
    });
    eleventyConfig.addPlugin(syntaxHighlightPlugin);
    eleventyConfig.addPlugin(pluginTOC);

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

    eleventyConfig.addFilter("typeof", x => typeof x);

    eleventyConfig.addFilter("isArray", x => Array.isArray(x));

    // Return number of years since input date
    eleventyConfig.addFilter("yearsSince", date => Math.abs(new Date(new Date() - new Date(date)).getUTCFullYear() - 1970));

    // Capitalize first letter of every word in string
    eleventyConfig.addFilter("properCase", properCase);

    eleventyConfig.addFilter("camelCase", function(text) { return camelCase(text) });

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
        // return `${OUTPUT_DIR}/assets/src`
        //!TODO add "sizes" arg and return multiple urls to generate srcsets
        if (!src) return;
        try {

            return await Image(src, {
                formats: ["webp"],
                cacheDuration: "1w",
                outputDir: `${OUTPUT_DIR}/assets/img`,
                urlPath: "/assets/img",
                transform: (sharp) => {
                    sharp
                        // .resize(width, height, { fit: "cover", strategy: "entropy" })
                        .threshold(threshold, { greyscale: true });
                }
            })
                .then(({ webp }) => webp[0])
                .then(data => data.url);

        } catch (error) {
            console.error(`error when applying threshold to img: ${src}`)
            console.error(error);
            return ""
        }
    });

    eleventyConfig.addFilter("thresholdPicture", async function(src, alt, widths = [300, 600], height = 120, threshold = 128) {
        if (!src) return;
        try {
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
        } catch (err) {
            console.error(`error when applying thresholdPicture to img: ${src}`)
            console.error(err);
            return "";
        }
    })

    eleventyConfig.addFilter("thumbnail", async function(src, width, aspectRatio = 1) {
        if (!src) return;
        try {
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
        } catch (err) {
            console.error(`error when applying thumbnail to img: ${src}`)
            console.error(err);
            return "";
        }
    });

    eleventyConfig.addFilter("censor", async function(src) {
        try {
            // https://github.com/lovell/sharp/issues/1532#issuecomment-451749670
            // Make an image very small, then resize it with the nearest-neighbor kernel to maintain pixelization

            const stage1 = await Image(src, {
                widths: ["auto"],
                format: ["jpeg"],
                outputDir: `${OUTPUT_DIR}/assets/img`,
                urlPath: "/assets/img",
                transform: async sharp => {
                    sharp
                        .resize(32, null, { fit: "cover", strategy: "entropy", kernel: "nearest" })
                        .toBuffer();
                }
            })

            const stage2 = await Image(stage1["webp"][0].outputPath, {
                widths: ["auto"], formats: ["jpeg"], outputDir: `${OUTPUT_DIR}/assets/img`, urlPath: "/assets/img",
                transform: async sharp => {
                    sharp.resize(500, null, { fit: "cover", strategy: "entropy", kernel: "nearest" })
                }
            });

            return stage2["jpeg"][0].url
        } catch (err) {
            console.error(`error when processing img: ${img}`)
            console.error(err);
            return "";
        }
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
            .use(markdownItFootnote)

            // marakdown callouts plugin
            .use(markdownItCallouts)

            // add ids to headings
            .use(markdownItAnchor)

        // return md
    });


    /* Global Data */
    eleventyConfig.addGlobalData("buildDate", new Date().toISOString());

    /* Custom Collections */
    eleventyConfig.addCollection("galleries", function(collectionsApi) {
        const stuff = collectionsApi.getFilteredByTag("stuff");

        let galleries = {}

        const assign = (obj, path, val) => {
            if (path.length > 1) {
                const part = path.shift();
                obj[part] ??= {};
                assign(obj[part], path, val);
            } else {
                try {
                    obj[path[0]] ??= [];
                    obj[path[0]].push(val);
                } catch { }
            }
            return obj;
        }


        for (let i = 0; i < stuff.length; i++) {
            const photo = stuff[i];
            // Discard '/content/stuff' part of path
            const pathstring = photo.page.filePathStem.replace(/^\/content\/stuff/gi, "");
            const path = pathstring.split(/\//g).filter(p => !!p);

            // Discard file itself
            path.pop();
            assign(galleries, path, photo);
        }

        return galleries;
    });

    eleventyConfig.addCollection("covers", function(collectionsApi) {
        const covers = collectionsApi.getFilteredByTag("cover");
        const tagged = Object.fromEntries(covers.map(({ data }) => [data.collection, { src: data.src, alt: data.alt }]));
        return tagged;
    });

    eleventyConfig.addCollection("galleryCovers", function(collectionsApi) {
        const covers = collectionsApi.getFilteredByTag("gallery-cover");
        const tagged = Object.fromEntries(covers.map(({ data }) => [data.gallery, { src: data.src, alt: data.alt }]));
        return tagged;
    });

    eleventyConfig.addCollection("allCovers", function(collectionsApi) {
        let covers = {};
        collectionsApi.getFilteredByTag("cover").filter(p => p.data.collection).forEach(cover => {
            Object.assign(covers, Object.fromEntries([[cover.data.collection, { src: cover.data.src, alt: cover.data.alt, sensitive: cover.data.sensitive }]]));
        })
        // console.log(covers);
        return covers;
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
            const totalPages = Math.ceil(posts.length / pageSize);
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

    eleventyConfig.addCollection("ocImages", collectionsApi => {
        const allOcs = [...new Set(collectionsApi.getFilteredByTag("ocs").map(({ data }) => data.name))];
        const allStuff = collectionsApi.getFilteredByTag("stuff")
        return Object.fromEntries(allOcs.map(oc => [
            oc,
            allStuff.filter(({ data }) => data.tags.includes(oc.toLowerCase()))
        ]));
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
                .map(function() { $(this).append(`<a class="header-anchor-link" href="#${$(this).attr('id')}">${sectionSymbol}</a>`) });
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
