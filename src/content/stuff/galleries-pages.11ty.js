import slugify from "../../../node_modules/@11ty/eleventy/src/Filters/Slugify.js";

class GalleryPages {
    data() {
        return {
            layout: "pages/gallery.njk",
            pagination: {
                data: "galleries",
                size: 1,
                alias: "gallery",
                resolve: "values"
            },
            permalink: context => `/stuff/${slugify(context.gallery.title)}/index.html`,
        }
    }
}

export default GalleryPages;