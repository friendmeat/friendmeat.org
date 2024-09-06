---
title: Gallery
eleventyNavigation:
    key: gallery
    title: Gallery
    parent: stuff
---
{% assign art = galleries.galleries[0] %}
{% assign images = art.image %}
<div class="flex flex-wrap justify-center sm:justify-normal">
{% for img in images %}
<a href="{{img.alt | slugify }}/">
  <div class="gallery-item flex justify-center m-2 p-2 aspect-square w-full sm:w-56 border border-zinc-400 group hover:bg-zinc-400 transition-all">
    <img class="object-none object-center w-full group" src="{{img.src}}">
  </div>
</a>
{% endfor %}
</div>