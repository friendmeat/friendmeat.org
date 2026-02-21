---
title: "atproto pds self-hosting: some issues and antipatterns"
date: 2026-02-21
topics:
  - tech
  - self-hosting
description: some issues with self-hosting my atproto PDS
---
The Bluesky [personal data server (pds) repository](github.com/bluesky-social/pds/) is weirdly opinionated about stuff that's easy, and unhelpful with the stuff  that's hard. They also insist on using a script that installs a whole HTTP server and Docker stack. But if you're gonna use Docker why assume that people don't already have their own stack? It's just weird and annoying. But here's how I did it.

## Hosting
### PDS Backend
The hosting is the easy part. This is my process for self-hosting any app (that has a Docker image available) on my VPS with NGINX as the reverse proxy:
1. Add the config to my `compose.yaml`
2. Copy one of my existing config files in `/etc/nginx/conf.d` and modify it to point my chosen subdomain (`pds.friendmeat.org`) to the docker container's published port
3. Add the subdomain to my DNS config from the provider's admin panel.

### Mail Server
I already have a free-tier account with [Resend](https://resend.com/). Once you follow Resend's tutorial to set up with your domain, it Just Works(TM). Set up your DNS as recommended and plug their SMTP url into the .env file for your PDS:

```sh
PDS_EMAIL_SMTP_URL=smtps://resend:<api_key>@smtp.resend.com:465/
PDS_EMAIL_FROM_ADDRESS=noreply@friendmeat.org
```

## Migrating
Here's where the fun begins.

the `psadmin` command the README recommends using is a shell script that... downloads and executes other shell scripts. I'm inexperienced but this just feels weird. It's not portable at all and is contingent on using their recommended install script. I just used [`goat`](https://github.com/bluesky-social/goat) for admin actions instead.

### Error PayloadTooLarge

When starting the migration I immediately ran into [HTTP Error 413: `Content Too Large`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/413). First I tried to up the limit on the `PDS_BLOB_UPLOAD_LIMIT` variable in the pds.env file. That didn't do anything. I looked at my Nginx server's access logs and saw it was issuing the 413 error. So I figured I had to up the upload limit on my server. I added the `client_max_body_size` directive to the server config block and set it to have no limit:
```diff
server {
	server_name				pds.friendmeat.org;
+	client_max_body_size	0;
	
	location / {
		# ...
	}
}
```

Blob migration worked normally from there.

### DNS and Handle Validation
So right now my handle is this mangled disaster: `@friendmeat.pds.friendmeat.org`. This is because my PDS is being served from the `pds.` subdomain. My root domain `friendmeat.org` points to Neocities' server, so I can't set subdirectories (i.e. `/xrpc`, `/.well-known/`). I might try hacking something with DNS and my reverse proxy so my root domain points to my serverthen forwards to Neocities, but that seems complicated. I'm tempted to just self-host my whole website, but I want that sweet Neocities Cred.

If you want a custom handle on bluesky without the INVALID HANDLE warning, you have to have DNS and/or HTTP validation. I tried just DNS validation but that didn't seem to make Bluesky happy. So for HTTP validation I've hard-coded my handle and DID into my Nginx configuration:
```nginx
server {
	server_name    friendmeat.pds.friendmeat.org;
	location "/.well-known/atproto-did" {
		default_type "text/plain";
		return 200 "did:plc:..."
	}
}
```

This is insane. Don't do this. If I wanted to add other users to my PDS, I'd have to add them by hand.

## Resources
https://hyprlab.co/migrate-your-bluesky-account/
https://cprimozic.net/notes/posts/notes-on-self-hosting-bluesky-pds-alongside-other-services/
