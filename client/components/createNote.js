import React, { Component } from 'react';
import {fetchAddNote} from '../actions';

class createNote extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
;    }

    onSubmit (event) {
        event.preventDefault();
        let input = event.target.firstChild;
        if (!input.value.trim()) {
            return
        }

        this.props.dispatch(fetchAddNote(input.value));
        input.value = '';
    }

    render () {
        return (
            <form name="newNote" className={"new-note__form new-note-form " + this.props.formClassName}
                  onSubmit={this.onSubmit}>
                <input name="task" className="new-note-form__input" placeholder="Новая заметка.." />
                <button type="submit" className="new-note-form__button">Сохранить</button>
            </form>
        )
    }
}

export default createNote
