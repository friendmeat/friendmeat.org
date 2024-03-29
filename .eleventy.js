
module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyConfig.addPlugin(require('eleventy-plugin-icons'), {
        sources: [{ name: 'simple', path: 'node_modules/simple-icons/icons', default: true }]
    });
    
    eleventyConfig.addWatchTarget('./tailwind.config.js');
    eleventyConfig.addWatchTarget("./assets/*.css");
    
    eleventyConfig.ignores.add("/src/blog/posts/README.md")

    eleventyConfig.setFrontMatterParsingOptions({excerpt:true});

    eleventyConfig.ignores.add("src/blog/posts/README.md");

    eleventyConfig.addLiquidShortcode("excerpt", (body)=>{
        // const excerpt = body.split("<-- more -->").at(0);
        const excerpt = body.match(/[\s\S ]+(?=<-- more -->\n)/);
        return excerpt
    })

    eleventyConfig.setLiquidOptions({
        jsTruthy:true
    })
    eleventyConfig.addLiquidShortcode("excerpt", function(content){
        let p1 = content.indexOf("<p>");
        let p2 = content.indexOf("</p>");
   
        return content.substring(p1, p2)
    })

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