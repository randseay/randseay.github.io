'use strict';

var React = require('react');

var InputGroup = React.createClass({
    render: function() {
        var input;
        switch (this.props.type) {
            case 'textarea':
                input = (
                    <textarea id={this.props.id} name={this.props.id} rows='5'></textarea>
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
    handleSubmit: function(event) {
        event.preventDefault();
    },
    render: function() {
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
                        <InputGroup id={'color3'} type={'select'} title={'Favorite Color'} >
                            <option val='red'>Red</option>
                            <option val='blue'>Blue</option>
                            <option val='green'>Green</option>
                        </InputGroup>
                        <InputGroup id={'description3'} type={'textarea'} title={'Additional Info'} />
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
