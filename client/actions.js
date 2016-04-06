'use strict';

export const getListTodo = list => {
    return {
        type: 'GET_LIST',
        list: list
    };
};

export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        text: text
    };
};

export const deleteTodo = id => {
    return {
        type: 'DELETE_TODO',
        id: id
    };
};

export const changeTodo = (id, text) => {
    return {
        type: 'CHANGE_TODO',
        id: id,
        text: text
    };
};

export const showForm = (id) => {
    return {
        type: 'SHOW_FORM',
        id: id
    };
};

export const showDelete = (id) => {
    return {
        type: 'SHOW_DELETE',
        id: id
    };
};


export const hideDelete = (id) => {
    return {
        type: 'HIDE_DELETE',
        id: id
    };
};


