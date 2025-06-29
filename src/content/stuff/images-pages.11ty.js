import slugify from "../../../node_modules/@11ty/eleventy/src/Filters/Slugify.js";

class ImagePages {
    data() {
        return {
            layout: "pages/galleries/image.njk",
            pagination: {
                data: "collections.imagesByCollection",
                size: 1,
                alias: "image",
            },
            permalink: ({ image }) => `/stuff/${slugify(image.gallery)}/${slugify(image.collection)}/${slugify(image.title)}/index.html`
        }
    }
}

export default ImagePages