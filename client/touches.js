'use strict';

import {getCurrentTranslate, buildNewTransform, activateDeleteButton, disableDeleteButton} from './cssHelper';

function getSwipeHandlers() {
    document.ontouchmove = function (event) {
        event.preventDefault();
    };
    var isVertical = false;
    var isHorizontal = false;
    const todoTextClass = 'todo__text';

    function handleLeftSwipe(todo, event, distX) {
        var currentTranslate = getCurrentTranslate(todo);
        if (currentTranslate == -60) {
            return;
        }
        todo.style.transform = buildNewTransform(-Math.min(-distX - 20, 60), 'X');
        event.stopImmediatePropagation();
    }

    function handleRightSwipe(todo, event, distX) {
        var currentTranslate = getCurrentTranslate(todo);
        if (currentTranslate == 0) {
            return;
        }
        todo.style.transform = buildNewTransform(Math.min(-80 + distX, 0), 'X');
        event.stopImmediatePropagation();
    }

    function handleDownSwipe(swipeTarget, startTranslate, distY) {
        isVertical = true;
        swipeTarget.style.transform = buildNewTransform(Math.min(startTranslate + distY, 0), "Y");
    }

    function handleUpSwipe(swipeTarget, startTranslate, distY) {
        isVertical = true;
        var height = parseInt(getComputedStyle(swipeTarget).height, 10);
        if (-(height - 55) > startTranslate + distY) {
            return;
        }
        swipeTarget.style.transform = buildNewTransform((startTranslate + distY), 'Y');
    }

    return {
        onHorizontalSwipe: function (element) {
            var touchsurface = element;
            var startX;
            var startY;
            var distX;
            var distY;
            var swipeTarget;

            function prepareDisableButton() {
                var currentTranslate = getCurrentTranslate(swipeTarget);
                if (currentTranslate < -30) {
                    setTimeout(() => activateDeleteButton(swipeTarget), 100);
                } else {
                    disableDeleteButton(swipeTarget);
                }
            }

            function onHorizontalSwipeEnd() {
                if (!isHorizontal) {
                    return;
                }
                isHorizontal = false;
                var currentTranslate = getCurrentTranslate(swipeTarget);
                swipeTarget.style.transform = buildNewTransform(Math.abs(currentTranslate) > 30 ? -60 : 0, 'X');
                prepareDisableButton();
            }

            touchsurface.addEventListener('touchstart', function (event) {
                swipeTarget = event.target;
                var touchobj = event.changedTouches[0];
                startX = touchobj.pageX;
                startY = touchobj.pageY;
            }, false);

            touchsurface.addEventListener('touchmove', function (event) {
                if (swipeTarget.className !== todoTextClass || isVertical) {
                    return;
                }
                var touchobj = event.changedTouches[0];
                distX = touchobj.pageX - startX;
                distY = touchobj.pageY - startY;
                var todo = event.target;

                if (Math.abs(distX) > 20) {
                    isHorizontal = true;
                }
                if (distX < -20) {
                    handleLeftSwipe(todo, event, distX);
                } else if (distX > 20) {
                    handleRightSwipe(todo, event, distX);
                }
            }, false);

            touchsurface.addEventListener('touchend', onHorizontalSwipeEnd);
            touchsurface.addEventListener('touchcancel', onHorizontalSwipeEnd);
        },

        onVerticalSwipe: function (element, refreshFunction) {
            var touchsurface = element;
            var startX;
            var startY;
            var distX;
            var distY;
            var swipeTarget;
            var startTranslate = -80;

            touchsurface.addEventListener('touchstart', function (event) {
                swipeTarget = document.querySelector('main');
                swipeTarget.style.transition = "";
                var touchobj = event.changedTouches[0];
                startX = touchobj.pageX;
                startY = touchobj.pageY;
            }, false);

            touchsurface.addEventListener('touchmove', function (event) {
                var touchobj = event.changedTouches[0];
                distX = touchobj.pageX - startX;
                distY = touchobj.pageY - startY;
                if (isHorizontal) {
                    return;
                }
                if (distY > 5) {
                    handleDownSwipe(swipeTarget, startTranslate, distY);
                }
                else if (distY < -5) {
                    handleUpSwipe(swipeTarget, startTranslate, distY);
                }
            }, false);

            function setReturnAnimation() {
                swipeTarget.style.transition = "transform";
                swipeTarget.style.transitionDelay = distY >= 80 ? ".9s" : "0s";
                swipeTarget.style.transitionDuration = "1s";
                swipeTarget.style.transform = "translateY(-80px)";
            }

            const refreshChecker = '.refresh-checker';

            function startRefreshAnimation() {
                var checker = document.querySelector(refreshChecker);
                checker.checked = true;
                setTimeout(() => {
                    checker.checked = false;
                }, 1000);
            }

            function onVerticalSwipeEnd(event) {
                if (!isVertical) {
                    return;
                }
                isVertical = false;
                var touchobj = event.changedTouches[0];
                distY = touchobj.pageY - startY;
                var currentTranslate = getCurrentTranslate(swipeTarget);
                if (currentTranslate == 0) {
                    refreshFunction();
                    startRefreshAnimation();
                }
                if (currentTranslate > -80) {
                    setReturnAnimation();
                }
                startTranslate = getCurrentTranslate(swipeTarget);
            }

            touchsurface.addEventListener('touchend', onVerticalSwipeEnd);
            touchsurface.addEventListener('touchcancel', onVerticalSwipeEnd);
        }
    };
}
var swipeHandlers = getSwipeHandlers();
exports.onHorizontalSwipe = swipeHandlers.onHorizontalSwipe;
exports.onVerticalSwipe = swipeHandlers.onVerticalSwipe;