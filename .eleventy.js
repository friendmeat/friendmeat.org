module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyConfig.addPlugin(require('eleventy-plugin-icons'), {
        sources: [{ name: 'simple', path: 'node_modules/simple-icons/icons', default: true }]
    });

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