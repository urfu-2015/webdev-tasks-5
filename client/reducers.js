const initialState = {
    notes: [],
    selectedNoteName: null,
    deletableNoteName: null
};

exports.todoApp = (state, action) => {
    state = state || initialState;
    let notesCopy;
    let json;
    let idx;

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
        case 'SELECT_UN_DELETE_NOTE':
            return {
                notes: state.notes,
                selectedNoteName: state.selectedNoteName,
                deletableNoteName: null
            };
        case 'CHANGE_NOTE':
            json = JSON.stringify({
                oldText: action.oldValue,
                newText: action.newValue
            });

            fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                body: json
            })
                .then(response => {
                    console.log(response.status);
                });

            notesCopy = state.notes.slice();
            idx = notesCopy.indexOf(action.oldValue);
            notesCopy[idx] = action.newValue;
            return {
                notes: notesCopy,
                selectedNoteName: null,
                deletableNoteName: null
            };
        case 'DELETE_NOTE':
            json = JSON.stringify({
                text: action.note
            });

            fetch('/api/notes', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                body: json
            })
                .then(response => {
                    console.log(response.status);
                });

            notesCopy = state.notes.slice();
            idx = notesCopy.indexOf(action.note);
            notesCopy.splice(idx, 1);
            return {
                notes: notesCopy,
                selectedNoteName: null,
                deletableNoteName: null
            };
        default:
            return state;
    }
};
