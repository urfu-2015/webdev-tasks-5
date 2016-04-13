import React from 'react';
import Header from './header';
import AddButton from './addButton';
import Notes from './notes';
import {addNote} from '../actions';

const content  = React.createClass({
    componentWillMount: function () {
        fetch('/todos')
            .then(response => response.json())
            .then(data => {
                data.notes.forEach(note => {
                    this.props.store.dispatch(addNote(note));
                });
            });
    },

    render: function () {
        const {notes, selectedNoteId, swipedNoteId} = this.props.store.getState();

        return (
            <div>
                <Header />
                <Notes notes={notes} swipedNoteId={swipedNoteId} dispatch={this.props.store.dispatch} />
                <AddButton dispatch={this.props.store.dispatch} />
            </div>
        );
    }
});

export default content
