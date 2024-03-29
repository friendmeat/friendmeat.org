---
layout: default
title: Blog
eleventyNavigation:
    key: blog
    title: Blog
---

{% for post in collections.posts %}
    {% render 'blog_post' with post as post %}
{% endfor %}