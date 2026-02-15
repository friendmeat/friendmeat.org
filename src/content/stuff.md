---
layout: default
permalink: /stuff/
eleventyNavigation:
    key: Stuff
    order: 3
---
{% for k in collections.galleries %}
<a href="/stuff/{{ k.title }}/">
<figure class="collection-preview" height=300 width=500>
    <img src="{{ k.cover.src | threshold(500, 300) }}" alt="{{ k.cover.alt }}"  srcset="" />
    <figcaption>{{ k.key }}</figcaption>
</figure>
</a>
{% endfor %}

{% set ocsCoverImg = collections.ocs | first %}
<a href="/stuff/ocs">
<figure class="collection-preview">
    <img src="{{ ocsCoverImg.data.cover.src | threshold (500, 300) }}" alt="{{ ocsCoverImg.data.cover.alt }}">
    <figcaption>Characters</figcaption>
</figure>
</a>
