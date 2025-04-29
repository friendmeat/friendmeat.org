import slugify from "slugify"

class CommissionPages {
    data() {
        return {
            layout: "pages/image.njk",
            pagination: {
                data: "commissions",
                size: 1,
                alias: "image"
            },
            permalink({ image }) {
                return `/stuff/commissions/${slugify(image.title, { lower: true, trim: true, remove: new RegExp(/[()\*]/) })}/index.html`
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

export default CommissionPages;