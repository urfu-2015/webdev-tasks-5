const initialState = {
    tasks: []
};

exports.taskApp = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'ADD_TASK':
            return {
                tasks: state.tasks.concat([action.task])
            };
        case 'EDIT_TASK':
            return {
                tasks: state.tasks.filter(task => {
                    if (task.id === action.selectedID) {
                        task.text = action.text;
                    }
                    return true;
                })
            };
        case 'REMOVE_TASK':
            return {
                tasks: state.tasks.filter(task => {
                    return task.id != action.selectedID;
                })
            };
        default:
            return state;
    }
};
