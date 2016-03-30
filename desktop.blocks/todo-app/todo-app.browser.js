/* global modules:false */

modules.define(
    'todo-app', // имя блока
    ['i-bem__dom', 'todo', 'todo__edit-form', 'todo__add-form'], // подключение зависимости
    function (provide, BEMDOM, todo, todoEditForm, todoAddForm) { // функция, в которую передаются имена используемых модулей
        provide(BEMDOM.decl('todo-app', { // декларация блока
            onSetMod: { // конструктор для описания реакции на события
                'js': {
                    'inited': function () {
                        function createNodeFromHtml(html) {
                            var div = document.createElement('div');
                            div.innerHTML = html;
                            return div.firstChild;
                        }

                        var apiWorker = {
                            getTodoAll: () => {
                                return fetch('/api/todos/', {
                                    credentials: 'same-origin'
                                })
                                    .then(function (response) {
                                        return response.json();
                                    })
                            },
                            addTodo: (text) => {
                                return fetch('/api/todos', {
                                    credentials: 'same-origin',
                                    method: 'post',
                                    headers: {
                                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                    },
                                    body: `text=${text}`
                                })
                                    .then(function (response) {
                                        return response.json();
                                    })
                            },
                            getTodo: (noteId) => {
                                return fetch(`/api/todos/${noteId}`, {
                                    credentials: 'same-origin'
                                })
                                    .then(function (response) {
                                        return response.json();
                                    })
                            },
                            editTodo: (noteId, newText) => {
                                return fetch(`/api/todos/${noteId}`, {
                                    credentials: 'same-origin',
                                    method: 'put',
                                    headers: {
                                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                    },
                                    mode: 'cors',
                                    body: `text=${newText}`
                                })
                                    .then(function (response) {
                                        return response.json();
                                    })
                            },
                            deleteTodo: (noteId) => {
                                return fetch(`/api/todos/${noteId}`, {
                                    credentials: 'same-origin',
                                    method: 'delete'
                                })
                                    .then(function (response) {
                                        return response.json();
                                    })
                            }
                        };
                        var todoAppNode = document.getElementsByClassName("todo-app")[0];
                        function renderTodoAll () {
                            return apiWorker.getTodoAll()
                                .then((resp) => {
                                    console.log(resp);
                                    document.getElementsByClassName("todo-app")[0].innerHTML = '';
                                    let todoList = todo.renderTodoListHtml(resp.userTodo);
                                    for (var elem in todoList) {
                                        // console.log(createNodeFromHtml(todoList[elem]));
                                        todoAppNode.appendChild(createNodeFromHtml(todoList[elem]));
                                    }
                                    todoAppNode.appendChild(createNodeFromHtml(todoAddForm.renderTodoAddFormHtml()));
                                })
                                .then(() => {
                                    addFormHandler();
                                });
                        }
                        renderTodoAll();
                        var startPoint = {};
                        var nowPoint;
                        var ldelay;
                        var editFormTimer;
                        function addFormHandler () {
                            document.getElementById('add-form-but').addEventListener('click', (event) => {
                                let newText = document.getElementById(`add-form-text`).value;
                                console.log(newText);
                                apiWorker.addTodo(newText)
                                    .then((resp) => {
                                        console.log(resp);
                                        document.getElementById(`add-form-text`).value = '';
                                        renderTodoAll();
                                    })
                            })
                        }
                        function editFormTapHandler (event) {
                            if (event.targetTouches.length == 1) {
                                var tap = event.targetTouches[0];
                                console.log(tap);
                                // Редактирование
                                if (tap.target.className === 'todo todo__item') {
                                    let todoItemId = tap.target.id.slice(-1);
                                    let todoItemValue = tap.target.innerHTML;
                                    tap.target.innerHTML = todoEditForm.renderTodoEditFormHtml(todoItemId, todoItemValue);
                                    document.getElementById(`edit-form-but-${todoItemId}`).addEventListener('click', (event) => {
                                        let newText = document.getElementById(`edit-form-text-${todoItemId}`).value;
                                        console.log(newText);
                                        apiWorker.editTodo(todoItemId, newText)
                                            .then((resp) => {
                                                console.log(resp);
                                                // TODO: XSS дырень
                                                tap.target.innerHTML = newText;
                                            })
                                    })
                                }
                            }
                        }
                        function deleteHandler (event) {
                            if (event.targetTouches.length == 1) {
                                var tap = event.targetTouches[0];
                                console.log(tap);
                                if (tap.target.className === 'todo todo__trashbox') {
                                    let todoItemId = tap.target.id.slice(-1);
                                    document.getElementById(`todo__trashbox-${todoItemId}`).addEventListener('click', (event) => {
                                        apiWorker.deleteTodo(todoItemId)
                                            .then((resp) => {
                                                console.log(resp);
                                                todoAppNode.removeChild(document.getElementById(`todo-${todoItemId}`));
                                            })
                                    })
                                }
                            }
                        }
                        function leftSwipeHandler (event) {
                            var leftSwipe = event.changedTouches[0];
                            if (leftSwipe.target.className === 'todo todo__item') {
                                let todoItemId = leftSwipe.target.id.slice(-1);
                                let targetStylesBackup = leftSwipe.target.classList;
                                leftSwipe.target.classList.add('animate-left');
                                setTimeout(() => {
                                    document.getElementById(`todo__trashbox-${todoItemId}`).style.display = 'flex';
                                }, 400);
                            }
                        }
                        function rightSwipeHandler (event) {
                            var rightSwipe = event.changedTouches[0];
                            if (rightSwipe.target.className === 'todo todo__item animate-left') {
                                let todoItemId = rightSwipe.target.id.slice(-1);
                                document.getElementById(`todo__trashbox-${todoItemId}`).style.display = 'none';
                                rightSwipe.target.classList.add('animate-right');
                                setTimeout(() => {
                                    rightSwipe.target.classList.remove('animate-left');
                                    rightSwipe.target.classList.remove('animate-right');
                                }, 400);
                            }
                        }
                        document.addEventListener('touchstart', function (event) {
                            // event.preventDefault();
                            event.stopPropagation();
                            editFormTimer = setTimeout(() => {editFormTapHandler(event)}, 200);
                            deleteHandler(event);
                            startPoint.x = event.changedTouches[0].pageX;
                            startPoint.y = event.changedTouches[0].pageY;
                            ldelay = new Date();
                        }, false);
                        document.addEventListener('touchmove', function (event) {
                            event.stopPropagation();
                            clearTimeout(editFormTimer);
                            var offset = {};
                            nowPoint = event.changedTouches[0];
                            offset.x = nowPoint.pageX - startPoint.x;
                            if (Math.abs(offset.x) > 150) {
                                if (offset.x < 0) {
                                    // Показать корзину
                                    console.log('Left swipe on touchmove');
                                    console.log(event);
                                    leftSwipeHandler(event);
                                }
                                if (offset.x > 0) {
                                    // Убрать корзину
                                    console.log('Right swipe on touchmove');
                                    console.log(event);
                                    rightSwipeHandler(event);
                                }
                                startPoint = {x: nowPoint.pageX, y: nowPoint.pageY};
                            }
                        }, false);
                        document.addEventListener('touchend', function (event) {
                            event.stopPropagation();
                            //clearTimeout(editFormTimer);
                            var pdelay = new Date();
                            nowPoint = event.changedTouches[0];
                            var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
                            var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
                            if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime() - ldelay.getTime()) < 200) {
                                if (xAbs > yAbs) {
                                    if (nowPoint.pageX < startPoint.x) {
                                        console.log('Left swipe touchend');
                                        leftSwipeHandler(event);
                                    }
                                    else {
                                        console.log('Right swipe touchend');
                                        rightSwipeHandler(event);
                                    }
                                }
                                else {
                                    if (nowPoint.pageY < startPoint.y) {
                                        console.log('Up swipe');
                                    }
                                    else {
                                        console.log('Down swipe');
                                    }
                                }
                            }
                        }, false);
                        // apiWorker.addTodo("Note4")
                        //     .then((resp) => {
                        //         console.log(resp);
                        //     });
                    }
                }
            }
        }));
    });


