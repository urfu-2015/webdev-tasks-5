const initialState = {
    notes: [],
    selectedNoteId: null,
    swipedNoteId: null
}

exports.todoApp = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return {
                notes: state.notes.concat([action.note]),
                selectedNoteId: state.selectedNoteId,
                swipedNoteId: state.swipedNoteId
            };
            case 'DEL_NOTE':
            return {
                notes: state.notes.filter(note => {
                    return note.id !== action.id.id;
                }),
                selectedNoteId: state.selectedNoteId,
                swipedNoteId: state.swipedNoteId
            };
        case 'EDIT_NOTE':
             return {
                notes: state.notes.map(note => {
                    if (note.id === action.selectedNoteId) {
                        return action.note
                    }
                    return note;
                }),
                 selectedNoteId: action.selectedNoteId,
                 swipedNoteId: state.swipedNoteId

             };
        case 'SWIPE_LEFT':
            return {
                notes: state.notes,
                selectedNoteId: state.selectedNoteId,
                swipedNoteId: action.id
            };
        case 'SWIPE_RIGHT':
            return {
                notes: state.notes,
                selectedNoteId: state.selectedNoteId,
                swipedNoteId: null
            };
        case 'UPDATE_NOTES':
            return {
                notes: action.notes,
                selectedNoteId: state.selectedNoteId,
                swipedNoteId: state.swipedNoteId
            };
        default:
            return state;
    }
};
