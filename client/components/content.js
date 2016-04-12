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
                <Notes notes={notes} swipedNoteId={swipedNoteId} store={this.props.store} />
                <AddButton store={this.props.store} />
            </div>
        );
    }
});

export default content
