'use strict';

(function() {
	
	var TaskHandler = function (id, text) {
		this.__node = document.createElement('DIV');
        this.__mode = 'normal';
		this.__fillNode();
        this.setId(id);
        this.setText(text);
        this.__setEventHandlers();
        this.changeTaskCB = function () {};
        this.deleteTaskCB = function () {};
	};
    
    TaskHandler.prototype.__setEventHandlers = function () {
        var taskItemNode = this.__node.children[0];
        var taskItemHandler = new TapHandler(taskItemNode);
        taskItemHandler.swipeLeftCB = this.showDelete.bind(this);
        taskItemHandler.swipeRightCB = this.hideDelete.bind(this);
        taskItemHandler.tapCB = (function () {
            this.__mode == 'normal' ?
            this.switchToEditMode() :
            this.switchToNormalMode();
        }).bind(this);
        var saveButton = this.__node.getElementsByClassName('task-item__save-button')[0];
        var changeTaskHandler = new TapHandler(saveButton);
        changeTaskHandler.tapCB = (function () {
            this.changeTaskCB(this);
        }).bind(this);
        var deleteButton = this.__node.getElementsByClassName('task-item__delete-task')[0];
        var deleteHandler = new TapHandler(deleteButton);
        deleteHandler.tapCB = (function () {
           this.deleteTaskCB(this); 
        }).bind(this);
    };
	
	TaskHandler.prototype.getNode = function () {
		return this.__node;
	};
	
	TaskHandler.prototype.__fillNode = function () {
		var templateNode = document.getElementsByClassName('task-template')[0];
		this.__node.innerHTML = templateNode.innerHTML;
	};
	
	TaskHandler.prototype.setId = function (id) {
		this.__id = id;
	};
	
	TaskHandler.prototype.getId = function () {
		return this.__id;
	};
	
	TaskHandler.prototype.getText = function () {
		return this.__text;
	};
	
	TaskHandler.prototype.setText = function (text) {
        this.__text = text;
		this.__node.getElementsByClassName('task-item__name')[0].innerHTML = text;
        this.__node.getElementsByClassName('task-item__editor__area')[0].value = text;
	};
    
    TaskHandler.prototype.getEditedText = function () {
        return this.__node.getElementsByClassName('task-item__editor__area')[0].value;
    };
	
    TaskHandler.prototype.switchToEditMode = function () {
        this.__mode = 'edit';
        ClassLib.removeClass(this.__node.children[0], 'task-item_edit_false');
        ClassLib.addClass(this.__node.children[0], 'task-item_edit_true');
    };
    
    TaskHandler.prototype.switchToNormalMode = function () {
        this.__mode = 'normal';
        ClassLib.removeClass(this.__node.children[0], 'task-item_edit_true');
        ClassLib.addClass(this.__node.children[0], 'task-item_edit_false');
    };
    
    TaskHandler.prototype.showDelete = function () {
        ClassLib.removeClass(this.__node.children[0], 'task-item_delete_false');
        ClassLib.addClass(this.__node.children[0], 'task-item_delete_true');
    };
    
    TaskHandler.prototype.hideDelete = function () {
        ClassLib.removeClass(this.__node.children[0], 'task-item_delete_true');
        ClassLib.addClass(this.__node.children[0], 'task-item_delete_false');
    };
    
	window.TaskHandler = TaskHandler;
	
})();