---
author: Rand Seay
categories: Blog
comments: true
date: 2014-09-08 18:37:21
deck: "Combine Grunt, Sass, and SVG to create a dynamic, efficient, and intuitive development environment. Here's one way to do it."
layout: post
permalink: /articles/grunt-sass-svg-workflow
published: true
sitemap:
    lastmod: 2015-09-22 09:00:00
    priority: 0.75
tags: [Web Development, SVG, Grunt, Sass]
title: "A Grunt, Sass, and SVG Workflow"
---

We are right in the middle of building a web app at [Skosh Interactive](https://skosh.io). It was mere splash page and newsletter signup that needed to grow into Flask app with quite a few features –and ideally be mobile-friendly<!--more-->. Because our own front-end framework is not yet ready for the big leagues, we decided on [Foundation](http://foundation.zurb.com) –with [Sass](http://sass-lang.com/), of course. And SVG (I might be a little addicted, sue me).

I had just stumbled across a [screencast by Chris Coyier](http://css-tricks.com/video-screencasts/screencast-134-tour-site-progress-built-jekyll-grunt-sass-svg-system/), and I was fired up about implementing a modern workflow. So I branched off and dove in. I tried to plan out all of the packages I would need and which tools I wanted to incorporate. It was `npm install` this and `npm install` that. The project is private right now, but the `devDependencies` section of my `package.json` file looked like this.

{% highlight json %}
{
    "devDependencies": {
        "grunt": "~0.4.2",
        "grunt-autoprefixer": "~0.8.2",
        "grunt-contrib-copy": "^0.5.0",
        "grunt-contrib-imagemin": "^0.8.0",
        "grunt-contrib-uglify": "~0.2.7",
        "grunt-contrib-watch": "~0.5.3",
        "grunt-newer": "^0.7.0",
        "grunt-sass": "^0.14.1",
        "grunt-shell": "^1.0.1",
        "grunt-svgstore": "~0.3.0",
        "load-grunt-tasks": "~0.2.1",
        "node-sass": "^0.9.3"
    }
}
{% endhighlight %}

## Styles (Sass and Foundation)

With these tools installed, the next step was configuring Grunt to do my bidding.  I ended up creating a task that handles all of the styles for the project. It compiles my sass files, autoprefixes them, and compiles my customized version of Foundation. Here are the various sections of the `Gruntfile` that dealt with the styles.

{% highlight js %}
sass: {
    options: {
        includePaths: ["bower_components/foundation/scss"]
    },
    global: {
        options: {
            outputStyle: "compressed"
        },
        files: {
            "path/to/global.min.css": "path/to/global.scss"
        }
    },
    foundation: {
        options: {
            outputStyle: "compressed"
        },
        files: {
            "path/to/foundation.min.custom.css": "path/to/foundation-custom.scss"
        }
    }
},

autoprefixer: {
    global: {
        src: "path/to/global.min.css"
    }
},
{% endhighlight %}

The `foundation-custom.scss` file is a sass file that I created that contains just a few lines. It sits next to the `_foundation-settings.scss` file, which is simply a copy of the foundation settings file that I customize as I work. After importing `normalize.scss` and the settings, it finds the rest of Foundation's Sass files.

{% highlight sass %}
// Import all of the application components.
@import
    "path/to/bower_components/foundation/scss/normalize.scss",
    "_foundation-settings.scss",
    "path/to/bower_components/foundation/scss/foundation.scss";
{% endhighlight %}

## SVG System

The other slick system I wanted to get working was the `svgstore` system that creates and utilizes SVG sprites. I place all of my svg files in an `svg` directory, and it grabs them all and embeds it into my html in a hidden location. From there, I can reference any SVG I would like, and it displays it where I need it. The setup is as follows.

{% highlight js %}
svgstore: {
    options: {
        prefix : "shape-",
        cleanup: false,
        symbol: {
            preserveAspectRatio: "xMidyMid meet",
            width: "100%"
        },
        svg: {
            style: "display: none;"
        }
    },
    default: {
        files: {
            "path/to/svg/svg-defs.svg": ["path/to/svg/*.svg"]
        }
    }
},
{% endhighlight %}

The HTML looks a little bit like this.

{% highlight html %}
<!-- This is where the svgs are placed, hidden -->
<div id="svg-defs"></div>

<!-- This is how you reference and display one of the svgs -->
<svg><use xlink:href="#name-of-shape" /></svg>
{% endhighlight %}

This is just a little glimpse of what is starting to emerge out of the "modern" workflow that I desired to put in place. The rest of the tasks move files where they need to be, optimizes images, and generally keeps things tidy. It is tough to go into great detail without giving you an entire tour of the project, but perhaps there will be more to come.