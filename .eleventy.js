module.exports = (eleventyConfig)=>{
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-webc"),{
        components:"src/_includes/*.webc"
    });

    eleventyConfig.addWatchTarget('./styles/tailwindconfig.js');
    eleventyConfig.addWatchTarget('./styles.tailwinds.css');
    eleventyConfig.setBrowserSyncConfig({
        callbacks:{
            ready:(err, bs)=>{
                bs.addMiddleware("*", (req, res)=>{
                    const content_404 = readFileSync('_site/404.html');
                    res.write(content_404);
                    res.writeHead(404);
                    res.end()
                })
            }
        }
    });
    return{
        dir:{
            input: "src"
        }
    }
}