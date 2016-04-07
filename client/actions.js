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

export const selectAddButton = () => {
    return {
        type: 'SELECT_ADD_BUTTON'
    };
};

export const selectUnDeleteNote = note => {
    return {
        type: 'SELECT_UN_DELETE_NOTE',
        note: note
    };
};


export const changeNote = (oldValue, newValue) => {
    return {
        type: 'CHANGE_NOTE',
        oldValue: oldValue,
        newValue: newValue
    };
};

export const deleteNote = note => {
    return {
        type: 'DELETE_NOTE',
        note: note
    };
};
