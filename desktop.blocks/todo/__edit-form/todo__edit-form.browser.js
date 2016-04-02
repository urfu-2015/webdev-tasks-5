/* global modules:false */

modules.define('todo__edit-form', function(provide) {
    // Шаблон формы
    var renderTodoEditFormHtml = function (id, value) {
        return `<form class="todo__edit-form" onsubmit="return false"><input id="edit-form-text-${id}" type="text" value="${value}"><input id="edit-form-but-${id}" type="submit" value="Изменить"></form>`
    };
    provide({renderTodoEditFormHtml});
});
