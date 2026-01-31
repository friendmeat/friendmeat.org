export default {
    tags: ["posts"],
    layout: "post",
    permalink: "/blog/{{ page.date | date('YYYY/MM/DD') }}/{{ page.fileSlug | slugify | urlencode }}/index.html",
    eleventyComputed: {
        eleventyNavigation: {
            parent: "Blog",
            key: ({ title }) => title
        }
    }
}
