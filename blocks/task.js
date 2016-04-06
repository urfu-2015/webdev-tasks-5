import React from 'react';
import SaveForm from './saveForm';
import RemoveButton from './removeButton';
import ReactDom from 'react-dom';
var check = require('../lib/checkTouch');
var className = {
    input: 'list__task__input__num_',
    todo: 'list__task__todo__num_',
    remove: 'remove__num_',
    save: 'list__task__submit',
    add: 'list__task__add',
    taskDiv: 'list__task__num_',
    loader: 'header__loader',
    header: 'header'
};

export default ({task}) => {
    var start = {};
    function getNumFromClassName(className) {
        return className.split('num_').pop();
    }

    function touchStart(event) {
        if (event.targetTouches.length > 1) {
            return;
        }
        //ldelay = new Date(); 
        start.x = event.changedTouches[0].pageX;
        start.y = event.changedTouches[0].pageY;
    };

    function touchEnd(event) {
        if (check.isTap(start, event)) {
            var targetClass = event.target.className;
            var num = getNumFromClassName(targetClass);
            var oldText = '';
            if (num !== -1) {
                oldText = document
                    .getElementsByClassName(className.todo + num)[0]
                    .innerHTML;
            }
        }
    };
    
    function touchMove(event) {
        var targetClass = event.target.className;
        var num = getNumFromClassName(targetClass);
        if (check.isLeftSwipe(start, event)) {
            if (!document.getElementsByClassName(className.remove + num).length) {
                ;
           }
        }
        else if (check.isRightSwipe(start, event)) {
            var removeButton = document.getElementsByClassName(classes.remove + num)[0];
            if (removeButton) {
                removeButton.parentNode.removeChild(removeButton);
            }
        }
    }

    return (
    <div 
     className={'list__task__todo__num_' + task.orderNum}>
        {task.todo}
    </div>);
};
