module.exports = (eleventyConfig) => {
    eleventyConfig.ignores.add("/src/blog/posts/README.md")
    eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyConfig.addPlugin(require('eleventy-plugin-icons'), {
        sources: [{ name: 'simple', path: 'node_modules/simple-icons/icons', default: true }]
    });

    eleventyConfig.ignores.add("src/blog/posts/README.md");

    eleventyConfig.addLiquidShortcode("excerpt", (body)=>{
        // const excerpt = body.split("<-- more -->").at(0);
        const excerpt = body.match(/[\s\S ]+(?=<-- more -->\n)/);
        return excerpt
    })

    eleventyConfig.setLiquidOptions({
        jsTruthy:true
    })

    eleventyConfig.addWatchTarget('./assets/tailwindconfig.js');
    eleventyConfig.addWatchTarget('./assets/tailwinds.css');
 
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