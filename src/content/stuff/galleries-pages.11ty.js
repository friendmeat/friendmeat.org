import slugify from "slugify"

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