var view = {};

view.tasks = [
	{
		id: "123",
		text: "first",
		order: 1
	},
	{
		id: "412412",
		text: "second",
		order: 2
	}
];

(function() {
	view.update = function () {
		var taskListConteiner = document.getElementsByClassName('task-list-container');
		if (taskListConteiner.length !== 0) {
			taskListConteiner[0].remove();
		}

		var container = document.createElement('div');
		container.classList.add('task-list-container');
		var taskList = document.getElementsByClassName('task-list')[0];

		view.tasks.forEach(function(task, i) {
			container.appendChild(createTask(task));
		});
		taskList.appendChild(container);
	};
	view.changeCordinateX = function (id, offsetX) {

		var task = document.getElementsByClassName('task-' + id)[0];
		// alert(task);
		task.style.transform = 'translateY(' + offsetX + 'px)'; 

	};
function createTask(task) {
	var containerTask = document.createElement('div');
	containerTask.classList.add('task');
	containerTask.classList.add('task-' + task.id);
	containerTask.style.order = task.order;

	var textTask = document.createElement('div');
	textTask.classList.add('task-text');
	// textTask.classList.add('task-text-' + task.id);
	textTask.innerHTML = '<span>' + task.text + '</span>';

	var inputText = document.createElement('input');
	// inputText.dataset.taskId = task.id;
	inputText.value = task.text;
	inputText.classList.add('task-save-text-' + task.id);
	var buttonSave = document.createElement('button');
	buttonSave.dataset.taskId = task.id;
	buttonSave.classList.add('button-save');

	containerTask.appendChild(inputText);
	containerTask.appendChild(buttonSave);

	var buttonDeleteTask = document.createElement('div');
	buttonDeleteTask.classList.add('task-button-remove');
	buttonDeleteTask.dataset.taskId = task.id;
	// buttonDeleteTask.addEventListener('click', deleteTask(task.id));
	// buttonDeleteTask.classList.add('hidden');

	containerTask.appendChild(textTask);
	containerTask.appendChild(buttonDeleteTask);

	return containerTask;
}

}());
// alert('ud');
view.update();
// view.changeCordinateX('123', -20);

// view.update();
