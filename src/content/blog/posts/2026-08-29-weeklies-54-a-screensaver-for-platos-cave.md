---
title: "weeklies #54 - a screensaver for plato's cave"
date: 2026-08-29
headerImage:
  src: https://i.postimg.cc/TYtRz9DP/Resized-Image-2026-08-24-20-05-02-5427-1.jpg
  alt: obfuscated document on a desk
  format: true
topics:
  - weeklies
description: the mormon furry vn. a simulacrum of a screensaver. have you ever
  read a critical theory essay about packaging? you should read a critical
  theory essay about packaging.
---
## __what i'm reading__
### velcro city tourist board
> Our attention, our very sanity, is the last fungible resource remaining to us, and we’re burning through it in a way that makes our dalliance with hydrocarbons look like a practice run. You can slow down, perhaps, but you can never stop running—because even if you’re not trampled, you’ll be left in the dust which is the true final product of economic efficiency.

-- ["Ours it the tragedy of the silent stars"](https://www.velcro-city.co.uk/ours-is-the-tragedy-of-the-silent-stars/)

[Paul Raven](https://www.velcro-city.co.uk/) has been on a tear lately, posting essays and prose-poems every day for a week. I'm eating well.

Have you ever read a critical theory essay about packaging? You should read [a critical theory essay about packaging](https://meson.press/books/containment/). (Ch. 5, pp. 91-107)

## __what i'm listening to__
### _Burn_ - YS
![](https://www.youtube.com/watch?v=QBKwZEO76dg&pp=ygUIeXMgbW90aCA%3D)

Finally digging in to the [Bandcamp Daily blog post](https://daily.bandcamp.com/lists/trip-hop-revival-album-guide) from a while back about contemporary trip hop. I like the way they used the Janet Jackson sample here. I keep wanting to sing That's the way love goes!!! but they don't use that part. Infuriating? Machiavellian? Yes.

## __what i'm watching__
### _Teenage Sex and Death At Camp Miasma_ (2026), dir. Jane Schoenbrun

I liked that Gillian Anderson fingerbanged a girl and Louise Weard was there. We don't have to talk about the rest.

## __what i'm playing__
### the mormon furry VN
![promo header for Campo Largo showing an anthro dear-man in a short button-down and slacks on a dirt road. The image is flipped upside-down](https://img.itch.zone/aW1nLzIyMjEyODk2LmpwZw==/original/KZzF%2Fq.jpg)

> ELDER HARTLEY: Adam fell -- specifically -- that men might be.
> 
> ELDER SUAREZ: Men are that they might have joy.

Organized religion an impediment to intellectual development, a thin justification for abuse, and a cudgel the elite wield power over the masses minds and bodies. The entire planet suffers because of the cultural and structural influence deployed by religious institutions.

Happy? Ok, now:

I think the 240-character-limit set on people's thought processes has led them to believe that everyone that likes something you like (i.e. Furry) must also mean they think and feel all the things you do and therefore must be the Good Kind of person. The phantasy of a contiguous communal whole (mediated through social media) can withstand a lot of cognitive dissonance-- racism, pedophilia, bestiality-- but it apparently can't withstand the concept of Mormonism. A Furry can be a Mormon. A Furry can be all sorts of things you don't like. People are inconvenient.

---

The prose is competent enough to make the incredibly mundane slice-of-life compelling, even if you go into it just wanting to hate-read it for a blog post. 

_Campo Largo_ has a brilliant moment where its realization as interactive multimedia shines: the lead starts ruminating on free will while failing to proselytize to a bunch of Roman Catholic Latinos. As the protagonist builds his exegesis, cuts in the text and backdrop representing their course through the eponymous town, layers are added to the soundtrack until it sounds like a [Philip Glass joint](https://www.youtube.com/watch?v=2H5mRIJFUNQ). It was a deftly executed synthesis of text and sound.

I also learned some stuff about Mormons I guess.

[_Campo Largo_ on itch.io](https://toledo-art.itch.io/campo-largo)

## __what i'm working on__
### a screensaver in plato's cave

Instead of dealing with the [xScreenSaver](https://www.jwz.org/xscreensaver/) developer's obsession with corny 3d ants and greybeard hang-ups vis-a-vis version control systems and documentation, I started looking into simpler ways to display text as a screensaver on certain end-user-facing kiosk machines for work.

I've settled on abusing ffmpeg. I've set up a systemd service running [xidlehook](https://gitlab.com/jD91mZM2/xidlehook) to start piping dynamically-generated footage from ffmpeg's `drawtext` filter into a full-screen ffplay instance after 60 seconds without user input. It's maniacal, hacky, and inefficient-- but ffplay even has flags called `-exitonkeydown` and `-exitonmousedown`, so it's like they were asking for me to use it this way.

It's a simulacrum of a screensaver. Very allegory of the cave-coded.

And it's easier than hacking the Xorg display server. I'm not scared of C you're scared of C.

## __something i liked__
### ohh fuck

i don't have anything for this. uhh. fuck.

[take this quiz](https://www.tumblr.com/str-ngeloop/826189262329462784?source=share) I took during work hours the other day. I got a 96% or something.

## __something i hated__
### fake local news
I got a 'local interest' newsletter from some [random media conglomerate](https://6amcity.com/) trying to edge in on the local news industry. Not that local news is a particularly laudable institution. But I don't need [two reptilian-looking motherfuckers both named Ryan](https://6amcity.com/about-us)

I swear I read somewhere about this exact playbook being used by AI companies to make generated newsletters. I even read through their privacy/content policy to find where they outed themselves as AI slop, but the only mention of AI was the claim that they'd use it 'to give their human editors more time to engage with the local community' 🤢. 

## __a picture__:
### the humiliating ordeal of editing yourself
![obfuscated document on a desk. my pi pico and breadboard kit make a cameo in the top right corner. hi pi pico](https://i.postimg.cc/TYtRz9DP/Resized-Image-2026-08-24-20-05-02-5427-1.jpg)

Yeah I might as well print and hand-edit my own creative writing with a red pen i bought expressly for that purpose. Why not. Nothing matters.