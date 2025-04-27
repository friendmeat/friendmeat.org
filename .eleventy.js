import { IdAttributePlugin } from "@11ty/eleventy";
import eleventyNavigation from "@11ty/eleventy-navigation/.eleventy.js";
import eleventyIcons from 'eleventy-plugin-icons';

export default (eleventyConfig)=>{
    //#region Plugins
    eleventyConfig.addPlugin(IdAttributePlugin);
    eleventyConfig.addPlugin(eleventyNavigation);
    eleventyConfig.addPlugin(eleventyIcons, {
        sources: [{ name: 'simple', path: 'node_modules/simple-icons/icons', default: true },
            {name:"heroicons", path:"node_modules/heroicons/20/solid"}
        ]
    });
    //#endregion Plugins

    //#region Watch Targets
    eleventyConfig.addWatchTarget('tailwind.config.js');
    eleventyConfig.addWatchTarget('postcss.config.js')
    //#endregion Watch Targets

    //#region Passthrough
    eleventyConfig.addPassthroughCopy({
        "src/public/*.{jpg,png,svg}":"/",
    })
    //#endregion Passthrough

    eleventyConfig.setFrontMatterParsingOptions({ excerpt: true });
    
    //#region Ignores
    eleventyConfig.ignores.add("src/blog/posts/README.md");
    eleventyConfig.ignores.add("src/assets/css/style.css");
    //#endregion Ignores

    //#region Template Options
    eleventyConfig.setLiquidOptions({
        jsTruthy: true
    })
    //#endregion Template Options

    //#region Custom
    eleventyConfig.addLiquidShortcode("excerpt", function (content) {
            let p1 = content.indexOf("<p>");
            let p2 = content.indexOf("</p>");
            return content.substring(p1+3, p2);
    })

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
    //#endregion Custom
    return {
        dir: {
            input: "src",
            includes: "_includes"
        }
    }
}