---
title: Gallery
eleventyNavigation:
    key: gallery
    title: Gallery
    parent: stuff
---
{% assign art = galleries.galleries[0] %}
{% assign images = art.image %}
<div class="flex flex-wrap">
{% render "gallery/image" for images as img %}
</div>