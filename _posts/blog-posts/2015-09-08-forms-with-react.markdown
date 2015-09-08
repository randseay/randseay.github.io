---
layout: post
title: "Not-so-simple Forms with React"
date: 2015-09-08 14:47:47
author: Rand Seay
categories: blog
tags: [Web Development, React, Forms]
permalink: /posts/forms-with-react
css: /css/examples/forms-with-react.css
js: /js/examples/forms-with-react.js
deck: "It can be tricky to handle elaborate form features such as repeatable sections and context-sensitive hiding or showing. Here's how React can help."
---

[React's form documentation](https://facebook.github.io/react/docs/forms.html) focuses on basic properties and outlines the differences between *controlled* and *uncontrolled* components within forms, but composing more advanced forms is left up to the imagination of the developer<!--more-->. The majority of one-off contact forms could be handled as a single component &mdash;`<Form />`, for instance.

<figure class='code'>
{% highlight js %}
var React = require('react');

var Form = React.createClass({
    render: function() {
        return (
            <form>
                <fieldset>
                    <legend>Basic Infos</legend>

                    <label htmlFor='thing'>Info Plz
                        <input id='thing' name='thing' type='text' />
                    </label>

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form />, document.getElementByID)('myForm'));
{% endhighlight %}
<figcaption>Forgive the lack of syntax highlighting for JSX</figcaption>
</figure>

Here's the output.

<figure class='code'>
    <div id='myForm' class='drop-shadow'></div>
    <figcaption>Styles courtesy of <a href='http://fuselage.skosh.io'>Fuselage</a></figcaption>
</figure>

But moving into the realm of a form framework is not so simple. It quickly becomes necessary to abstract away elements of the form into other React components.
