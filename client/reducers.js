const initialState = {
    notes: [],
    selectedNoteName: null,
    deletableNoteName: null
};

exports.todoApp = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'ADD_NOTE':
            return {
                notes: state.notes.concat([action.note]),
                selectedNoteName: state.selectedNoteName,
                deletableNoteName: state.deletableNoteName
            };
        case 'SELECT_CHANGE_NOTE':
            return {
                notes: state.notes,
                selectedNoteName: action.note,
                deletableNoteName: state.deletableNoteName
            };
        case 'SELECT_DELETE_NOTE':
            return {
                notes: state.notes,
                selectedNoteName: state.selectedNoteName,
                deletableNoteName: action.note
            };
        case 'CHANGE_NOTE':
            let notesCopy = state.notes.slice();
            notesCopy[action.index] = action.newValue;
            return {
                notes: notesCopy,
                selectedNoteName: null,
                deletableNoteName: null
            };
        case 'DELETE_NOTE':
            let idx = state.notes.indexOf(action.note);
            return {
                notes: state.notes.splice(idx, 1),
                selectedNoteName: null,
                deletableNoteName: null
            };
        default:
            return state;
    }
};
