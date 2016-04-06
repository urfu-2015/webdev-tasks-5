export const addNote = note => {
    return {
        type: 'ADD_NOTE',
        note: note
    };
};

export const selectChangeNote = note => {
    return {
        type: 'SELECT_CHANGE_NOTE',
        note: note
    };
};

export const selectDeleteNote = note => {
    return {
        type: 'SELECT_DELETE_NOTE',
        note: note
    };
};

export const changeNote = (index, newValue) => {
    return {
        type: 'CHANGE_NOTE',
        index: index,
        newValue: newValue
    };
};

export const deleteNote = note => {
    return {
        type: 'DELETE_NOTE',
        note: note
    };
};
