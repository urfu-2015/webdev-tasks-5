export const  addNote  = note => {
    return {
        type: 'ADD_NOTE',
        note
    };
};

export const  delNote = selectedNoteId => {
    return {
        type: 'DEL_NOTE',
        selectedNoteId
    };
};

export const editNote = note => {
    return {
        type: 'EDIT_NOTE',
        note,
        selectedNoteId: note.id
    };
};

export const selectNote = selectedNoteId => {
    return {
        type: 'SELECT_NOTE',
        selectedNoteId
    };
};
