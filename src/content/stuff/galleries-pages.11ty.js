import slugify from "slugify"


class GalleryPages {
    data() {
        console.log(`context of GalleryPages`, this);
        return {
            layout: "pages/gallery.njk",
            pagination: {
                data: "galleries",
                size: 1,
                alias: "gallery"
            },
            permalink(pagination) {
                return `/stuff/${slugify(pagination.gallery)}/index.html`
            }
        }
    }
}

export default GalleryPages