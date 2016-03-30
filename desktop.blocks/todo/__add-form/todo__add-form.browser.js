/* global modules:false */

modules.define('todo__add-form', function(provide) {
    // Шаблон формы
    var renderTodoAddFormHtml = function () {
        return `<form class="todo todo__add-form" onsubmit="return false"><input id="add-form-text" type="text"><input id="add-form-but" type="submit" value="Добавить"></form>`
    };
    provide({renderTodoAddFormHtml});
});
