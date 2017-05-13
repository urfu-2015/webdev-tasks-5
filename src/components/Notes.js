import React, { Component, PropTypes } from 'react'
import Note from './Note.js'

export default class Notes extends Component {
    render() {
        var deleteNote = this.props.noteActions.deleteNote;
        var saveNote = this.props.noteActions.saveNote;
        var notesTemplate = this.props.data.map(function(note, i) {
            return <Note note={note} key={i} id={i} deleteNote={deleteNote} saveNote={saveNote}/>
        })
        return (
            <div className="notes">
                {notesTemplate}
            </div>
        )
    }
}
