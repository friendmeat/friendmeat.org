const EMBED_PATTERN = new RegExp(/^!\[(.*)\]\((.*)\)$/gm);
// const YT_URL_PATTERN = new RegExp(/(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gim);


class YouTubeLink {
    /**
     * 
     * @param {string} href youtube link
     * @param {string} title video title (from alt text)
     */
    constructor(href, title = "") {
        if (!this.isYouTubeLink(href)) {
            throw new Error(`${href} is not a valid YouTube link`);
        }
        const [fullMatch, id] = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gim.exec(href);
        this.href = fullMatch;
        this.id = id;
        this.title = title;
    }

    get embedLink() {
        return `https://www.youtube.com/embed/${this.id}`;
    }

    get embedHTML() {
        return `<iframe src="${this.embedLink}" title="${this.title}"></iframe>\n`;
    }

    /**
     * 
     * @param {string} href link to test
     * @returns {boolean} whether or not the string is a youtube link 
     */
    isYouTubeLink(href) {
        return new RegExp(/(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gim).test(href);
    }
}


/**
 * @param {object} data
 * @param {string} content
*/
export default (_data, content) => {
    const matches = content.matchAll(EMBED_PATTERN);
    let newContent = content;

    while (true) {
        const match = matches.next();
        
        if (match.done) {
            break;
        }

        const [fullMatch, altText, href] = match.value;
        
        try {
            const ytLink = new YouTubeLink(href, altText);
            newContent = newContent.replace(fullMatch, ytLink.embedHTML);
        } catch { 
            continue; 
        }
    }
    return newContent;
}