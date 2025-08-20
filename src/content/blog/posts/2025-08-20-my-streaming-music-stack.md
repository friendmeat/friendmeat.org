---
title: my streaming music stack
date: 2025-08-20
headerImage:
  src: https://i.postimg.cc/0yGtBnyh/cds-stack.jpg
  alt: a datamoshed image of CD binders
topics:
  - fuck-spotify
  - tech
description: the hardware, software, and price of the self-hosted stack I used
  to replace spotify
---
this is the sequel to [things i hate about spotify that don't have anything to do with the business model](https://friendmeat.org/blog/2025/08/19/things-i-hate-about-spotify-that-have-nothing-to-do-with-the-business-model/)

# TL;DR
1. set up a computer to run 24/7
2. attach a high-capacity hard drive with all your music, etc
3. set up a media server like Jellyfin, Emby, or Plex.
4. forward your media server's port on your router
5. connect your media server to symfonium

# pre-ramble
## spending _more_ money for _less_ music?!?!

> wdym it costs _more_ money...

yeah. i spend more money on music now because I buy it straight from the musician, and they get paid more than they would if I were streaming their music on spotify every day for the rest of my life. 

the idea of spending $120+ a year for the rest of my life and that money not even going to the musicians I stream has been unacceptable to me from the start of my relationship with spotify, which is why i've lied and cheated my way into discounts and cracked premium APKs the whole time.   

as you'll see, I end up paying _more_, but it's for infrastructure _I_ control, that I can use for whatever purposes I want, including streaming movies and web hosting. ___and___ I don't have to deal with spotify's awful fucking UI and their DRM bullshit and [[things i hate about spotify that don't have anything to do with the business model|everything else I hate about it]]. i paid $5 for [Symfonium](https://www.symfonium.app/)-- and that's a perpetual license after a 30-day trial-- and it's leagues better. i can even customize the colors and menu options if i felt like it. 

# my music streaming stack
## 1. HTPC (home theater computer)
- [Intel BNUC11ATKC2000U](https://www.newegg.com/p/N82E16856102369) - $126
- [2 TB SSD](https://www.newegg.com/team-group-2tb-ms30-sata/p/N82E16820331840) - $96.99
- [32GB DDR4 SO-DIMM](https://www.newegg.com/corsair-vengeance-32gb-ddr4-3200-cas-latency-cl22-laptop-memory/p/N82E16820236681) - $59.99
- 5TB HDD - ~$100-ish in 2018 money

Total+tax+shipping $\approx$ $**400**

The NUC is connected to the 5 TB hard drive with all the movies and music i've acquired since high school.

## 2. software
- [ubuntu](https://ubuntu.com/download) ($0)
- [docker](https://www.docker.com/) ($0)
- [soulseek](https://www.slsknet.org/news/node/1) ($0)
- [picard](https://picard.musicbrainz.org/) ($0)
- [jellyfin](https://jellyfin.org/) ($0)
- [symfonium](https://www.symfonium.app/) ($5)

Total = $5

The NUC runs Ubuntu, then I have a [Jellyfin](https://jellyfin.org/) docker container.  which i mount as a volume to the Jellyfin container. I use ubuntu on my laptop to add the media folder of my HTPC over ssh to my file explorer, then use the apt version of [MusicBrainz Picard](https://picard.musicbrainz.org/) (the flatpak version throws a fit with the permissions of remote files) to update and save all the tags on the mp3s I get from various places. I've forwarded the Jellyfin port on my router[^†] so I can access it anywhere with Symfonium.


#### a note on symfonium
when I need to know something, I look it up on the internet and invest total faith in the top reply to the first reddit thread I read, which is how I found out about [symfonium](https://www.symfonium.app/). I really like it. it's highly customizable, it's free for a month and then there's a $5 one-time charge, which I was happy to pay because I was constantly using it. That's a fucking steal. 

__However__, i have to hedge because it's not open-source, so it's liable to enshittify, like Plex and Filebot. the dev could decide at any moment to go from craftsman to landlord, remove convenient features and paywall the rest.


## 3. externalities
- electricity for always-on HTPC (~$10/month)
- domain name (optional) ($10/year)

Total $\approx$ $130/year

so this is _more_ than I would be paying for spotify in a year, but i'm paying for electricity either way, I use my HTPC for more than just music, and the domain name is just for convenience. the difference is that I know _what_ i'm paying for and _why_.

# my process
## finding stuff
[soulseek](https://github.com/realies/soulseek-docker) in a docker container. you can find [guides for try-hards](https://mediastack.guide/) who want to automate the whole process and do it with maximum security and 2FA and everything but it's too much of a headache for me.

## tagging stuff
1. download stuff on soulseek
2. Open the completed downloads folder in Picard
3. Match metadata for albums/tracks
4. Configure Picard to save everything in automatically-structured folders in my HDD's media folder

## streaming stuff
Jellyfin updates automatically after the files are saved and I can start streaming from Symfonium. yippee!

# this sounds like a lot of work
yeah. i don't get out much. 


[^†]: I haven't set up anything to handle dynamic DNS so when my IPS changes my public address I'm just gonna be fucked until I figure out that that's what happened
