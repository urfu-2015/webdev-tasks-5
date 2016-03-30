(function(){

	getTask();

	var buttonAdd = document.getElementsByClassName('task-button-add')[0];
	var inputAdd = document.getElementsByClassName('task-input-text')[0];

	buttonAdd.addEventListener('click', function () {
		if (inputAdd.value.length > 0) {
			addTask(inputAdd.value);
		}
	});
	updateTaskListener();


	function updateTaskListener() {
		var taskButtonsRemove = document.getElementsByClassName('task-button-remove');
		for (var i = 0; i < taskButtonsRemove.length; i++) {
		// 	// alert(i);
			taskButtonsRemove[i].addEventListener('click', deleteTask);
		}
		var buttonsSave = document.getElementsByClassName('button-save');
		for (var i = 0; i < buttonsSave.length; i++) {
			buttonsSave[i].addEventListener('click', changeTextTask);
		}

// var ball = document.getElementsByClassName('task-text')[0];
// ball.addEventListener('ondragenter', dragEnter);
// ball.addEventListener('ondrop', dragDrop);
// ball.addEventListener('ondragover', dragOver);


// ball.dragStart = function(e) { // 1. отследить нажатие
//   shiftY = e.pageY - getCoords(ball).top;
//   // alert(startY);
//   moveAt(e);
//   ball.style.zIndex = 1000; // показывать мяч над другими элементами
//   function moveAt(e) {
//   	// view.changeCordinateX()
//     ball.style.transform = 'translateY(' + (e.pageY - shiftY)  + 'px)';
//   }
// 	document.onmousemove = function(e) {
//     moveAt(e);
//   }
// 	ball.dragEnd = function() {
// 		// alert('no');
// 	ball.style.transform = 'none'; 
//     document.onmousemove = null;
//     ball.onmouseup = null;
//     alert(e.pageY + '  ' + shiftY);
//     changeOrderTask(view.tasks[0].id , Math.ceil((e.page - YshiftY) / 50) - 1);
//   }
// }


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
