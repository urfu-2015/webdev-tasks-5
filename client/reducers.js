const initialState = {
    notes: [],
    selectedNoteName: null,
    deletableNoteName: null,
    addButtonClicked: false
};

exports.todoApp = (state, action) => {
    state = state || initialState;
    let notesCopy;
    let idx;

    switch (action.type) {
        case 'ADD_NOTE':
            if ((!action.note) || (state.notes.indexOf(action.note) >= 0)) {
                return {
                    notes: state.notes,
                    selectedNoteName: null,
                    deletableNoteName: null,
                    addButtonClicked: false
                };
            }
            notesCopy = state.notes.slice();
            notesCopy.unshift(action.note);
            return {
                notes: notesCopy,
                selectedNoteName: state.selectedNoteName,
                deletableNoteName: state.deletableNoteName,
                addButtonClicked: false
            };
        case 'SELECT_CHANGE_NOTE':
            return {
                notes: state.notes,
                selectedNoteName: action.note,
                deletableNoteName: state.deletableNoteName,
                addButtonClicked: state.addButtonClicked
            };
        case 'SELECT_ADD_BUTTON':
            return {
                notes: state.notes,
                selectedNoteName: state.selectedNoteName,
                deletableNoteName: action.note,
                addButtonClicked: true
            };
        case 'SELECT_DELETE_NOTE':
            return {
                notes: state.notes,
                selectedNoteName: state.selectedNoteName,
                deletableNoteName: action.note,
                addButtonClicked: state.addButtonClicked
            };
        case 'SELECT_UN_DELETE_NOTE':
            return {
                notes: state.notes,
                selectedNoteName: state.selectedNoteName,
                deletableNoteName: null,
                addButtonClicked: state.addButtonClicked
            };
        case 'CHANGE_NOTE':
            if (!action.newValue) {
                return {
                    notes: state.notes,
                    selectedNoteName: null,
                    deletableNoteName: null,
                    addButtonClicked: state.addButtonClicked
                };
            }
            notesCopy = state.notes.slice();
            idx = notesCopy.indexOf(action.oldValue);
            notesCopy[idx] = action.newValue;
            return {
                notes: notesCopy,
                selectedNoteName: null,
                deletableNoteName: null,
                addButtonClicked: state.addButtonClicked
            };
        case 'DELETE_NOTE':
            notesCopy = state.notes.slice();
            idx = notesCopy.indexOf(action.note);
            notesCopy.splice(idx, 1);
            return {
                notes: notesCopy,
                selectedNoteName: null,
                deletableNoteName: null,
                addButtonClicked: state.addButtonClicked
            };
        default:
            return state;
    }
};
