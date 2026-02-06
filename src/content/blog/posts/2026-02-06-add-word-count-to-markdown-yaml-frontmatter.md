---
title: add word count to markdown YAML frontmatter
date: 2026-02-06
topics:
  - tech
  - recipe
description: Add a word count property to your Markdown file frontmatter based
  on the file's content
---
## tl;dr
>[!warning] Back your files up before you do this. 

```sh
for FILE in *.md; do
	WORD_COUNT=$(sed '1 { /^---/ { :a N; /\n---/! ba; d} }' "${FILE}" | ws -w | awk '{ print $1 }')
	yq --front-matter="process" ".word_count=$WORD_COUNT" -i "${FILE}"
done
```


## Motivation
This is part of my ongoing project of using Obsidian as a read-it-later app. Since Omnivore (🪦2022-2024) and Pocket (🪦2007-2025) shut down, one right after the other, I decided I was done with SaaS to save my reading.

While procrastinating at work I got curious about what I could do with the data from my read-later files in Obsidian's new [Bases](https://help.obsidian.md/bases) feature, in order to data-mine myself [Luxury Surveillance-style](https://www.youtube.com/watch?v=4kBgnjn5cC0). I thought it would be nice to be able to sort my unread saved articles by word count/estimated reading time so I can get some of the shorter ones out of the way, but there's no built-in way to access and process file content with arbitrary JavaScript in Bases formulas AFAIK.

Thanks to an [Obsidian forum post](https://forum.obsidian.md/t/calculate-time-to-read-based-on-word-count-property/103668) I found out I can add a property to my [Web Clipper](https://obsidian.md/clipper) template to calculate word counts at snip-time, but what about my 8-month backlog of articles?
## Parts of the problem
**Getting the word count of a file**
Solved by `wc`
Print just the word count with `wc -w input.md | awk '{ print $1 }'`
[wc invocation (GNU Coreutils 9.10)](https://www.gnu.org/software/coreutils/manual/html_node/wc-invocation.html)

**...but count only the file content, not the metadata**
Obsidian markdown files include YAML data in a header enclosed by hyphens (`---`). We can get just the body content with `sed` to pipe into `wc`:
```sh ln:false
sed '1 { /^---/ { :a N; /\n---/! ba; d} }' "${FILE}"
```

Kudos: [text processing - How to remove YAML frontmatter from markdown files? - Stack Overflow](https://stackoverflow.com/questions/28221779/how-to-remove-yaml-frontmatter-from-markdown-files#28222257)

**Add a property to the metadata**
We can use [`yq`](https://github.com/mikefarah/yq)'s `--front-matter="process"` flag to manipulate the frontmatter in-place. 
```sh ln:false
yq --front-matter="process" ".word_count=100" -i input.md
```

Kudos: https://jonalmeida.com/til/yq-editing-frontmatter/

## Script
>[!warning] Back your files up before you do this. 

```sh
for FILE in *.md; do
	WORD_COUNT=$(sed '1 { /^---/ { :a N; /\n---/! ba; d} }' "${FILE}" | ws -w | awk '{ print $1 }')
	yq --front-matter="process" ".word_count=$WORD_COUNT" -i "${FILE}"
done
```

Interpolating the `WORD_COUNT` variable like that in the `yq` script is probably bad, but it worked well enough for me.
