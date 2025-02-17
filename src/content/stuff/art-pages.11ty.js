import { getStem } from "../../../filters.js";

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
                return `/stuff/art/${getStem(image.img)}/index.html`
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