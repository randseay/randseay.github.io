---
author: Rand Seay
categories: Blog
comments: true
date:
deck: "Home-grown debugging tools can be extremely handy and have the potential to save you from headaches and lost time."
image:
imgclass:
layout: post
permalink: /articles/quick-js-debugger
published: false
tags: [Code]
title: "A Quick and Dirty JS Debugger"
---

Although not very elaborate, here is a quick example of a self-contained JavaScript debugger that can bring problems to your attention.<!--more--> It is best used in a development environment, and should not find its way into your production code.

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
                "background:red;" +
                "border-radius:10px 0 0 0;" +
                "bottom:0;" +
                "display:inline;" +
                "padding:10px;" +
                "color:white;" +
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
<figcaption>Figure 1. Dirty, but self-contained!</figcaption>
</figure>
