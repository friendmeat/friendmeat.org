---
layout: default
title: Blog
eleventyNavigation:
    key: blog
    title: Blog
    order: 2
---
{% assign posts=collections.posts|reverse%}
{% render 'blog_post' for posts as post %}