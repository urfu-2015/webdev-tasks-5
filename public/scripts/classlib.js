'use strict';

(function () {

    var ClassLib = {};

    ClassLib.hasClass = function (el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    };

    ClassLib.addClass = function (el, className) {
        if (el.classList) {
            el.classList.add(className)
        } else if (!ClassLib.hasClass(el, className)) {
            el.className += " " + className;
        }
    };

    ClassLib.removeClass = function (el, className) {
        if (el.classList) {
            el.classList.remove(className);
       } else if (ClassLib.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className=el.className.replace(reg, ' ');
        }
    };
    
    window.ClassLib = ClassLib;
})();