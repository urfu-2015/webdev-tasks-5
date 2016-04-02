var className = {
    input: 'list__task__input__num_',
    todo: 'list__task__todo__num_',
    remove: 'remove__num_',
    save: 'list__task__submit',
    add: 'list__task__add',
    taskDiv: 'list__task__num_',
    loader: 'header__loader',
    header: 'header'
}
module.exports.className = className;

module.exports.getNewInput = function (num) {
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('name', 'todo')
	input.className = className.input + num;
    if (num !== -1) {
        var oldText = document
            .getElementsByClassName(className.todo + num)[0]
            .innerHTML;
        input.value = oldText;
    }
	return input;
}

module.exports.getSaveButton = function () {
	return saveButton = newButton(className.save, 'Save');
}

module.exports.getAddButton = function () {
    var addButton = newButton(className.add, 'Add task');
    return addButton;
}

module.exports.getRemoveButton = function(num) {
    return delDiv = newDiv(className.remove + num);
}

module.exports.getTaskDiv = function(task) {
    var taskDiv = newDiv(className.taskDiv + task.orderNum);
    var taskTodo = newDiv(className.todo + task.orderNum);
    taskTodo.innerHTML = task.todo;
    taskDiv.appendChild(taskTodo);
    return taskDiv;
}

module.exports.getLoader = function() {
    var loader = newDiv();
    loader.className = className.loader;
    return loader;
}

function newDiv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}

function newButton(className, text) {
    var button = document.createElement('button');
    button.className = className;
    button.innerHTML = text;
    return button;
}
