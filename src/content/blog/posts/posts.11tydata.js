export default {
    tags: ["posts"],
    layout: "pages/post",
    permalink: "/blog/{{ page.date | date: '%Y/%m/%d' }}/{{ page.fileSlug | slugify | url_encode }}/index.html",
    parent: "Blog"
}