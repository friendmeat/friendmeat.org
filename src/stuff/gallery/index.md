---
title: Gallery
eleventyNavigation:
    key: gallery
    title: Gallery
    parent: stuff
---
{% include 'gallery/shadowbox' %}
<div id="gallery" class="flex flex-wrap justify-center">
{% render 'gallery/image' for images as img %}
</div>
<script src="/assets/js/gallery.js"></script>