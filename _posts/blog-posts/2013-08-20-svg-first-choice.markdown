---
author: Rand Seay
categories: Blog
comments: true
date: 2013-08-20 18:37:21
deck: "With great browser support and increasingly diverse ways of accessing the web, you can stop worrying about the quality of your graphics by using SVG."
imgclass: svg
layout: post
permalink: /articles/svgs-should-be-your-first-choice
published: true
redirect_from:
    - /posts/svg-should-be-your-first-choice/
sitemap:
    lastmod: 2015-09-22 09:00:00
tags: [Code, SVG]
title: "SVG Should Be Your First Choice"
---

As a graphic designer with plenty of print experience, The *first* thing I reach for when I need a visual element is a vector-based file. If there are none to be had, something inside of me sighs sadly as I settle for a pixelled fallback<!--more-->. Here's why.

Pixel-based files rely on a level of quality that is built into them, represented as a density. It comes down to how many dots (or pixels) we can cram into a certain area. The higher that number, the better the quality, and the larger the image can be before it begins to break down and look bad. Usually a good rule of thumb is 300 dpi for print. At this level it is generally agreed that the naked eye cannot detect the individual dots, and the image looks crisp. A vector graphic, on the other hand, utilizes geometrical primitives such as points, lines, curves, and shapes &mdash;which are all mathematical expressions&mdash; to represent images. The level of quality is no longer built into the file, and is only limited by the output capabilities of the printer. In the world of print, this is wonderful. I can put a logo on the side of an airplane using the same vector file that is on the business card. All without losing an ounce of clarity.

Here's the big point &mdash;the exact same concept holds true in the web development world, where pixels have ruled since the beginning time. Pixels are the comfort zone, but the future of the web is not pixel-friendly. Any given visual element needs to be viewed in a multitude of sizes and shapes. Meet the SVG (Scalable Vector Graphic), your new best friend. You can see that [support for the svg](http://caniuse.com/svg) is better than ever before, and will only continue to improve. In a world where displays are not only varying greatly in size, but becoming far more powerful (think retina), pixels are less and less suited to keep up. If you have poked around my site, you can see that I have used SVGs wherever possible, taking major steps in future-proofing it. Honestly, they are not as cut and dry to work with right now, but with resources like Chris Coyier's articles about [using SVGs](http://css-tricks.com/using-svg/) and [SVG fallbacks](http://css-tricks.com/svg-fallbacks/), as well as the [W3C Recommendation](http://www.w3.org/TR/SVG/Overview.html), there are definitely ways to learn.

## Quick Reasons Why SVG is a Good Idea

- Resolution Independent. (Bye-Bye pixel density)
- Relatively small file size. (Depending on the complexity of the graphic.)
- Compresses well. (.svgz file format)
- Great for responsive design. (Scales beautifully.)
- Insanely customizable. (Select with CSS, transitions, and much more that we can't talk about now.)

I should note that rasterized file formats do have a ligitimate place in web development &mdash;I hope that was understood above. However, many designers and developers would do well to incorporate vector-based file formats (such as the SVG) into their work flow wherever possible.
