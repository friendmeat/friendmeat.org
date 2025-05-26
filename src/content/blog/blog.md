---
layout: pages/blog
title: Blog
parent: Home
permalink: "/blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber | plus: 1 }}/{% endif %}index.html"
pagination:
    data: collections.posts
    size: 5
    reverse: true
---
