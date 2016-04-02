/* global modules:false */

modules.define('todo__text', function(provide) {
    var renderHtml = function (id, text) {
        return `<p id="todo__text-${id}" class="todo__text">${text}</p>`
    };
    provide({renderHtml});
});
