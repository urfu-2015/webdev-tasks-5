const initialState = {
    notes: [],
    selectedNoteId: null
}

exports.todoApp = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return {
                notes: state.notes.concat([action.note]),
                selectedNoteId: state.selectedNoteId
            };
        case 'DEL_NOTE':
            return {
                notes: state.notes.filter(note => {
                    return note.id !== action.selectedNoteId;
                }),
                selectedNoteId: null
            };
        case 'EDIT_NOTE':
            return {
                notes: state.notes.map(note => {
                    if (note.id === action.selectedNoteId) {
                        return action.note
                    }
                }),
                selectedNoteId: action.selectedNoteId
            };
        case 'SELECT_NOTE':
            return {
                notes: state.notes,
                selectedNoteId: action.selectedNoteId
            };
        default:
            return state;
    }
};
