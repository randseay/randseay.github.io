---
author: Rand Seay
categories: blog
comments: true
date: 2016-08-22 10:21:00
deck: "Home-grown debugging tools can be extremely handy and have the potential to save you from headaches and lost time."
image: imgclass
imgclass: js
js: /js/examples/quick-js-debugger.js
layout: post
permalink: /articles/quick-js-debugger
published: true
sitemap:
    lastmod: 2016-08-22 10:21:00
    priority: 0.75
tags: [Code, JS]
title: "A Quick JS Error Debugger"
---

Although not very elaborate, here is a quick example of a self-contained JavaScript debugger that can bring problems to your attention<!--more--> without having to have the console open. It is best used in a development environment, and should not find its way into your production code.

<p class="post-note">
    You can see this in action in the bottom-right corner of this page.
</p>

<figure id='figure-1' class='code'>
{% highlight html %}
<script>
    (function () {
        function PageError(message, source, lineno, colno, error) {
            this.message = message;
            this.source = source;
            this.lineno = lineno;
            this.colno = colno;
            this.error = error;
        }

        var pageErrors = [];

        function renderPageErrorLink(errors) {
            var jsDebug = document.getElementById("jsDebug");
            var jsDebugStyle = "position:fixed;" +
                "background:whitesmoke;" +
                "border-radius:10px 0 0 0;" +
                "border:1px solid lightgray;" +
                "bottom:0;" +
                "box-shadow: 0 0 20px -5px rgba(153,153,153,0.9);" +
                "display:inline;" +
                "padding:10px;" +
                "color:indianred;" +
                "font-family:sans-serif;" +
                "font-size:12px;" +
                "font-weight:bold;" +
                "right:0;" +
                "z-index:9999;";
            var jsDebugText = errors.length + " JS error";
            if (errors.length > 1) {
                jsDebugText += "s";
            }

            jsDebug.text = jsDebugText;
            jsDebug.style.cssText = jsDebugStyle;

        };

        window.onload = function () {
            var jsDebug = document.createElement("a");
            jsDebug.id = "jsDebug";
            jsDebug.style.cssText = "display:none;";
            document.body.appendChild(jsDebug);

            if (pageErrors.length) {
                renderPageErrorLink(pageErrors);
            }
        }

        window.onerror = function (message, source, lineno, colno, error) {
            pageErrors.push(new PageError(message, source, lineno, colno, error));
        };
    })();
</script>
{% endhighlight %}
<figcaption>Figure 1. A little dirty, but completely self-contained!</figcaption>
</figure>
