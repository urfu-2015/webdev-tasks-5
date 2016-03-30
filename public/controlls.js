(function(){

	getTask();

	var curentElementId = undefined;
	var touchElementX;
	var touchElementY;

	var buttonAdd = document.getElementsByClassName('task-button-add')[0];
	var inputAdd = document.getElementsByClassName('task-input-text')[0];

	var isMobile = true;
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
			taskText[i].addEventListener('mousedown', startClick);
			taskText[i].addEventListener('mouseup', endClick);
		}
	}

	function updateTaskListenerMobile() {
		var taskButtonsRemove = document.getElementsByClassName('task-button-remove');
		for (var i = 0; i < taskButtonsRemove.length; i++) {
			taskButtonsRemove[i].addEventListener('touchstart', deleteTask);
		}
		var buttonsSave = document.getElementsByClassName('button-save');
		for (var i = 0; i < buttonsSave.length; i++) {
			buttonsSave[i].addEventListener('touchend', changeTextTask);
		}
		var taskText = document.getElementsByClassName('task-text');
		for (var i = 0; i < taskText.length; i++) {
			taskText[i].addEventListener('touchstart', startTouch);
			taskText[i].addEventListener('touchend', endTouch);
		}
	}

	function startClick(event) {
		hiddenChangeBlock();
		curentElementId = this.dataset.taskId;
		touchElementX = event.clientX;
  		touchElementY = event.clientY; 
	}
	function endClick(event) {
		if (event.clientX + 50 < touchElementX) {
			showDeleteButton.call(this);
		} else {
			showChangeBlock.call(this);
		}
	}

	function startTouch(event) {
		hiddenChangeBlock();
		curentElementId = this.dataset.taskId;
		alert(touchElementX);
		touchElementX = event.touches[0].pageX;
  		touchElementY = event.touches[0].pageY; 
	}
	function endTouch(event) {
		alert(event.touches[0].pageX + 'end');
		if (event.touches[0].pageX + 50 < touchElementX) {
			showDeleteButton.call(this);
		} else {
			showChangeBlock.call(this);
		}
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
		var buttonDeleteTask = document.getElementsByClassName('task-button-remove-' + id)[0];
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
  			if (isMobile) {
  				updateTaskListenerMobile();
  			} else {
  				updateTaskListener();
  			}
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
