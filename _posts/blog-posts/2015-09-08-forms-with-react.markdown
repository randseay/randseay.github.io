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

[React's form documentation](https://facebook.github.io/react/docs/forms.html) focuses on basic properties and outlines the differences between *controlled* and *uncontrolled* components within forms, but composing more advanced forms is left up to the imagination of the developer<!--more-->. What's more is that React is all about *one-way data flow down the component heirarchy*, which can be challenging to reconcile in form management. There is form creation to deal with, as well as form submission. This article will focus on form creation, an will not address handling form submissions in React. The majority of one-off contact forms could be handled as a single component &mdash;`<Form />`, for instance.

<figure class='code'>
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
<figcaption>Forgive the lack of syntax highlighting for JSX</figcaption>
</figure>

Here's the output.

<figure id='figure-1' class='code'>
    <div id='myForm1' class='form-example drop-shadow'></div>
    <figcaption>Figure 1. Styles courtesy of <a href='http://fuselage.skosh.io'>Fuselage</a></figcaption>
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
</figure>

The output is the same, but now the `<InputGroup />` component can be used repeatedly for other input groups.

<figure id='figure-2' class='code'>
    <div id='myForm2' class='form-example drop-shadow'></div>
    <figcaption>Figure 2.</figcaption>
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
        var dietaryOptions = ['None', 'Gluten-free', 'Nut-free', 'Vegan', 'Other'];
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
                        options={dietaryOptions} />

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

<figure id='figure-3' class='code'>
    <div id='myForm3' class='form-example drop-shadow'></div>
    <figcaption>Figure 3.</figcaption>
</figure>

In the context of this example, selecting "Other" from the dropdown should show a new text input in which the user could specify a dietary consideration. Subscribing to the [React line of thinking](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state), this should be managed using the `<Form />` component's **state**. The change is handled in a new method, *handleChangeDiet*, which is passed to `<Dropdown />` as a property.

<figure class='code'>
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
</figure>

Output:

<figure id='figure-4' class='code'>
    <div id='myForm4' class='form-example drop-shadow'></div>
    <figcaption>Figure 4.</figcaption>
</figure>

Another feasible expecation for this example form is a way to share it with multiple people, in this case it will be as few as one or as many as five. A repeatable section can be used to to meet this need, but handling this in React seems to require some interpretation regarding state. <!-- FINISH -->

<figure class='code'>
{% highlight js %}
var React = require('react');

// Repeatable component
var Repeatable = React.createClass({
    getInitialState: function() {
        return {
            repeatedItems: [new Array().concat(this.props.children)]
        };
    },
    handleClick: function(cmd) {
        var newItems = this.state.repeatedItems;

        if (cmd == 'inc' && newItems.length < this.props.maxRepeat) {
            newItems.push(new Array().concat(this.props.children));
        } else if (cmd == 'dec' && newItems.length > this.props.minRepeat) {
            newItems.splice(-1,1);
        }

        this.setState({
            repeatedItems: newItems
        });
    },
    render: function() {
        var titleRepeat = this.props.titleRepeat;
        var repeatedItems = this.state.repeatedItems;
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
                    <legend>Basic Stuff</legend>

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
</figure>

<figure id='figure-5' class='code'>
    <div id='myForm5' class='form-example drop-shadow'></div>
    <figcaption>Figure 5.</figcaption>
</figure>
