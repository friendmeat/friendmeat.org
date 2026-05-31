---
title: "weeklies #46 - pyrrhic catharsis"
date: 2026-05-30
headerImage:
  src: https://i.postimg.cc/pTM8XDNq/vpnscreenshot.png
  alt: Screenshot of my Firefox toolbar where a bug has made Mozilla's new 'free'
    VPN button twice as big as everything else
  format: true
topics:
  - weeklies
description: the Nilssonpill, complicated feelings about I Love Boosters, and spite-coding
---
## __what i'm reading__
### ["Object f(r)ictions: A case study of the Flash software platform"](https://doi.org/10.1080/24701475.2026.2677352)
> The development towards ever more illusory interfaces has intensified and the same applies to the increasingly hegemonic position of programmers, which is no longer limited to the technical field, but is shaping culture in an alarmingly unregulated and undemocratic way.

The author connects the rise of Flash as the _de facto_ infrastructure for multimedia on the internet with the contemporary regime of privacy-invading software. The "digital object" is contrasted with the relational database model, where the object model abstracts data from the end user. Flash's interjection of proprietary server infrastructure and persistent, uncontrollable client-side manipulation was the devil's bargain we made for Stick Figure Fight videos on Newgrounds.

Merkle also co-wrote [_Reckoning With Everything: The Becoming-Environmental of Computing_](https://meson.press/books/reckoning-with-everything/), which looks interesting and is open-access.

## __what i'm listening to__
### Harry Nilsson
![](https://www.youtube.com/watch?v=vrUnYcPIvzM&pp=ygUiaGFycnkgbmlsc3NvbiBlYXJseSBpbiB0aGUgbW9ybmluZw%3D%3D)
I've taken the Nilssonpill. What a voice, what versatility. The rhythms in "Early in the Morning" are incredible. It's incredible that this and "Without You" are on the same record.

## __what i'm watching__
### _I Love Boosters_ (2026, dir. Bootsie Collins)

This movie does everything I bitch about modern movies _not_ doing. It's a fun, vulgar, bloated, loudly political, multi-media celebration of human ingenuity. Corvette's development is a much-needed critique of the rags-to-riches trope. She doesn't end up with the money or the man, but instead with a stronger sense of solidarity with the world, from her fellow boosters to the global workforce whose exploited labor is intimately tied with hers.

<details><summary>but it actually sucks (spoilers)</summary>
<p>The climax was such a fuuucking flop. The most radical thing the film could imagine as the apotheosis of class solidarity was 'chanting with signs'. That's literally explained as the synthesis of Dialectical Materialism. And the sweatshop-running fashion CEO is gently guided out of the story by an anonymous suit. Every film with a progressive ethic resorts to the same platitudes. I don't think it's possible for a movie out of Hollywood be anything other than brain dead slop.</p>

<p>This issue is thrown in stark relief by the think-tank subplot. The think tank are sellouts <i>par excellence</i>, having given up their own identities and literal skin to act as mouth-pieces to corporate interests, taking on the skin of grieving mothers that urge hard-on-crime policies and blue-collar workers that discourage unionization. But they take on only the mouth-pieces, and not the media itself; it's assumed that the news media in <i>Boosters</i> is being taken for a ride.</p>

<p>The think tankers are able to slot so easily into the media because of the media's role in perpetuating and instigating spectacle. It's the non-stop torrent of spectacle and shock that keeps us fearing our own Katamari-balls of wordly stress. Films like <i>Boosters</i> are a pyrrhic catharsis, offering vicarious revolutions, mere simulations of populist solidarity. No one's going to leave this film and start a riot.</p>
</details>

### "Ideology of Gooning/Dems on Israel-Palestine/Death-Drive/Žižek/Lacan/Lord of the Rings/The Big Other"
![](https://www.youtube.com/watch?v=LSNUUY990LY)

This made me want to rethink my life. Am I living as a reification of capitalist ideology? Shouldn't I do the hard thing I want to do instead of the easy thing I don't want to do?

## __what i'm playing__
### another fucking idle clicker game
[Upload Labs](https://store.steampowered.com/app/3606890/Upload_Labs/) is a nerdy little simulator. It was fun to start out completely confused and then slowly start strategizing and min-maxing. I upgraded too quickly without understanding the mechanics, so I ended up with a really inefficient setup. If I try it again I'll have to have a calculator open. Maybe try doing some calculus.

## __what i'm working on__
### a new sign-in kiosk
For liability purposes, my workplace needs to keep a ledger of visitors. To fulfill that requirement my boss set up a touch-screen kiosk. People type their names or scan their IDs and get a name tag, and we fulfill our liability requirements with a record of who entered the building.

But some things have bothered the fuck out of me about it:
- It's a React/Electron app
- It has FOUCs. In an Electron app.
- The database is never backed up anywhere.
- It only runs on Windows.
- The SDK for the label printer requires an internet connection
- The label printer only prints about half the time.
- The barcode scanner works incredibly slowly. I've had to stand with it scanning dozens of people's IDs, and the awkward amount of time it takes to work (if it ever works) is just long enough for people to start making small talk with me. This is unacceptable.

So I'm rewriting the whole thing in vanilla JS. Some improvements I've been able to make so far:
- Keep the whole front-end in a single HTML file (no FUOCs)
- Use CUPS and [`lp`](https://www.man7.org/linux/man-pages/man1/lp.1.html) instead of vendor bloatware
- ...which also means we can air-gap it so it never touches the internet
- Scanning IDs works almost instantly
- Also made a Spanish translation of the UI

Some things I'm struggling with:
- The USB barcode scanner just acts like a keyboard, but my `keydown` event trap doesn't capture everything, so scanning a bar code can result in random shit happening.
- I'm not sure what to actually do with the data. Right now we just let it sit on the machine. In my wildest dreams I thought

Am I taking on this project as a self-aggrandizing reaction formation because I feel intimidated by legacy codebases? Absolutely, yes.

## __something i liked__
coworker cafe me a gift card for coffee just for doing the job i'm supposed to be doing anyway. nice.

## __something i hated__
It's going to take me years to recover from the devastating hit my self-esteem took last weekend.

## __a picture__
![Screenshot of my Firefox toolbar where a bug has made Mozilla's new 'free' VPN button twice as big as everything else](https://i.postimg.cc/pTM8XDNq/vpnscreenshot.png)
Do you think Mozilla wants me to use their VPN.