/* global modules:false */

modules.define('todo__trashbox', function(provide) {
    // Отрисовка по данным
    // id text
    var renderHtml = function (id) {
        return `<img id="todo__trashbox-${id}" src="trashbox.png" class="todo__trashbox">`
    };
    provide({renderHtml});
});
