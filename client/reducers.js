exports.reducers = (state, action) => {
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
