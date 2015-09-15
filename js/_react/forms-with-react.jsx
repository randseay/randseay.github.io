'use strict';

var React = require('react');

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
    handleSubmit: function(event) {
        event.preventDefault();
    },
    render: function() {
        var colorOptions = ['Red', 'Blue', 'Green', 'Other'];
        var inputs;
        switch (this.props.example) {
            case 1:
                inputs = (
                    <label htmlFor='email'>Email Address
                        <input id='email' name='email' type='email' />
                    </label>
                );
                break;
            case 2:
                inputs = (
                    <div>
                        <InputGroup id={'email2'} type={'email'} title={'Email Address'} />
                        <InputGroup id={'password2'} type={'password'} title={'Password'} />
                    </div>
                );
                break;
            case 3:
                inputs = (
                    <div>
                        <InputGroup id={'email3'} type={'email'} title={'Email Address'} />
                        <InputGroup id={'password3'} type={'password'} title={'Password'} />
                        <Dropdown id={'color3'} type={'select'} title={'Favorite Color'} options={colorOptions} />
                    </div>
                );
                break;
            case 4:
                inputs = (
                    <div>
                        <InputGroup id={'email4'} type={'email'} title={'Email Address'} />
                        <InputGroup id={'password4'} type={'password'} title={'Password'} />

                        <Dropdown
                            id={'color4'}
                            type={'select'}
                            title={'Favorite Color'}
                            options={colorOptions}
                            handleChange={this.handleChangeColor} />

                        {this.state.otherColor
                            ? <InputGroup id={'otherColor4'} type={'text'} title={'Which Color?'} />
                            : null
                        }
                    </div>
                );
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Basic Stuff</legend>

                    {inputs}

                    <input type='submit' className='button secondary small' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form example={1} />, document.getElementById('myForm1'));
React.render(<Form example={2} />, document.getElementById('myForm2'));
React.render(<Form example={3} />, document.getElementById('myForm3'));
React.render(<Form example={4} />, document.getElementById('myForm4'));
