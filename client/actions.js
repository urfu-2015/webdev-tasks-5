export const getNotes = (notes) => {
    return {
        type: 'GET_NOTES',
        notes
    };

};

export const addNote = note => {
    return {
        type: 'ADD_NOTE',
        note
    };
};

export const deleteNote = note => {
    return {
        type: 'DELETE_NOTE',
        note
    };
};

export const callSaveForm = (note, saveForm) => {
    return {
        type: 'CALL_SAVE_FORM',
        note,
        saveForm
    }
};

export const changeNote = (note, newText) => {
    return {
        type: 'CHANGE_NOTE',
        note,
        newText
    };
};

export const changeOrder = (changeChain) => {
    return {
        type: 'CHANGE_ORDER',
        changeChain
    }
};
