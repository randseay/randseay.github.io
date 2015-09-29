---
author: Rand Seay
categories: Blog
comments: true
css: /css/examples/forms-with-react.css
date: 2015-09-17 14:05:59
deck: "It can be tricky to handle elaborate form features such as repeatable sections and context-sensitive hiding or showing. Here is one approach using React."
imgclass: react
js: /js/examples/forms-with-react.js
layout: post
permalink: /articles/forms-with-react
published: true
sitemap:
    lastmod: 2015-09-22 09:00:00
    priority: 1.0
tags: [Code, React]
title: "Not-so-simple Forms with React"
---

[React's form documentation](https://facebook.github.io/react/docs/forms.html) focuses on basic properties and outlines the differences between *controlled* and *uncontrolled* components within forms, but composing more advanced forms is left up to the imagination of the developer<!--more-->. What's more is that React is all about *one-way data flow down the component heirarchy*, which can be challenging to reconcile in form management. There is form creation to deal with, as well as form submission. This article will focus on form creation, an will not address handling form submissions in React. The majority of one-off contact forms could be handled as a single component &mdash;`<Form />`, for instance.

<a href='http://codepen.io/randseay/pen/ZbWyPJ' class='button small secondary'><i class='fa fa-codepen'></i> View Entire Project on CodePen</a>

<figure id='figure-1a' class='code'>
{% highlight js %}
var React = require('react');

// Form component
var Form = React.createClass({
    render: function() {
        return (
            <form>
                <fieldset>
                    <legend>RSVP</legend>

                    <label htmlFor='name'>Name
                        <input id='name' name='name' type='text' />
                    </label>

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
<figcaption>Figure 1a. Forgive the lack of syntax highlighting for JSX</figcaption>
</figure>

Here's the output.

<figure id='figure-1b' class='code'>
    <div id='myForm1' class='form-example drop-shadow'></div>
    <figcaption>Figure 1b. Styles courtesy of <a href='http://fuselage.skosh.io'>Fuselage</a></figcaption>
</figure>

## Reusing Components

But moving into the realm of a form framework is not so simple. It quickly becomes necessary to abstract away elements of the form into other React components. A natural way to break up a web form is into **input groups** &mdash;that is, a label and an element that takes input. This covers the majority of use cases that forms must handle, as evidenced by personal experience and the forms that can be built for [Foundation](http://foundation.zurb.com/docs/components/forms.html) or [Bootstrap](http://getbootstrap.com/components/#input-groups). Here is what a component `<InputGroup />` could look like.

<figure id='figure-2a' class='code'>
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

                    <InputGroup id={'name'} type={'text'} title={'Name'} />
                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
<figcaption>Figure 2a.</figcaption>
</figure>

Notice the properties are passed in as simple values. This could be made simpler and more robust through the use of [spread attributes](https://facebook.github.io/react/docs/jsx-spread.html) and [prop validation](https://facebook.github.io/react/docs/reusable-components.html#prop-validation), but refining these examples into a framework is beyond the scope of this article.

The output is the same as <a href='#figure-1b'><em>Figure 1b</em></a>, but now the `<InputGroup />` component can be used repeatedly for other input groups.

<figure id='figure-2b' class='code'>
    <div id='myForm2' class='form-example drop-shadow'></div>
    <figcaption>Figure 2b.</figcaption>
</figure>

### Dropdown Component

Creating the `<InputGroup />` component is a great first step, but it cannot yet handle textareas, selects, inline checkboxes, or inline radio buttons. It could be modified to handle these elements, or new React components could be used. The following example shows the functionality of a `<select>` element offloaded to a new component, called `<Dropdown />`, which accepts an array of options that render as the `<select>`'s options.

<figure id='figure-3a' class='code'>
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
        return (
            <form>
                <fieldset>
                    <legend>RSVP</legend>

                    <InputGroup id={'name'} type={'text'} title={'Name'} />
                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />

                    <Dropdown 
                        id={'diet'} 
                        type={'select'} 
                        title={'Dietary Needs'} 
                        options={DIETARY_OPTIONS} />

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

var DIETARY_OPTIONS = ['None', 'Gluten-free', 'Nut-free', 'Vegan', 'Other'];

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
<figcaption>Figure 3a.</figcaption>
</figure>

The output is below. Like many other snippets in this article, the `<Dropdown />` component could be made more powerful with a few enhancements. Options, for instance could be contained in `<optgroup>`s, and carry information about other attributes, such as `selected` or `disabled`. The component would need to be adjusted to accommodate these.

<figure id='figure-3b' class='code'>
    <div id='myForm3' class='form-example drop-shadow'></div>
    <figcaption>Figure 3b.</figcaption>
</figure>

## Hiding and Showing

In the context of this example, selecting "Other" from the dropdown should reveal a new text input in which the user could specify a dietary consideration. Subscribing to the [React line of thinking](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state), this should be managed using the `<Form />` component's **state**. The change will be handled in a new method, *handleChangeDiet*, which is passed to `<Dropdown />` as a property. Notice how the dropdown's options are passed in as an array, and looped through in the `render` method. This can be enforced using [prop validation](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) and helps to separate concerns amongst components.

<figure id='figure-4a' class='code'>
{% highlight js %}
var React = require('react');

// Dropdown component
var Dropdown = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
                {/* Set 'onChange' to the passed-in change handler */}
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
            otherDiet: false
        };
    },
    handleChangeDiet: function(event) {
        this.setState({
            otherDiet: event.target.value == 'Other'
        });
    },
    render: function() {
        return (
            <form>
                <fieldset>
                    <legend>RSVP</legend>

                    <InputGroup id={'name'} type={'text'} title={'Name'} />
                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />

                    <Dropdown 
                        id={'diet'} 
                        type={'select'} 
                        title={'Dietary Considerations'} 
                        options={DIETARY_OPTIONS} 
                        handleChange={this.handleChangeDiet} /> {/* Set up the change handler */}

                    {this.state.otherDiet
                        ? <InputGroup id={'otherDiet'} type={'text'} title={'Please Specify'} />
                        : null
                    }

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

var DIETARY_OPTIONS = ['None', 'Gluten-free', 'Nut-free', 'Vegan', 'Other'];

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
<figcaption>Figure 4a.</figcaption>
</figure>

Output.

<figure id='figure-4b' class='code'>
    <div id='myForm4' class='form-example drop-shadow'></div>
    <figcaption>Figure 4b.</figcaption>
</figure>

## Repeatable Sections

Another feasible expectation for this example form is a way to share it with multiple people, in this case it will be as few as one or as many as five. A repeatable section can be used to to meet this need, so it seems worthwhile to explore creating a new component &mdash;`<Repeatable />`. But handling this in React seems to require some interpretation regarding how [state should be used in React](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-should-go-in-state). It is clear that **state** should include data used in triggering a UI update, but it should *not* include React components or duplicated data from the props.

###  State Concerns <small>( <a href='https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-should-go-in-state'><i class='fa fa-bookmark-o'></i> React docs</a> )</small>

>State should contain data that a component's event handlers may change to trigger a UI update.

>Try to use props as the source of truth where possible. One valid use to store props in state is to be able to know its previous values, because props can change over time.

While reasoning about implementing a repeatable component, it becomes clear that keeping track of the UI that needs to be rendered would involve storing an array of the children elements. In this scenario that is any `<InputGroup />` components (or other elements) that are passed to `<Repeatable />`. Adding elements to or removing elements from this array should trigger a UI update, making it stateful. This line of thinking works against the notion that **state** should not include other components or duplicated data from props. It isn't cut and dry, but this is one way to implement a `<Repeatable />` component.

<figure id='figure-5a' class='code'>
{% highlight js %}
var React = require('react');

// Repeatable component
var Repeatable = React.createClass({
    getInitialState: function() {
        // The initial state is a copy of the passed-in children elements
        return {
            repeatedItems: [new Array().concat(this.props.children)]
        };
    },
    handleClick: function(cmd) {
        var newItems = this.state.repeatedItems;
        
        // The list is added to or removed from based on the user controls
        if (cmd == 'inc' && newItems.length < this.props.maxRepeat) {
            newItems.push(new Array().concat(this.props.children));
        } else if (cmd == 'dec' && newItems.length > this.props.minRepeat) {
            newItems.splice(-1,1);
        }

        // The list is updated and the UI re-rendered
        this.setState({
            repeatedItems: newItems
        });
    },
    render: function() {
        var titleRepeat = this.props.titleRepeat;
        // Since the children are an array of elements, loop through twice
        // This is brittle in handling children with nested elements
        return (
            <div>
                {this.state.repeatedItems.map(function(itemGroup, i) {
                    return (
                        <fieldset key={i + 1}>
                            <legend>{titleRepeat}</legend>

                            {itemGroup.map(function(item) {
                                return React.cloneElement(item, {id: item.props.id + '-' + (i + 1)});
                            })}
                        </fieldset>
                    );
                })}

                {/* User controls */}
                <a onClick={this.handleClick.bind(this, 'dec')}>Remove</a>
                <a onClick={this.handleClick.bind(this, 'inc')}>Add</a>
            </div>
        );
    }
});

// Dropdown component
var Dropdown = React.createClass({
    render: function() {
        return (
            <label htmlFor={this.props.id}>{this.props.title}
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
            otherDiet: false
        };
    },
    handleChangeDiet: function(event) {
        this.setState({
            otherDiet: event.target.value == 'Other'
        });
    },
    render: function() {
        return (
            <form>
                <fieldset>
                    <legend>RSVP</legend>

                    <InputGroup id={'name'} type={'text'} title={'Name'} />
                    <InputGroup id={'email'} type={'email'} title={'Email Address'} />

                    <Dropdown
                        id={'diet'}
                        type={'select'}
                        title={'Dietary Considerations'}
                        options={DIETARY_OPTIONS}
                        handleChange={this.handleChangeDiet} />

                    {this.state.otherDiet
                        ? <InputGroup id={'otherDiet'} type={'text'} title={'Please Specify'} />
                        : null
                    }

                    {/* Pass in minimum, maximum, and title for each repeating unit */}
                    <Repeatable minRepeat={1} maxRepeat={5} titleRepeat='Invitee'>
                            <InputGroup 
                                id={'inviteeName'} 
                                type='text' 
                                title='Invite Name' 
                                key={'inviteeName'} />

                            <InputGroup 
                                id={'inviteeEmail'} 
                                type='email' 
                                title='Invitee Email' 
                                key={'inviteeEmail'} />
                    </Repeatable>

                    <input type='submit' />
                </fieldset>
            </form>
        );
    }
});

var DIETARY_OPTIONS = ['None', 'Gluten-free', 'Nut-free', 'Vegan', 'Other'];

React.render(<Form />, document.getElementById('myForm'));
{% endhighlight %}
<figcaption>Figure 5a.</figcaption>
</figure>

Output. <small>(<a href='http://codepen.io/randseay/pen/ZbWyPJ'><i class='fa fa-codepen'></i> View Final on CodePen</a>)</small>

<figure id='figure-5b' class='code'>
    <div id='myForm5' class='form-example drop-shadow'></div>
    <figcaption>Figure 5b.</figcaption>
</figure>

The `<Repeatable />` component could do with quite a few optimizations to make it less brittle, some of which may involve substantial refactoring. All of the components intended to be reused would benefit from enforcing the properties.

## Closing Thoughts

React is a powerful tool for building interfaces, but make sure you are using the right tool for the job. Functional and aesthetic consistency within a large number of forms may warrant a framework like what has begun to form here, but a vast number of forms can be handled on a case by case basis. React is enjoyable to play with, but can become unruly very easily. There are many ways to solve a problem, and the examples presented are one potential way.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Building some tricky forms with React? Here&#39;s some help with it: <a href="http://t.co/nDRrlGfsDr">http://t.co/nDRrlGfsDr</a></p>&mdash; Rand Seay (@randseay) <a href="https://twitter.com/randseay/status/647163902434787328">September 24, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
