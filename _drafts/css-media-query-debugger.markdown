---
author: Rand Seay
categories: Blog
comments: true
date:
deck: "Responsive design can involve a lot of tweaking, especially in complex
interfaces. I find can easily forget precise breakpoint boundaries, which make
it that much more painful. Here's a media query debugger I made."
image:
imgclass:
layout: post
permalink: /articles/css-media-query-debugger
published: false
tags: [Code]
title: "CSS Media Query Debugger"
---

<figure id='figure-1' class='code'>
{% highlight css %}
#debug-breakpoints:after {
    .font--font-awesome();
    background: @color--content-background;
    bottom: 0;
    border: 1px solid @color--content-border;
    border-radius: 0 @border-radius 0 0;
    /*box-shadow: 0 0 20px -5px rgba(153,153,153,0.9);*/
    color: @color--kaggle-black;
    font-size: 16px;
    font-weight: 700;
    left: 0;
    padding: 5px;
    position: fixed;
    z-index: 99999;

    .responsive-desktop-large({
        content: "\f108   \f067";
    });

    .responsive-desktop({
        content: "\f108";
    });

    .responsive-tablet({
        font-size: 20px;
        content: "\f10a";
    });

    .responsive-mobile({
        font-size: 22px;
        content: "\f10b";
    });
}
{% endhighlight %}
<figcaption>Figure 1. Strictly CSS debugger</figcaption>
</figure>
