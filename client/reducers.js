exports.reducers = (state, action) => {
    if ((action.type === 'DELETE' && typeof action.id !== 'number') ||
    action.type === 'RENAME' &&
    (typeof action.id !== 'number' || typeof action.text === 'undefined')) {
        return state;
    }
    switch (action.type) {
        case 'ADD':
            return Array.prototype.concat.call(action.task, state);
        case 'DELETE':
            return state.filter((item) => {
                return item.id !== action.id;
            });
        case 'RENAME':
            const newState = state.slice();

            for (let i = 0; i < newState.length; i++) {
                if (newState[i].id === action.id) {
                    newState[i].text = action.text;
                    break;
                }
            }
            return newState;
        case 'REFRESH': return action.tasks;
        default: return state;
    }
};
