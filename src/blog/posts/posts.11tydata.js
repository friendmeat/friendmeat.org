export default {
    tags:["posts"],
    layout:"layouts/post",
    permalink:"{{ date | slugifyDate }}/{{ title | slugify }}/"
}