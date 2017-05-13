import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Notes from '../components/Notes'
import AddNote from '../components/AddNote'
import * as noteActions from '../actions/noteActions'

class App extends Component {
    render() {
        var notesList = this.props.notes;
        var actions = this.props.noteActions;
        console.log('TRY TO RENDER');
        return (
            <div>
                <h1>TODO-хи</h1>
                <Notes data={notesList} noteActions={actions}/>
                <AddNote addNote={actions} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        notes: state.notes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        noteActions: bindActionCreators(noteActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
