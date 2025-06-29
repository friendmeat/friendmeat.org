import slugify from "../../../node_modules/@11ty/eleventy/src/Filters/Slugify.js";

class CollectionPages {
    data() {
        return {
            layout: "pages/galleries/collection.njk",
            pagination: {
                data: "collections.collectionsByGallery",
                size: 1,
                alias: "collection"
            },
            permalink: ({ collection }) => `/stuff/${slugify(collection.gallery)}/${slugify(collection.title)}/index.html`
        }
    }
}

export default CollectionPages;