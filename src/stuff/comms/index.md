---
title: Commissions
eleventyNavigation:
    key: commissions
    title: Commissions
    parent: stuff
---
{% assign art = galleries.galleries[1] %}
{% assign images = art.image %}
<div class="flex flex-wrap">
{% for img in images %}
<a href="{{img.alt | slugify }}/">
  <div class="gallery-item flex justify-center m-2 p-2 aspect-square sm:w-full w-56 border border-zinc-400 group hover:bg-zinc-400 transition-all">
    <img class="object-none object-center w-full group" src="{{img.src}}">
  </div>
</a>
{% endfor %}
</div>