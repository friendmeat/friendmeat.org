export default {
    tags: ["posts"],
    layout: "pages/post",
    permalink: "/blog/{{ page.date | date: '%Y/%m/%d' }}/{{ page.fileSlug | slugify | url_encode }}/index.html",
    eleventyComputed: {
        excerpt: ({ page }) => ({
            content: page.rawInput.slice(0, 1000),
            hasMore: page.rawInput.length > 1000
        })
    }

}