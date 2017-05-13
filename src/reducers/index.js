import * as actions from '../constants/Note'

const initState = {
    notes: [
        {text: 'Learn React'},
        {text: 'Learn English'},
        {text: 'Call my Kate'}
    ]
}

export default function noteState(state = initState, action) {
    switch (action.type) {
        case actions.ADD_NOTE:
            return Object.assign({},state, {
                notes: [{ text: action.content }].concat(state.notes)
            });
            break;
        case actions.DELETE_NOTE:
            return Object.assign({},state, {
                notes: state.notes.slice(0, action.id).concat(state.notes.slice(action.id + 1))
            });
            break;
        case actions.SAVE_NOTE:
            return Object.assign({},state, {
                notes: state.notes.map((note, i) => {
                    if (i === action.id) {
                        note.text = action.content;
                        return node;
                    }

                    return node;
                })
            });
        default:
            return state;
    }
}
