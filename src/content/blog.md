---
layout: blog
title: Blog
permalink: "/blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
eleventyNavigation:
    key: Blog
    order: 2
pagination:
    data: collections.posts
    size: 5
    reverse: true
---
