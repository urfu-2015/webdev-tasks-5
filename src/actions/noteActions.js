import * as actions from '../constants/Note'

export function addNote(text) {
    return {
        type: actions.ADD_NOTE,
        content: text
    }
}

export function deleteNote(id) {
    return {
        type: actions.DELETE_NOTE,
        id: id
    }
}

export function saveNote(content, id) {
    return {
        type: actions.DELETE_NOTE,
        text: content,
        id: id
    }
}
