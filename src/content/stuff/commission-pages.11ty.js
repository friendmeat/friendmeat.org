import { getStem } from "../../../filters.js";

class CommissionPages {
    data(){
        return {
            layout: "pages/image.njk",
            pagination: {
                data: "commissions",
                size: 1,
                alias: "image"
            },
            permalink({ image }) {
                return `/stuff/commissions/${getStem(image.img)}/index.html`
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