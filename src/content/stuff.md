---
layout: default
permalink: /stuff/
eleventyNavigation:
    key: Stuff
    order: 3
---
{% for k in collections.galleries %}
<a href="/stuff/{{ k.title }}/">
<figure height=300 width=500>
    <img src="{{ k.cover.src | threshold(500, 300) }}" alt="{{ k.cover.alt }}"  srcset="" />
    <figcaption>{{ k.key }}</figcaption>
</figure>
</a>
{% endfor %}

<a href="/stuff/ocs">
<figure><img src=""><figcaption>OCs</figcaption></figure>
</a>
