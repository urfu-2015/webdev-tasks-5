import React from 'react';
import SaveForm from './saveForm';
import ReactDom from 'react-dom';
var check = require('../lib/checkTouch');
export default ({task, commonStaff, handler}) => {
    var timeout;
    var taskWithMargin;
    function todoTouchStart(event) {
        if (event.targetTouches.length > 1) {
            return;
        }
        event.preventDefault();
        commonStaff.start.x = event.changedTouches[0].pageX;
        commonStaff.start.y = event.changedTouches[0].pageY;
        if (commonStaff.reoder) {
            return;
        }
        timeout = setTimeout(dragAndDrop, 1500, event.target);
    }

    function todoTouchEnd(event) {
        clearTimeout(timeout);
        if (commonStaff.reoder) {
            return;
        }
        var num = event.target.getAttribute('data-num');
        if (check.isTap(commonStaff.start, event, commonStaff.ldelay)) {
            commonStaff.edited = num;
            commonStaff.render();
        }
        if (commonStaff.deleted !== num) {
            event.target.nextElementSibling.style.right = `${-130}px`;
            event.target.style.left = 0;
        }
    }

    function todoTouchMove(event) {
        clearTimeout(timeout);
        if (commonStaff.reoder) {
            return;
        }
        var num = event.target.getAttribute('data-num');
        if (commonStaff.edited != -2 || commonStaff.deleted != num) {
            commonStaff.edited = -2;
            commonStaff.render();
            commonStaff.deleted = num;
        }
        var x = Number(event.changedTouches[0].pageX);
        var delta = (Number(commonStaff.start.x) - x) / 2;
        var todo = event.target;
        todo.style.left = getNumInBorder(-130, 0, -delta) + 'px';
        var removeRight = getNumInBorder(-130, 0, -130 + delta);
        todo.nextElementSibling.style.right = removeRight + 'px';
        if (removeRight === 0) {
            commonStaff.deleted = num;
        } else {
            commonStaff.deleted = -2;
        }
    }

    function dragAndDrop(task) {
        if (commonStaff.edited != -2) {
            commonStaff.edited = -2;
            commonStaff.render();
        }
        var parent = task.parentNode;
        parent.className = 'task_big';
        parent.style.top = commonStaff.start.y - 100 + 'px';
        parent.style.zIndex = 100;
        parent.addEventListener('touchmove', changePosition, false);
        parent.addEventListener('touchend', savePosition, false);
        taskWithMargin = parent.nextElementSibling;
        taskWithMargin.style.margin = "120px 0 0";
        commonStaff.reoder = true;
    }

    function getNumInBorder(min, max, num) {
        num = Math.max(min, num);
        num = Math.min(max, num);
        return num;
    }

    function changePosition(event) {
        var addButton = this.parentNode.lastElementChild;
        var max = addButton.getBoundingClientRect().top - 150;
        var posY = event.changedTouches[0].pageY - 30;
        this.style.top = getNumInBorder(200, max, posY) + 'px';
        var newNum = getNumFromPosition(event.changedTouches[0].pageY);
        taskWithMargin.style.margin = "10px 0";
        taskWithMargin = document.getElementsByClassName('task')[newNum];
        taskWithMargin.style.margin = "120px 0 0";
    }

    function getNumFromPosition(posY) {
        var newNum = Math.floor(posY / 150) - 1;
        newNum = getNumInBorder(0, commonStaff.tasks.length - 1, newNum);
        return newNum;
    }

    function savePosition(event) {
        this.removeEventListener('touchmove', changePosition, false);
        this.removeEventListener('touchend', savePosition, false);
        this.style.top = 0;
        this.style.zIndex = 0;
        var newNum = getNumFromPosition(event.changedTouches[0].pageY);
        var oldNum = Number(this.getAttribute("data-num"));
        this.className = 'task';
        changeLocalOrder(oldNum, newNum);
        commonStaff.reoder = false;
        taskWithMargin.style.margin = "10px 0";
        taskWithMargin = null;
        if (oldNum === newNum) {
            return;
        }
        handler.reorder(oldNum, newNum);
    }

    function changeLocalOrder(oldNum, newNum) {
        var tasks = document.getElementsByClassName('task');
        var text = tasks[oldNum].firstElementChild.innerHTML;
        if (oldNum < newNum) {
            for (var i = oldNum; i < newNum; i++) {
                tasks[i].firstElementChild.innerHTML =
                    tasks[i + 1].firstElementChild.innerHTML;
            }
        } else {
            for (var i = oldNum; i > newNum; i--) {
                tasks[i].firstElementChild.innerHTML =
                    tasks[i - 1].firstElementChild.innerHTML;
            }
        }
        tasks[newNum].firstElementChild.innerHTML = text;
    }
    return (
        <div key={task.orderNum} className="task" data-num={task.orderNum}>
            <div className="task__todo"
                onTouchMove={todoTouchMove}
                onTouchEnd={todoTouchEnd}
                onTouchStart={todoTouchStart}
                data-num={task.orderNum}>
                {task.todo}
            </div>
            <div className ="remove"
                data-num={task.orderNum}
                onClick={handler.remove}>
            </div>
        </div>
    );
};
