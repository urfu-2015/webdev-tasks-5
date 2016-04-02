/* global modules:false */

modules.define('todo__item', ['todo__text'], function(provide, todoText) {
    // Отрисовка по данным
    // id text
    var renderHtml = function (id, text) {
        return `<article id="todo__item-${id}" class="todo__item">${todoText.renderHtml(id, text)}</article>`
    };
    provide({renderHtml});
});
