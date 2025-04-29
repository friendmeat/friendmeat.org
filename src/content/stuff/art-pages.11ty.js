import slugify from "slugify"


class ArtPages {
    data() {
        return {
            layout: "pages/image.njk",
            pagination: {
                data: "gallery",
                size: 1,
                alias: "image"
            },
            permalink({ image }) {
                return `/stuff/art/${slugify(image.title, { lower: true, trim: true, remove: new RegExp(/[()\*]/)  })}/index.html`
            },
            eleventyComputed: {
                title({ image }) {
                    return image.title
                }
            }
        }
    }
    render() {
        return ``
    }
}

export default ArtPages