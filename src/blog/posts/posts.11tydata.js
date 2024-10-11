export default {
    tags:["posts"],
    layout:"blog/post",
    permalink:"{{ date | slugifyDate }}/{{ title | slugify }}/"
}