var inputClassName = 'list__task__input__num_';
module.exports.inputClassName = inputClassName;

module.exports.getNewInput = function (num) {
	var input = document.createElement('input');
	input.setAttribute("type", "text");
	input.setAttribute("name", "todo")
	input.className = inputClassName + num;
    if (num !== -1) {
        var oldText = document
            .getElementsByClassName('list__task__todo__num_' + num)[0]
            .innerHTML;
        input.value = oldText;
    }
	return input;
}

module.exports.getSaveButton = function () {
	var saveButton = document.createElement('button');
	saveButton.className = 'list__task__submit';
    saveButton.innerHTML = 'Save';
	return saveButton;
}

module.exports.getAddButton = function () {
    var addButton = document.createElement('button');
    addButton.className = 'list__task__add';
    addButton.innerHTML = 'Add task';
    return addButton;
}

module.exports.getDeleteButton = function(num) {
    var delDiv = document.createElement('div');
    delDiv.className = "delete__num_" + num;
    return delDiv;
}

module.exports.getTaskDiv = function(task) {
    var taskDiv = document.createElement('div');
    taskDiv.className = 'list__task__num_' + task.orderNum;
    var taskTodo = document.createElement('div');
    taskTodo.className = 'list__task__todo__num_' + task.orderNum;
    taskTodo.innerHTML = task.todo;
    taskDiv.appendChild(taskTodo);
    return taskDiv;
}

module.exports.getLoader = function() {
    var loader = document.createElement('div');
    loader.className = 'header__loader';
    return loader;
}