import slugify from "@sindresorhus/slugify";

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
                return `/stuff/commissions/${slugify(image.title)}/index.html`
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