import eleventyNavigation from "@11ty/eleventy-navigation/.eleventy.js";
import EleventyVite from "@11ty/eleventy-plugin-vite";
import eleventyIcons from 'eleventy-plugin-icons';

export default (eleventyConfig)=>{
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
        "admin":"admin"
    })

    eleventyConfig.setFrontMatterParsingOptions({ excerpt: true });

    eleventyConfig.ignores.add("src/blog/posts/README.md");


    eleventyConfig.setLiquidOptions({
        jsTruthy: true
    })

    // Custom shortcodes
    eleventyConfig.addLiquidShortcode("excerpt", function (content) {
            let p1 = content.indexOf("<p>");
            let p2 = content.indexOf("</p>");
            return content.substring(p1+3, p2);
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