

module.exports = (eleventyConfig) => {
    /* Plugins */
    eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-vite"));
    eleventyConfig.addPlugin(require('eleventy-plugin-icons'), {
        sources: [{ name: 'simple', path: 'node_modules/simple-icons/icons', default: true }]
    });

    /* Development Watch Targets */
    eleventyConfig.addWatchTarget('./tailwind.config.js');
    eleventyConfig.addWatchTarget("./assets/*.css");

    /* Parse Frontmatter */
    eleventyConfig.setFrontMatterParsingOptions({ excerpt: true });

    /* Ignore blog's README */
    eleventyConfig.ignores.add("src/blog/posts/README.md");

    /* Resolve */
    eleventyConfig.setLiquidOptions({
        jsTruthy: true
    })

    /* Custom shortcodes */
    // Custom excerpt
    eleventyConfig.addLiquidShortcode("excerpt", (body) => {
        const excerpt = body.match(/[\s\S ]+(?=<-- more -->\n)/);
        return excerpt
    })

    // Other custom excerpt?
    eleventyConfig.addLiquidShortcode("excerpt", function (content) {
        let p1 = content.indexOf("<p>");
        let p2 = content.indexOf("</p>");

        return content.substring(p1, p2)
    })

    /* Custom filter */
    eleventyConfig.addFilter("slugifyDate",
        /**
         * [Return a url-formatted date from a post date for use in slugs]
         * @param {Date} date
         * @returns {String}  
         */
        function (date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDay();
            return [year, month, day].join("/")
        })

    /* 404 Error catcher */
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: (err, bs) => {
                bs.addMiddleware("*", (req, res) => {
                    const content_404 = readFileSync('_site/404.html');
                    res.write(content_404);
                    res.writeHead(404);
                    res.end()
                })
            }
        }
    });
    return {
        /* Specify custom folders for src and includes */
        dir: {
            input: "src",
            includes: "_includes"
        }
    }
}