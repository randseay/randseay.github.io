---
author: Rand Seay
categories: blog
comments: true
css: /css/examples/css-media-query-debugger.css
date: 2016-08-21 20:20:00
deck: "Responsive design can involve a lot of tweaking, especially in complex
interfaces. I find can easily forget precise breakpoint boundaries, which make
it that much more painful. Here's a media query debugger I made."
image: imgclass
imgclass: css
layout: post
permalink: /articles/css-media-query-debugger
published: true
sitemap:
    lastmod: 2016-08-21 21:23:00
    priority: 0.75
tags: [Code, CSS]
title: "CSS Media Query Debugger"
---

I've made differing variations of this simple debugger based on name conventions in each project. Whether I use "small", "medium", "large", or "mobile", "tablet", "desktop", this is easy to customize<!--more-->.

This particular example uses <a href="http://fontawesome.io/">Font Awesome</a> and device widths in the naming convention, but the debugger in my CSS framework <a href="http://fuselage.skosh.io">Fuselage</a> uses "small", "medium", "large", etc.

<p class="post-note">
    There is a working example of this debugger in the bottom left-corner on this page.
</p>

<figure id='figure-1' class='code'>
{% highlight html %}
<p id="debug-breakpoints"></p>
{% endhighlight %}
<figcaption>Figure 1. You need a little HTML. It's easy to show or hide conditionally based on your environment.</figcaption>
</figure>

<figure id='figure-2' class='code'>
{% highlight css %}
// mobile first
#debug-breakpoints:after {
    font-family: FontAwesome;
    background: whitesmoke;
    bottom: 0;
    border: 1px solid lightgray;
    border-radius: 0 8px 0 0;
    box-shadow: 0 0 20px -5px rgba(153,153,153,0.9);
    color: indianred;
    content: "\f10b";
    font-size: 16px;
    font-weight: 700;
    left: 0;
    padding: 5px;
    position: fixed;
    z-index: 99999;
}

// tablet
@media screen and (min-width: 480px) {
    #debug-breakpoints:after {
        content: "\f10a";
    }
}

// desktop
@media screen and (min-width: 780px) {
    #debug-breakpoints:after {
        content: "\f108";
    }
}

// large desktop
@media screen and (min-width: 1040px) {
    #debug-breakpoints:after {
        content: "\f108   \f067";
    }
}
{% endhighlight %}
<figcaption>Figure 2. Mobile first media query debugger</figcaption>
</figure>

Obviously this can be made easier with preprocessors such as <a href="http://sass-lang.com/">Sass</a> or <a href="http://lesscss.org/">Less</a>. Hope this helps your responsive debugging!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I made this handy little CSS media query debugger and wrote about it briefly: <a href="https://t.co/tQBe0fqnLb">https://t.co/tQBe0fqnLb</a></p>&mdash; Rand Seay (@randseay) <a href="https://twitter.com/randseay/status/767537170299097088">August 22, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<p id="debug-breakpoints"></p>
