import slugify from "../../../node_modules/@11ty/eleventy/src/Filters/Slugify.js";

class GalleryPages {
    data() {
        return {
            layout: "pages/gallery.njk",
            pagination: {
                data: "galleries",
                size: 1,
                alias: "gallery"
            },
            permalink: context => `/stuff/${slugify(context.gallery, { trim: true, lower: true, strict: true })}/index.html`,
        }
    }
}

export default GalleryPages;