/* global modules:false */

modules.define('todo__item', function(provide) {
    // Отрисовка по данным
    // id text
    var renderHtml = function (id, text) {
        return `<article id="todo__item-${id}" class="todo todo__item">${text}</article>`
    };
    provide({renderHtml});
});
