---
layout: default
title: Friendmeat
eleventyNavigation:
    key: index
    title: Index
---
## Hi

You've found my site. Good for you.

## Latest Posts

{% assign posts = collections.posts | reverse | takeThree %}
{% for post in posts %}
    <li>
        <a class="max-w-max interactive" href="{{ post.url }}">{{post.date|slugifyDate}} - {{ post.data.title }}</a>
    </li>
{% endfor %}

## Stuff to look at
<li><a href="/stuff/gallery/" class="max-w-max interactive">Stuff I made</a></li>
<li><a href="/stuff/comms/" class="max-w-max interactive">Stuff other people made</a></li>

## Where else to find me

{% include 'app/socials' %}