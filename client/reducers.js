'use strict';

const initialState = {
    listTodo: []
};

exports.todoApp = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'GET_LIST':
            return {
                listTodo: action.list.map(function (item) {
                    return {
                        text: item,
                        edit: false,
                        delete: false
                    }
                })
            };
        case 'ADD_TODO':
            var newList = state.listTodo.slice();
            newList.unshift({
                text: action.text,
                edit: false,
                delete: false
            });
            return {
                listTodo: newList
            };
        case 'DELETE_TODO':
            var newList = state.listTodo.slice();
            newList.splice(action.id, 1);
            return {
                listTodo: newList
            };
        case 'CHANGE_TODO':
            var newList = state.listTodo.slice();
            newList[action.id].text = action.text;
            newList[action.id].edit = false;
            return {
                listTodo: newList
            };
        case 'SHOW_FORM':
            var newList = state.listTodo.slice();
            newList[action.id].edit = true;
            newList[action.id].delete = false;
            return {
                listTodo: newList
            };
        case 'SHOW_DELETE':
            var newList = state.listTodo.slice();
            newList[action.id].delete = true;
            return {
                listTodo: newList
            };
        case 'HIDE_DELETE':
            var newList = state.listTodo.slice();
            newList[action.id].delete = false;
            return {
                listTodo: newList
            };
        default:
            return state;
    }
};
