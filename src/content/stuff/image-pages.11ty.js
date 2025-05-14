class ImagePages {
    data(){
        return {
            layout: "pages/image.njk",
            pagination: {
                data: "collections.images_by_gallery",
                size: 1,
                alias: "image",
            },
            permalink(context){
                return context.image.permalink
            },
            eleventyComputed: {
                title(context){
                    return context.image.title
                }
            }
        }
    }
}

export default ImagePages