const eleventyNavigation = require("@11ty/eleventy-navigation");
const EleventyVite = require("@11ty/eleventy-plugin-vite");
const eleventyIcons = require("eleventy-plugin-icons");

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(eleventyNavigation);
    eleventyConfig.addPlugin(EleventyVite);
    eleventyConfig.addPlugin(eleventyIcons, {
        sources: [{ name: 'simple', path: 'node_modules/simple-icons/icons', default: true },
            {name:"heroicons", path:"node_modules/heroicons/20/solid"}
        ]
    });

    eleventyConfig.addWatchTarget('tailwind.config.js');
    eleventyConfig.addWatchTarget("/assets/css/tailwind.css");
    eleventyConfig.addWatchTarget('postcss.config.js')

    eleventyConfig.addPassthroughCopy({
        "src/assets/":"assets/",
        "admin":"admin",
        "src/.well-known/":".well-known/" // https://fed.brid.gy/docs#fediverse-enhanced

    })

    eleventyConfig.setFrontMatterParsingOptions({ excerpt: true });

    eleventyConfig.ignores.add("src/blog/posts/README.md");


    eleventyConfig.setLiquidOptions({
        jsTruthy: true
    })

    // Custom shortcodes
    eleventyConfig.addLiquidShortcode("excerpt", (body) => {
        // const excerpt = body.split("<-- more -->").at(0);
        const excerpt = body.match(/[\s\S ]+(?=<-- more -->\n)/);
        return excerpt
    })
    eleventyConfig.addLiquidShortcode("excerpt", function (content) {
        let p1 = content.indexOf("<p>");
        let p2 = content.indexOf("</p>");

        return content.substring(p1, p2)
    })

    // Custom filter
    eleventyConfig.addFilter("slugifyDate",
        /**
         * [Return a url-formatted date from a post date for use in slugs]
         * @param {Date} date
         * @returns {String}  
         */
        function (date) {
            return date.toLocaleDateString("en-GB").split('/').reverse().join('/')
        })

    eleventyConfig.addFilter("takeThree", 
        /**
         * 
         * @param {Array} array 
         */
        function (array){
            return array.slice(0, 3);
        }
    );

    // 404
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
        dir: {
            input: "src",
            includes: "_includes"
        }
    }
}