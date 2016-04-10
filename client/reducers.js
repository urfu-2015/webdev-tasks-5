'use strict';

const initialState = {
    listTodo: []
};

exports.todoApp = (state, action) => {
    state = state || initialState;

    var getIndexById = function (id) {
        var listTodo = state.listTodo;
        for (var i = 0; i < listTodo.length; ++i) {
            if (listTodo[i].id === id) {
                return i;
            }
        }
    };

    switch (action.type) {
        case 'GET_LIST':
            return {
                listTodo: action.list.map(function (item) {
                    return {
                        id: item.id,
                        text: item.text,
                        edit: false,
                        delete: false
                    };
                })
            };
        case 'ADD_TODO':
            var newList = state.listTodo.slice();
            newList.unshift({
                id: action.id,
                text: action.text,
                edit: false,
                delete: false
            });
            return {
                listTodo: newList
            };
        case 'DELETE_TODO':
            var newList = state.listTodo.slice();
            var index = getIndexById(action.id);
            newList.splice(index, 1);
            return {
                listTodo: newList
            };
        case 'CHANGE_TODO':
            var newList = state.listTodo.slice();
            var index = getIndexById(action.id);
            newList[index].text = action.text;
            newList[index].edit = false;
            return {
                listTodo: newList
            };
        case 'SHOW_FORM':
            var newList = state.listTodo.slice();
            var index = getIndexById(action.id);
            newList[index].edit = true;
            newList[index].delete = false;
            return {
                listTodo: newList
            };
        case 'SHOW_DELETE':
            var newList = state.listTodo.slice();
            var index = getIndexById(action.id);
            newList[index].delete = true;
            return {
                listTodo: newList
            };
        case 'HIDE_DELETE':
            var newList = state.listTodo.slice();
            var index = getIndexById(action.id);
            newList[index].delete = false;
            return {
                listTodo: newList
            };
        default:
            return state;
    }
};
