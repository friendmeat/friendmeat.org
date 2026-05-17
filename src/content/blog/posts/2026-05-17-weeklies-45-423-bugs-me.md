---
title: "weeklies #45 - 423 bugs + me"
date: 2026-05-17
headerImage:
  src: https://i.postimg.cc/nZXgJF5m/spwce.jpg
  alt: sharpie doodle of a bespectacled balding guy with a beard and triangles
    coming from his head that could be horns or cat ears
  format: true
topics:
  - weeklies
description: psi and the I Ching; nuclear apocalype in the 50s; and a standout
  entry in interactive fiction
---
## __what i'm reading__
#### "Meaningfulness in the _I Ching_ Using a Q-Sort RNG Method"[^1]
let me say up top i don't believe any of this shit. but it's fun to think about.

Both the QAA's guys' _Spectral Voyager_ podcast[^2] and an episode of _Weird Studies_[^3] have cited The Journal of the Society for Psychical Research. So I looked into it and thought this article sounded interesting. 

The article explains the "sheeps-goats" phenomenon in studies of 'psi' phenomena (e.g. telepathy, ESP, psychokenisis). "Sheep" are subjects with beliefs in the paranormal; "goats" are skeptics. Throughout studies of 'psi' phenomena, "goats" are associated with outcomes consistent with pure chance, but "sheep" have outcomes that suggest something more than chance.

Both _Weird Studies_ and _Spectral Voyager_ discuss this concept, but not by name. A certain level of openness to chance is a precondition for a 'weird' event. In _Voyager_'s case this is 'noisy' electronics: they profile 20th century researchers tuning radios between stations and listening for voices. _Weird Studies_ focuses on the 'set and setting' (to borrow from psychedelic studies). In the _I Ching_ study, it's a random number generator. You need a place where things can get lost, literally and figuratively: a dark room, a noisy channel, a deep pocket, a false positive. 

It makes sense, from a materialist perspective, that thought is a physical process. The firing of electricity and molecules through our brains and meat-parts gives rise to changes in ourselves and in reality. Compare our knowledge of reality a century ago to our knowledge today; it\'s taken for granted that a mind is affected by its environment, but could the environment not be affected by the mind in turn? Does this mean that cognition is immanent in the universe? Does this mean that reality is a simulation? I kind of don't give a fuck.

## __what i'm listening to__
### "Bad Song" - CFCF feat. Cecile Believe
![](https://youtu.be/GBP6z-oGCd4?si=hKqH3g-xymmtddgA)

The forthcoming CFCF album is already AOTY. 

## __what i'm watching__
### _On the Beach_ (1959)
![Poser for _On The Beach_ (1959)](https://upload.wikimedia.org/wikipedia/commons/8/88/On_the_Beach_1959_film_poster.jpg)
Mentioned in _Apocalyptic Fever: End-Time Prophecies in Modern America_. In the wake of a nuclear war that depopulates the northern hemisphere, the last surviving U.S. submarine operators escape to an Australia struggling with the maintenance of quotidian life against the looming shadow absolute death.

The film centers on the love story between one of the U.S. submarine captain and an Australian government worker. Their courtship is marred by grief and terror, but in a bittersweet resolution, they decide to spend what little time they have together.

Early in the film, military radio operators detect an indecipherable Morse-code signal from somewhere in the irradiated northern hemisphere. The sequence of the officer in a clean suit scouring an abandoned San Diego for the origin, and his eventual discovery, is a haunting image and the highlight of the film. 

This film is about as dark as it gets within the confines of a Hollywood production in the long hangover of the Hays code-- which is the say, not very dark. There's discussion of suicide, of humanity's hubris, but it elides the horrors of mass death: no on-screen sickness, no piles of corpses, no violation of propriety and conduct. Everyone is boringly composed up to the very end.

I'm also sure this film has nothing to do with the subtitle of _Death Stranding 2_, because Hideo Kojima famously has nothing to say about war or nukes.

## what i'm playing
### _Set Yourself on Fire_ by @denhop
_Set Yourself on Fire_ is a technical marvel. You can't convince me it's actually running in RenPy. 

The game's strength is its holistic sense rhythm: text, visuals, and sound compliment each other perfectly. Its low-poly, restrained yet striking visuals work alongside a largely ambient-electronic soundtrack to cushion the delicately unraveling love story told in searching prose. It's a standout entry in the body of multi-media interactive fiction.

#### (spoilers) a critique
The characters' various personal conflicts and their seemingly cavernous differences in world-view never come to fruition. To end where it does, with their worries simply having faded away instead of coming to a head, is an implicit critique of romance: that it's a bubble buoyed by a shutting-out of the rest of the world, by fantasies of total interpersonal integration, by jealousy of one ever having a life outside the other. There's joy and tenderness in witnessing a blooming first love, but there's an unaddressed foreboding of first heartbreak. Or maybe I'm just a doomer.

[_Set Yourself on Fire_ on steam](https://store.steampowered.com/app/3048420/Set_Yourself_on_Fire/)
## __what i'm working on__
why do i always have to be working on something. can't i just be?
jk. to exist is to work.
### tables of contents
I added [@uncenter/eleventy-plugin-toc](https://github.com/uncenter/eleventy-plugin-toc), for tables of contents in my blog posts, as well as a fun little animation that flashes the heading you've navigated to after clicking on a ToC link.

### lightboxes
Images in [my 'stuff' section](/stuff) will now show a full-res lightbox popup when you click on them. And with no JavaScript!

Unfortunately, the implementation is not exactly how I dreamed of it. More info below in [something i hated](#something-i-hated).

## __something i liked__
got some baklava. yummy.

## __something i hated__
### 423 bugs + me
As mentioned above, I've added lightboxes. When shown, the lightboxes will fade in with a subtle 'slide up' animation. In MS Edge and Chrome, you'll also see the exit animation, where the lightbox slides up and fades out when dismissed.

However, in Firefox, it will unceremoniously blip out of existence. In short, this is because Firefox mis-implements the CSS spec. The [bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=1882408) has been sitting with no activity for two years. Annoyingly, the [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior) on which the bug hinges is labeled as "Baseline Available" with the sexy little check mark next to Firefox, despite the primary use case being broken.

Mozilla apparently can [use AI to detect over 400 bugs](https://www.theregister.com/security/2026/05/08/mozilla-says-ai-helped-squash-423-firefox-security-bugs/5235438) in Firefox, but not to fix this very minor cosmetic bug, which is the only thing I actually care about. 

## __a picture__
### SELF PORTRAIT WITH CRANIAL EXTRUSIONS
![sharpie doodle of a bespectacled balding guy with a beard and triangles coming from his head that could be horns or cat ears](https://i.postimg.cc/nZXgJF5m/spwce.jpg)
_Self Portrait With Cranial Extrusions_, ink on paper.

[^1]: Storm, L. (2025). Meaningfulness in the I Ching Using a Q-Sort Rng Method. _Journal of the Society for Psychical Research_, _89_(2), 65–93.
[^2]: [_The Spectral Voyager II: Timeslip Radio_, "Chapter One: The Vertical Plane"](https://www.youtube.com/watch?v=vP0W_YV_W7c)
[^3]: [_Weird Studies_, "Episode 208 – Unbridled Creation: On Kenneth Batcheldor's Theory of the Paranormal"](https://pocketcasts.com/podcast/weird-studies/b832fa50-ea40-0135-c25e-7d73a919276a/episode-208-unbridled-creation-on-kenneth-batcheldors-theory-of-the-paranormal/bbbf7577-1232-4d7a-a504-bede29d2bd7f)
