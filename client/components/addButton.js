import React, { Component } from 'react';
import CreateNote from './createNote';
import {showAddForm} from '../actions';

class addButton extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({visible: false});
    }

    render() {
        let className = this.state.visible ?
        { btn: 'new-note__button_visible', form: 'new-note-form_invisible'} :
        { btn: 'new-note__button_invisible', form: 'new-note-form_visible'};
        return (
            <div className="new-note">
                <button className={'new-note__button-add ' + className.btn} onClick={this.handleClick}>Добавить</button>
                <CreateNote formClassName={className.form} store={this.props.store} />
            </div>
        );
    }
}

export default addButton
