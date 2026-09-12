---
title: Using live-build and GitHub Actions to build customized Debian live
  install ISOs
date: 2026-09-12
headerImage:
  src: https://i.postimg.cc/ZRWqmrxj/debian-ibm-delay-wahwah-indexed.jpg
  alt: IBM PC with the debian logo superimposed on its screen and datamoshed
  format: true
---

tl;dr: skip to [section 5](#5.-tl%3Bdr-how-to-do-it) for instructions

# 0. Prologue: Why?

At work I've started installing Debian on a bunch of critical shit. My boss doesn't know how any of it works so I need standardized, reproducible, documented builds. My solution up until now was to have a `preseed.cfg` file that calls a script that configures the system the way I want it. My only instructions were, "copy this to a USB with Debian on it and plug it in." That's stupid. 

# 1. `live-build`

`live-build` is a bunch of scripts you can install with `apt install live-build` and interface with via the `lb` command. 

`live-build` is very much geared toward creating "live" Debian images, i.e. that can be booted straight from RAM instead of installed. For my purposes I don't need that. It's very likely that the large bulk of the build step is a waste of time, in particular the creation of the `squashfs` file system. 

# 2. "But It Works On My Machine!!!"

I was running `live-build` on WSL2 running Ubuntu. I figured "It's a Debian-based distro-- it's gotta Just Work, right??"

I think a lot of my issues stemmed from this.

### 2.1 The Hall of (Debian) Mirrors
The default mirrors for building debian Trixie images with live-build seems to be wrong. I don't know if they decided to just change the apt repository URL structure for the Trixie release but whatever. I don't remember exactly but the mirror for security updates but I think it was using the wrong subdomain. Adding this option fixed it for me:

```sh
--parent-mirror-security https://security.debian.org/debian-security/
```

### 2.2 Containers to the rescue
`live-build` was not working on my Ubuntu WSL distro. So I tried instead building a Debian 13 container to run `lb config` and `lb build` with my existing configuration. This was my Dockerfile:

```dockerfile
FROM debian:trixie
RUN |
	apt update
	apt install live-build
	mkdir /entrypoint.d

COPY <<EOF "/entrypoint.d/entrypoint.sh"
#!/bin/sh
lb clean
lb config
lb build
EOF

WORKDIR /live-build

ENTRYPOINT ["/bin/sh", "-c", "/entrypoint.d/entrypoint.sh"]
```

And I tested the build like this:

```sh
# 1. Build the image
docker build --tag live-build:latest .

# 2. Run the container
# My live-build config files are in the PWD
docker run --rm --cap-add=SYS_ADMIN -v "${PWD}:/live-build" live-build:latest
```

The `--cap-add=SYS_ADMIN` flag is necessary to give live-build sufficient permissions to mount volumes within the 

### 2.3 Dev loop hell

My process was:

1. Tweak a setting in my `auto/config` script
2. Start up the build in Docker
3. Wait for build to succeed or fail
4. On failure, go back to step 1
5. On success, test with a VM
6. Manually shutdown WSL when Hyper-V complains about low memory, then launch the VM in the second before WSL starts itself back up:
```powershell
wsl.exe --shutdown && Start-VM -VMName Debian13
```

7. Install the OS and see if it works.

By the time I was troubleshooting the preseed stage, this whole cycle took like 15-20 minutes. It was a pain in the fucking ass.

# 5. tl;dr How To Do It

1. Install `live-build`
```sh
sudo apt update
sudo apt install live-build
```

2. Make your config directory
```sh
mkdir auto

# Copy example files from live-build
cp /usr/share/doc/live-build/examples/auto/* auto/
```

3. Create a GitHub repository and push your config.

4. Create an **access token** for your runner so it can update the release with the built ISO
	1. GitHub -> Settings -> Developer Settings -> Personal Access Tokens
	2. I made a new granular token with read/write permissions to the repository I'm keeping my configuration in.

5. My GitHub action looks like this:
```yaml
on:
  push:
    tags: ["*"] # Run for any tag

jobs:
  build:
    runs-on: ubuntu-latest
    container:
      image: debian:trixie
      options: "--privileged"
  
    steps:
    - name: Cache packages
      uses: actions/cache@v6
      with:
        path: cache
        key: "${{ runner.os }}-build"
        
    - name: Install Dependencies
      run: |
        apt update
        apt install -y \ 
          debian-archive-keyring \
          live-build
          
    - name: Checkout
      uses: actions/checkout@v7
      
    - name: Build
      run: |
        set -eux
        lb config
        lb build
        ls -alh
        
    - name: Update Release
      uses: softprops/action-gh-releases@v3
      token: ${{ secrets.RUNNER_TOKEN }} # Fine-grained Access Token
      files: live-image-amd64.iso
      
```


# 6. Conclusion
I think the Debian documentation and bug tracking is stuck in the 90s. You have to search through public email threads for issues similar to yours. The only reason you'd read any Debian docs is if your livelihood depended on it. And I wouldn't trade it for anything, though. Some call it masochism-- I call it job security. 

In the process of trying to figure this shit out I encountered an error that apparently no one else but a neuroscientist from Germany encountered. He emailed the `live-build` devs in 2019 and they apparently never publicly responded. R.I.P that guy.

# 7. Acknowledgements

- The GitHub action workflow is stolen almost entirely from the Forgejo config here: [lgrn/live-build](https://codeberg.org/lgrn/live-build)

- Header image uses a [photo](https://commons.wikimedia.org/wiki/File:Ibm_pc_5150.jpg) by Ruben de Rijcke released under the CC BY-SA 3.0 License.

- Debian Logo Copyright (c) 1999 Software in the Public Interest, Inc
