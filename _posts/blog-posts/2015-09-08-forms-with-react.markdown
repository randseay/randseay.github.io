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
deck: "It can be tricky to handle elaborate form features such as repeatable sections and context-sensitive hiding or showing. Here is one approach using React."
---

[React's form documentation](https://facebook.github.io/react/docs/forms.html) focuses on basic properties and outlines the differences between *controlled* and *uncontrolled* components within forms, but composing more advanced forms is left up to the imagination of the developer<!--more-->. The majority of one-off contact forms could be handled as a single component &mdash;`<Form />`, for instance.

<figure class='code'>
{% highlight js %}
var React = require('react');

// Form component
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

But moving into the realm of a form framework is not so simple. It quickly becomes necessary to abstract away elements of the form into other React components. A natural way to break up a web form is into **input groups** &mdash;that is, a label and an element that takes input. This covers the majority of use cases that forms must handle, as evidenced by personal experience and the forms that can be built for [Foundation](http://foundation.zurb.com/docs/components/forms.html) or [Bootstrap](http://getbootstrap.com/components/#input-groups). Here is what a component `<InputGroup />` could look like.

<figure class='code'>
{% highlight js %}
var React = require('react');

// InputGroup component
var InputGroup = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                <input id={this.props.id} name={this.props.id} type={this.props.type} />
            </label>
        );
    }
});

// Form component
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

Creating the `<InputGroup />` component is a great first step, but it cannot yet handle textareas, selects, inline checkboxes, or inline radio buttons. It could be modified to handle these elements, or new React components could be used. The following example shows the functionality of a `<select>` element offloaded to a new component, called `<Dropdown />`, which accepts an array of options that render as the `<select>`'s options.

<figure class='code'>
{% highlight js %}
var React = require('react');

// Dropdown component
var Dropdown = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                <select id={this.props.id} name={this.props.id}>
                    {this.props.options.map(function(option, i) {
                        return <option val={option} key={i}>{option}</option>
                    })}
                </select>
            </label>
        );
    }
});

// InputGroup component
var InputGroup = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                <input id={this.props.id} name={this.props.id} type={this.props.type} />
            </label>
        );
    }
});

// Form component
var Form = React.createClass({
    render: function() {
        var colorOptions = ['Red', 'Blue', 'Green', 'Other'];
        return (
            <form>
                <fieldset>
                    <legend>Basic Stuff</legend>

                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />
                    <InputGroup id={'password'} type={'password'} title={'Password'} />

                    <Dropdown 
                        id={'color'} 
                        type={'select'} 
                        title={'Favorite Color'} 
                        options={colorOptions} />

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

In the context of this example, selecting "Other" from the dropdown should show a new text input in which the user could specify another color. Subscribing to the [React line of thinking](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state), this should be managed using the `<Form />` component's **state**. The change is handled in a new method, *handleChangeColor*, which is passed to `<Dropdown />` as a property.

<figure class='code'>
{% highlight js %}
var React = require('react');

// Dropdown component
var Dropdown = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                // Set 'onChange' to the passed-in change handler
                <select id={this.props.id} name={this.props.id} onChange={this.props.handleChange}>
                    {this.props.options.map(function(option, i) {
                        return <option val={option} key={i}>{option}</option>
                    })}
                </select>
            </label>
        );
    }
});

// InputGroup component
var InputGroup = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                <input id={this.props.id} name={this.props.id} type={this.props.type} />
            </label>
        );
    }
});

// Form component
var Form = React.createClass({
    getInitialState: function() {
        return {
            otherColor: false
        };
    },
    handleChangeColor: function(event) {
        this.setState({
            otherColor: event.target.value == 'Other'
        });
    },
    render: function() {
        var colorOptions = ['Red', 'Blue', 'Green', 'Other'];
        return (
            <form>
                <fieldset>
                    <legend>Basic Stuff</legend>

                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />
                    <InputGroup id={'password'} type={'password'} title={'Password'} />

                    <Dropdown 
                        id={'color'} 
                        type={'select'} 
                        title={'Favorite Color'} 
                        options={colorOptions} 
                        handleChange={this.handleChangeColor} /> // Set up the change handler

                    {this.state.otherColor
                        ? <InputGroup id={'otherColor4'} type={'text'} title={'Which Color?'} />
                        : null
                    }

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
</figure>

Output:

<figure class='code'>
    <div id='myForm4' class='form-example drop-shadow'></div>
</figure>
