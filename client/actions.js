export const addNote = note => {
    return {
        type: 'ADD_NOTE',
        note
    }
};

export const selectNote = selectedNoteId => {
    return {
        type: 'SELECT_NOTE',
        selectedNoteId
    }
};

export const deleteNote = selectedNoteId => {
    return {
        type: 'DELETE_NOTE',
         selectedNoteId
    }
};

export const editNote = selectedNoteId => {
    return {
        type: 'EDIT_NOTE',
        selectedNoteId
    }
};
