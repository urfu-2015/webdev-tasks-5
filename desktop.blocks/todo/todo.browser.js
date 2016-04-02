/* global modules:false */

modules.define('todo', ['todo__item', 'todo__trashbox'], function(provide, todoItem, todoTrashBox) {
    // Рендер полного списка заметок
    var renderTodoListHtml = function(data) {
        var todoList = [];
        for (var todo in data) {
            let todoItemHtml = todoItem.renderHtml(todo, data[todo].text);
            let todoTrashBoxHtml = todoTrashBox.renderHtml(todo);
            todoList.push(`<div id="todo-${todo}" class="todo">${todoTrashBoxHtml}${todoItemHtml}</div>`);
            // todoList.push(todoItem.renderHtml(todo, data[todo].text));
            //console.log(todoItem.renderHtml(todo, data[todo].text));
        }
        return todoList;
    };
    // var todo__itemHtml = function (id, text) {
    //     return `<article id="${id}" class="todo__item">${text}</article>`
    // };
    // var a = {a: (inp) => {alert(inp)}};
    // provide(a);
    provide({renderTodoListHtml});
});
