const EMBED_PATTERN = new RegExp(/^!\[(.*)\]\((.*)\)$/gm);
const YT_URL_PATTERN = new RegExp(/(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gim);


class YouTubeLink {
    /**
     * 
     * @param {string} href youtube link
     * @param {string} title video title (from alt text)
     */
    constructor(href, title = "") {
        if (!this.isYouTubeLink(href)) {
            console.error(`${href} is NOT a valid YT link`);
            throw new Error(`${href} is not a valid YouTube link`);
        }
        console.log(`${href} is a valid YT link`);
        const [fullMatch, id] = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gim.exec(href);
        this.href = fullMatch;
        this.id = id;
        this.title = title;
    }

    get embedLink() {
        return `https://www.youtube.com/embed/${this.id}`;
    }

    get embedHTML() {
        return `<iframe height="300px" src="${this.embedLink}" title="${this.title}"></iframe>\n`;
    }

    /**
     * 
     * @param {string} href link to test
     * @returns {boolean} whether or not the string is a youtube link 
     */
    isYouTubeLink(href) {
        return YT_URL_PATTERN.test(href);
    }
}


/**
 * @param {object} data
 * @param {string} content
*/
export default (_data, content) => {
    const matches = content.matchAll(EMBED_PATTERN);
    let newContent = content;

    // Iterate over matches
    while (true) {
        const match = matches.next();
        
        // Stop when iterator exhausted
        if (match.done) {
            break;
        }

        // Get link components
        const [fullMatch, altText, href] = match.value;
        
        // Try to convert to a YT link
        try {

            const ytLink = new YouTubeLink(href, altText);
            newContent = newContent.replace(fullMatch, ytLink.embedHTML);
        } catch { 
            // If it's not a YT link, move to next iteration
            continue; 
        }
    }
    return newContent;
}