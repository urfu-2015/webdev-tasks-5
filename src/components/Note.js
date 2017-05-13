import React, { Component, PropTypes } from 'react'

export default class Note extends Component {
    saveBtnClick(event) {
        var area = event.target.parentNode.children[2];
        this.props.saveNote(this.props.id, area.value);
    }
    deleteBtnClick(event) {
        this.props.deleteNote(this.props.id);
    }
    render() {
        var text = this.props.note.text;
        var id = this.props.id;
        return (
            <div className={"notes__note " + id}>
                <textarea value={text}></textarea>
                <button name='deleteNote' onClick={::this.deleteBtnClick}>Удалить</button>
                <input name='saveNote' onClick={::this.saveBtnClick} type='button' value='Сохранить' />
            </div>
        )
    }
}
