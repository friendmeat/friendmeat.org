class ImagePages {
    data() {
        return {
            layout: "pages/image.njk",
            pagination: {
                data: "collections.images_by_gallery",
                size: 1,
                alias: "image",
            },
            permalink: (context) => context.image.permalink,
        }
    }
}

export default ImagePages