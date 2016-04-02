/* global modules:false */

modules.define('todo__refresh', function(provide) {
    var renderHtml = function () {
        return '<img class="todo__refresh" id="todo__refresh" src="refresh.png">'
    };
    provide({renderHtml});
});
