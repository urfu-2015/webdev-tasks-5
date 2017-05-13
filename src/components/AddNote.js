import React, { Component, PropTypes } from 'react'

export default class AddNote extends Component {
    onAcceptBtnClick(event) {
        let content = event.target.previousSibling.value;
        console.log(content);
        this.props.addNote.addNote(content);
    }
    render() {
        return (
            <div>
                <input type='button' name='addNote' value='Добавить' />
                <textarea></textarea>
                <button onClick={::this.onAcceptBtnClick} name='accept'>Ок</button>
            </div>
        )
    }
}
