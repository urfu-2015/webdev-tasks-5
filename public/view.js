var view = {};

view.tasks = [];

(function() {
    view.update = function () {
        var taskListConteiner = document.getElementsByClassName('task-list-container');
        if (taskListConteiner.length !== 0) {
            taskListConteiner[0].remove();
        }

        var container = document.createElement('div');
        container.classList.add('task-list-container');
        var taskList = document.getElementsByClassName('task-list')[0];

        for (var i = view.tasks.length - 1; i >= 0; i-- ) {
            container.appendChild(createTask(view.tasks[i]));
        };
        taskList.appendChild(container);
    };
    view.changeCordinateX = function (id, offsetX) {

        var task = document.getElementsByClassName('task-' + id)[0];
        
        task.style.transform = 'translateY(' + offsetX + 'px)'; 

    };


    function createTask(task) {
        var containerTask = document.createElement('div');
        containerTask.classList.add('task');
        containerTask.classList.add('task-' + task.id);

        var containerInputTask = document.createElement('div');
        containerInputTask.classList.add('container-input-task');
        containerInputTask.classList.add('container-input-task-' + task.id);
        containerInputTask.classList.add('hidden');

        var inputText = document.createElement('input');
    
        inputText.value = task.text;
        inputText.classList.add('task-save-text-' + task.id);
        inputText.classList.add('task-save-text');
    
        var buttonSave = document.createElement('button');
        buttonSave.dataset.taskId = task.id;
        buttonSave.classList.add('button-save');

        containerInputTask.appendChild(inputText);
        containerInputTask.appendChild(buttonSave);


        var textTask = document.createElement('div');   
        textTask.classList.add('task-text');
        textTask.classList.add('task-text-' + task.id);
        textTask.dataset.taskId = task.id;
        textTask.innerHTML = '<span>' + task.text + '</span>';

        var buttonDeleteTask = document.createElement('div');
        buttonDeleteTask.classList.add('task-button-remove');
        buttonDeleteTask.classList.add('task-button-remove-' + task.id);
        buttonDeleteTask.dataset.taskId = task.id;

        buttonDeleteTask.classList.add('hidden');

        containerTask.appendChild(containerInputTask);
        containerTask.appendChild(textTask);
        containerTask.appendChild(buttonDeleteTask);

        return containerTask;
    }
}());

view.update();
