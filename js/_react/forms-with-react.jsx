'use strict';

var React = require('react');

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

                <a onClick={this.handleClick.bind(this, 'dec')} className='button tiny repeat-control'>Remove</a>
                <a onClick={this.handleClick.bind(this, 'inc')} className='button tiny repeat-control'>Add</a>
            </div>
        );
    }
});

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
            otherDiet: false
        };
    },
    handleChangeDiet: function(event) {
        this.setState({
            otherDiet: event.target.value == 'Other'
        });
    },
    handleSubmit: function(event) {
        event.preventDefault();
    },
    render: function() {
        var inputs;
        switch (this.props.example) {
            case 1:
                inputs = (
                    <div>
                        <label htmlFor='name'>Name
                            <input id='name' name='name' type='text' />
                        </label>

                        <label htmlFor='email'>Email Address
                            <input id='email' name='email' type='email' />
                        </label>
                    </div>
                );
                break;
            case 2:
                inputs = (
                    <div>
                        <InputGroup id={'name2'} type={'text'} title={'Name'} />
                        <InputGroup id={'email2'} type={'email'} title={'Email Address'} />
                    </div>
                );
                break;
            case 3:
                inputs = (
                    <div>
                        <InputGroup id={'name3'} type={'text'} title={'Name'} />
                        <InputGroup id={'email3'} type={'email'} title={'Email Address'} />
                        <Dropdown id={'diet3'} type={'select'} title={'Dietary Needs'} options={DIETARY_OPTIONS} />
                    </div>
                );
                break;
            case 4:
                inputs = (
                    <div>
                        <InputGroup id={'name4'} type={'text'} title={'Name'} />
                        <InputGroup id={'email4'} type={'email'} title={'Email Address'} />

                        <Dropdown
                            id={'diet4'}
                            type={'select'}
                            title={'Dietary Considerations'}
                            options={DIETARY_OPTIONS}
                            handleChange={this.handleChangeDiet} />

                        {this.state.otherDiet
                            ? <InputGroup id={'otherDiet4'} type={'text'} title={'Please Specify'} />
                            : null
                        }
                    </div>
                );
                break;
            case 5:
                inputs= (
                    <div>
                        <InputGroup id={'name5'} type={'text'} title={'Name'} />
                        <InputGroup id={'email5'} type={'email'} title={'Email Address'} />

                        <Dropdown
                            id={'diet5'}
                            type={'select'}
                            title={'Dietary Considerations'}
                            options={DIETARY_OPTIONS}
                            handleChange={this.handleChangeDiet} />

                        {this.state.otherDiet
                            ? <InputGroup id={'otherDiet5'} type={'text'} title={'Please Specify'} />
                            : null
                        }

                        <Repeatable minRepeat={1} maxRepeat={5} titleRepeat='Invitee'>
                            <InputGroup
                                id={'inviteeName5'}
                                type='text'
                                title='Invite Name'
                                key={'inviteeName5'} />

                            <InputGroup
                                id={'inviteeEmail5'}
                                type='email'
                                title='Invitee Email'
                                key={'inviteeEmail5'} />
                        </Repeatable>
                    </div>
                );
                break;
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>RSVP</legend>

                    {inputs}

                    <input type='submit' className='button secondary small' />
                </fieldset>
            </form>
        );
    }
});

var DIETARY_OPTIONS = ['None', 'Gluten-free', 'Nut-free', 'Vegan', 'Other'];

React.render(<Form example={1} />, document.getElementById('myForm1'));
React.render(<Form example={2} />, document.getElementById('myForm2'));
React.render(<Form example={3} />, document.getElementById('myForm3'));
React.render(<Form example={4} />, document.getElementById('myForm4'));
React.render(<Form example={5} />, document.getElementById('myForm5'));
