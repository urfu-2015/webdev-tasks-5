"use strict";
const initialState = {
    notes: [],
    selectedNoteId: null
};

exports.tasksApp = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case 'ADD_NOTE':
            return {
                notes: state.notes.concat([action.note]),
                selectedNoteId: state.selectedNoteId
            };
        case 'SELECT_NOTE':
            return {
                notes: state.notes,
                selectedNoteId: action.selectedNoteId
            };
        case 'DELETE_NOTE':
            return {

            };
        case 'EDIT_NOTE':
            return {

            };

        default:
            return state;
    }

};
