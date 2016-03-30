(function(){

	getTask();

	var curentElementId = undefined;

	var buttonAdd = document.getElementsByClassName('task-button-add')[0];
	var inputAdd = document.getElementsByClassName('task-input-text')[0];

	var isMobile = false;
	if (!isMobile) {
		buttonAdd.addEventListener('click', function () {
			hiddenChangeBlock();
			if (inputAdd.value.length > 0) {
				addTask(inputAdd.value);
			}
		});
		inputAdd.addEventListener('click', function () {
			hiddenChangeBlock();
		}, false);
		updateTaskListener();
	} else {
		buttonAdd.addEventListener('touchstart', function () {
			hiddenChangeBlock();
			if (inputAdd.value.length > 0) {
				addTask(inputAdd.value);
			}
		});
		inputAdd.addEventListener('touchstart', function () {
			hiddenChangeBlock();
		}, false);
		updateTaskListenerMobile();
	}

	function updateTaskListener() {
		var taskButtonsRemove = document.getElementsByClassName('task-button-remove');
		for (var i = 0; i < taskButtonsRemove.length; i++) {
			taskButtonsRemove[i].addEventListener('click', deleteTask);
		}
		var buttonsSave = document.getElementsByClassName('button-save');
		for (var i = 0; i < buttonsSave.length; i++) {
			buttonsSave[i].addEventListener('click', changeTextTask);
		}
		var taskText = document.getElementsByClassName('task-text');
		for (var i = 0; i < taskText.length; i++) {
			taskText[i].addEventListener('click', showChangeBlock);
		}
	}

	function updateTaskListenerMobile() {
		var taskButtonsRemove = document.getElementsByClassName('task-button-remove');
		for (var i = 0; i < taskButtonsRemove.length; i++) {
			taskButtonsRemove[i].addEventListener('touchstart', deleteTask);
		}
		var buttonsSave = document.getElementsByClassName('button-save');
		for (var i = 0; i < buttonsSave.length; i++) {
			buttonsSave[i].addEventListener('touchstart', changeTextTask);
		}
		var taskText = document.getElementsByClassName('task-text');
		for (var i = 0; i < taskText.length; i++) {
			taskText[i].addEventListener('touchstart', showChangeBlock);
			taskText[i].addEventListener('touchend', showDeleteButton);
		}
		// var taskButtonRemove = document.getElementsByClassName('task-button-remove');
		// for (var i = 0; i < taskText.length; i++) {
		// 	taskButtonRemove[i].addEventListener('touchend', showDeleteButton);
		// }
	}

	function hiddenChangeBlock() {
		if (curentElementId !== undefined) {
			var taskText = document.getElementsByClassName('task-text-' + curentElementId)[0];
			taskText.classList.remove('hidden');
			var containerInputTask = document.getElementsByClassName('container-input-task-' + curentElementId)[0];
			containerInputTask.classList.add('hidden');
			var buttonDeleteTask = document.getElementsByClassName('task-button-remove-' + curentElementId)[0];
			buttonDeleteTask.classList.add('hidden');
			curentElementId = undefined;
		}
	}
	function showDeleteButton() {
		var id = this.dataset.taskId;
		var buttonDeleteTask = document.getElementsByClassName('task-button-remove-' + id);
		buttonDeleteTask.classList.remove('hidden');		
	};

	function showChangeBlock() {
		hiddenChangeBlock();

		var id = this.dataset.taskId;
		curentElementId = id;
		this.classList.add('hidden');
		
		var windowChange = document.getElementsByClassName('container-input-task-' + id)[0];
		windowChange.classList.remove('hidden');

	}

	function changeTextTask() {
		var id = this.dataset.taskId;

		var xhr = getXmlHttp();
		xhr.open('POST', '/task/change/', true);
		
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = httpRequestWait;

		var inputText = document.getElementsByClassName('task-save-text-' + id)[0].value;
		xhr.send('text=' + inputText + '&id=' + id);
	}

	function getTask() {
		var xhr = getXmlHttp();
		xhr.open('GET', '/task/list', true);

		xhr.onreadystatechange = httpRequestWait;
		xhr.send();
	};
	function addTask(text) {
		var xhr = getXmlHttp();
		xhr.open('POST', '/task/add/', true);
		
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = httpRequestWait;
		xhr.send('text=' + text);
	}
	function deleteTask() {
		var id = this.dataset.taskId;
		var xhr = getXmlHttp();
		xhr.open('DELETE', '/task/delete/' + id, true);
		
		xhr.onreadystatechange = httpRequestWait;
		xhr.send();
	}
	function changeOrderTask(id, order) {
		var xhr = getXmlHttp();
		xhr.open('POST', '/task/shift/', true);
		
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = httpRequestWait;

		// alert('id=' + id + '&number=' + order);
		xhr.send('id=' + id + '&number=' + order);
	}



	function httpRequestWait() {
 		if (this.status != 200) {
  			// alert( xhr.status + ': ' + xhr.statusText ); 
		} else {
			// alert(this.responseText);
  			view.tasks = JSON.parse(this.responseText);
  			view.update();
  			updateTaskListener();
		}
	}


	function getXmlHttp() {
  		var xmlhttp;
  		try {
    		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  		} catch (e) {
    		try {
      			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    		} catch (E) {
      			xmlhttp = false;
    		}
  		}
  		if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    		xmlhttp = new XMLHttpRequest();
  		}
  		return xmlhttp;
	}
}());
