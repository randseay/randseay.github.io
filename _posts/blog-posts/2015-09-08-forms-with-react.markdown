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
deck: "It can be tricky to handle elaborate form features such as repeatable sections and context-sensitive hiding or showing. Here is an approach using React."
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
                    <legend>Basic Stuff</legend>

                    <label htmlFor='email'>Email Address
                        <input id='email' name='email' type='email' />
                    </label>

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
<figcaption>Forgive the lack of syntax highlighting for JSX</figcaption>
</figure>

Here's the output.

<figure class='code'>
    <div id='myForm1' class='form-example drop-shadow'></div>
    <figcaption>Styles courtesy of <a href='http://fuselage.skosh.io'>Fuselage</a></figcaption>
</figure>

But moving into the realm of a form framework is not so simple. It quickly becomes necessary to abstract away elements of the form into other React components. A natural way to break up a web form is into **input groups** &mdash;that is, a label and an element that takes input. This covers the majority of use cases that forms must handle, as evidenced by personal experience and the forms that can be built for [Foundation](http://foundation.zurb.com/docs/components/forms.html) or [Bootstrap](http://getbootstrap.com/components/#input-groups). Here is what a component `<InputGroup />` could look like in this example.

<figure class='code'>
{% highlight js %}
var React = require('react');

var InputGroup = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                <input id={this.props.id} name={this.props.id} type={this.props.type} />
            </label>
        );
    }
});

var Form = React.createClass({
    render: function() {
        return (
            <form>
                <fieldset>
                    <legend>Basic Stuff</legend>

                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />
                    <InputGroup id={'password'} type={'password'} title={'Password'} />

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
</figure>

The output is the same, but now the `<InputGroup />` component can be used repeatedly for other input groups.

<figure class='code'>
    <div id='myForm2' class='form-example drop-shadow'></div>
</figure>

Creating the `<InputGroup />` component is a great first step, but it cannot yet handle textareas, selects, inline checkboxes, or inline radio buttons. Add some simple logic to check for textareas or inline elements.

<figure class='code'>
{% highlight js %}
var React = require('react');

var InputGroup = React.createClass({
    render: function() {
        var input;
        switch (this.props.type) {
            case 'textarea':
                input = (
                    <textarea id={this.props.id} name={this.props.id}></textarea>
                );
                break;
            case 'select':
                input = (
                    <select id={this.props.id} name={this.props.id}>
                        {this.props.children}
                    </select>
                );
                break;
            default:
                input = (
                    <input id={this.props.id} name={this.props.id} type={this.props.type} />
                );
        }
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                {input}
            </label>
        );
    }
});

var Form = React.createClass({
    render: function() {
        return (
            <form>
                <fieldset>
                    <legend>Basic Stuff</legend>

                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />
                    <InputGroup id={'password'} type={'password'} title={'Password'} />
                    <InputGroup id={'color'} type={'select'} title={'Favorite Color'} >
                        <option val='red'>Red</option>
                        <option val='blue'>Blue</option>
                        <option val='green'>Green</option>
                    </InputGroup>
                    <InputGroup id={'description'} type={'textarea'} title={'Additional Info'} />

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
</figure>

Output.

<figure class='code'>
    <div id='myForm3' class='form-example drop-shadow'></div>
</figure>
