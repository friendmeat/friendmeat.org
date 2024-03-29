---
layout: default
title: Blog
eleventyNavigation:
    key: blog
    title: Blog
---
{% assign posts=collections.posts%}
{% render 'blog_post' for posts as post %}