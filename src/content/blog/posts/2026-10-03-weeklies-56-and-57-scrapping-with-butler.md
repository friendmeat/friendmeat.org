---
title: weeklies 56 & 57 - scrapping with butler
date: 2026-10-03
headerImage:
  src: https://i.postimg.cc/9fg6cM3j/flaco.webp
  alt: flaco
  format: true
topics:
  - weeklies
description: scrapping with butler; gluten free won't save me; and Iran (*nodding sagely*).
---
"Why am I so burnt out," "Why can't I get things out on time," "Why do I feel the spark of life leave my body and want to do nothing at all."-- I've worked twelve of the past fourteen days. I just checked the page count for the uncut first draft of my fiction project and it's 136 pages (in 10pt font). That's so much shit I have to edit and I haven't even said a sliver of what I want to say. And I'm struggling to concentrate in general.

Here's what I've been doing the past two weeks:

# WEEKLIES 56
## __what i'm reading__

### Judith Butler, "The Force of Fantasy: Feminism, Mapplethorpe, and Discursive Excess"

On the occassion of a conservative motioning to pull federal funding from orgs that exhibit Mapplethorpe, Butler gets some digs in on anti-porn feminists and conservatives. She tries to unmask them like a Scooby-Doo villain, to say: a-ha! _You_ were the pervert all along!

> \[The homosexual] is a figure who can only be figured by \[Jesse] Helms \[R, NC], who belongs to him, as it were, and who will be forbidden to figure anything or anyone in return. Is this a figure that the law contrives in order to prohibit, or perhaps, prohibits in order to produce - time and again - for its own ... satisfaction?... What kind of sadomasochistic performance is this that brings into phantasmatic relief the very object that it seeks to subordinate, revile, debase, and denigrate? Is this not, paradoxically, a public flogging and debasement of the homosexual that is finally necrophilic as well, considering the fact that Mapplethorpe, who is made to stand for homosexuality in general, is but recently dead from AIDS?

Put this next to my protest poster of Trump and Putin making out.

And later, Butler invokes Foucalt's idea that it's prohibition that breeds fantasy: 

> Prohibition appears to precede fantasy and to structure it essentially; this is part of what is meant earlier by the claim that fantasy designates the constitutive outside of the real.

Is it _just_ prohibition that creates fantasy? I can name half a dozen so-called prohibitions that no one has a kink for:
- Throwing recyclables away into mixed refuse
- Ignoring software updates.
- Driving no less than 10 but no more than 12 miles over the speed limit
- Storing electronic devices with batteries still in them
- Forgetting to silence your phone in a movie theater.
- Loitering.

And consider, like, breeding kink. That's literally the one _something I hated_thing everyone is telling you you're supposed to be doing. And yet it's still source of fantasy. I don't buy it.

https://read.dukeupress.edu/differences/article/2/2/105/298383/The-Force-of-Fantasy-Feminism-Mapplethorpe-and

## __what i'm watching__
### plagued by visions
![](https://youtu.be/ldcieL7DKyQ?si=WEpMKu-Q6YIdjGqS)

T.W. CSA

Plagued by Visions has returned with a 40 minute video on _Hogg_ that doesn't mention... a single event in the book? To be fair [I didn't either](https://friendmeat.org/blog/2025/07/12/weeklies-10-the-cloaciform-regime/#hogg). And it might literally be illegal to relate any of the events online. But it was nice to listen to someone try to take something constructive away from it, even if it's mostly just a re-hashing of [The Antisocial Thesis of Queer Theory](https://www.jstor.org/stable/25486357).

## __what i'm playing__
### _Sprawl: Zero_
A fun game.

## __what i'm working on__
### dollar store elimination diet
I've eaten almost no gluten for a week as part of an attempt to deal with some gastrointestinal issues.

## __something i liked__
### `basename` works on urls

I thought `basename` was only for stripping the directories off of file paths, but apparently it works on URLs too. I guess that's not too crazy because a URL is just a file path with a protocol on the front?

Just as a completely random example, you can stick a URL like `https://nodejs.org/dist/v26.9.0/node-v26.9.0-linux-x64.tar.gz` into `basename` and get just the archive `node-v26.9.0-linux-x64.tar.gz`. 

```sh
FILENAME=$(basename https://nodejs.org/dist/v26.9.0/node-v26.9.0-linux-x64.tar.gz)
echo "${FILENAME}"
# node-v26.9.0-linux-x64.tar.gz

# And you can strip the suffix with bash string manipulation
echo "${FILENAME%.tar.gz}"
# node-v26.9.0-linux-x64

```


---

# WEEKLIES 57
## what i'm reading
### [The Iranian Revolutionary Corps' Open Letter To The Honouable People of the United Stated of America](https://img9.irna.ir/d/r2/2026/09/29/0/173138753.pdf?ts=1790679102019)

> Why should underprivileged American men and women risk their lives for opaque objectives that seem to mean nothing to anyone except the ruling elite, who seem to have no qualms blithely sacrificing the lives of their fellow countrymen and -women while they go on with their ordinary lives pursuing their personal interests at the expense of ordinary Americans?

They make a solid point.

## what i'm listening to
### Shintaro Sakamoto
![](https://www.youtube.com/watch?v=4zECbjfi75M&list=PLwikIyWUfSr0ZELaOI9vz5hUmKXGY1oRU&index=5)

Come onnnnnnnn man.

I clicked on a random <1k view DJ mix that turned out to be a recording from a record store in Hawai'i, so I looked at their website and clicked on the first record they had listed, which was Shintaro Sakamoto's latest: _Yoo-hoo_. 

And now i'm a sakamotohead.,

## what i'm watching
### _Infinity Pool_ (2023)
Mia Goth in _Infinity Pool_ reminds me of a friend because I think she'd also be really in to psychologically dismantling Alexander Skarsgård. I told the friend as much and she watched it and agreed.

## something I hated
### dollar store elimination diet doesn't work

It does not seem to have made an effect. The bathroom is still my personal struggle session.

## something I liked
### dollar store elimination diet made me a better cook

I do, however, feel like the constraint of eliminating gluten has made me a slightly better chef. I've been making a lot of stir fry and beans and lentils. It's all very yummy.

## a picture
### flaco jiménez

![edit of tejano music legend flaco jiménez surrounded by pink hearts with a pink vignette and kawaii blush marks drawn on his cheeks](https://i.postimg.cc/9fg6cM3j/flaco.webp)

the friend I said reminded me of Mia Goth in _Infinity Pool_ made this for me at my request.