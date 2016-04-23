const initialState = {
    notes: []
};

exports.noteApp = (state, action) => {
    state = state || initialState;
    var newNotes;

    switch (action.type) {
        case 'GET_NOTES':
            return {
                notes: action.notes
            };

        case 'ADD_NOTE':
            return {
                notes: state.notes.concat([action.note])
            };

        case 'DELETE_NOTE':
            newNotes = state.notes.slice();
            newNotes.splice(state.notes.indexOf(action.note), 1);

            return {
                notes: newNotes
            };

        case 'CALL_SAVE_FORM':
            var newState = Object.assign({}, state);
            newState.selectedNote = action.note;

            return newState;

        case 'RESET_SAVE_FORM':
            return {
                notes: state.notes.slice()
            };

        case 'CHANGE_NOTE':
            newNotes = state.notes.slice();
            newNotes[state.notes.indexOf(action.note)] = action.newText;

            return {
                notes: newNotes,
                saveForm: true
            };

        case 'CHANGE_ORDER':
            newNotes = state.notes.slice();
            var targetName = action.changeChain[0];
            var targetOrder = newNotes.indexOf(targetName);
            var nextOrder;
            action.changeChain.slice(1).forEach(name => {
                nextOrder = newNotes.indexOf(name);
                newNotes[targetOrder] = name;
                targetOrder = nextOrder;
            });
            newNotes[targetOrder] = targetName;

            return {
                notes: newNotes
            };

        default:
            return state;
    }
};
