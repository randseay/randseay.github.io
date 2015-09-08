'use strict';

var React = require('react');

var Form = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Basic Infos</legend>

                    <label htmlFor='thing'>Info Plz
                        <input id='thing' name='thing' type='text' />
                    </label>

                    <input type='submit' className='button secondary small' />
                </fieldset>
            </form>
        );
    }
});

React.render(<Form />, document.getElementById('myForm'));
