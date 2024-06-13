---
layout: default
title: Blog
eleventyNavigation:
    key: blog
    title: Blog
---
{% assign posts=collections.posts|reverse%}
{% render 'blog_post' for posts as post %}