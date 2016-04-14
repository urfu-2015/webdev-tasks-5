import fetchJSONHelper from './fetchJSONHelper';

import {getTodos, selectTodo, unselectTodo, editTodo, updateTodo} from './actions';

var startTime;
var endTime;
var initialPoint;
var finalPoint;
var selectedId;

export default (store, selectedTodoId) => {
    return {
        onTouchStart: event => {
            event.preventDefault();

            startTime = new Date();
            initialPoint = event.changedTouches[0];
        },

        onTouchEnd: event => {
            event.preventDefault();

            endTime = new Date();
            finalPoint = event.changedTouches[0];

            var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
            var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);

            // ТАП
            if ((initialPoint.pageX === finalPoint.pageX) &&
                (initialPoint.pageY === finalPoint.pageY) &&
                (endTime - startTime) < 300) {
                if (event.target.getAttribute('class') === 'todo-item__elem') {
                    selectedId = parseInt(
                        event.target.parentNode.getAttribute('id').replace(/\D/g, ''), 10
                    );
                    store.dispatch(editTodo(selectedId));
                }

                if (event.target.getAttribute('id') === 'editInput') {
                    event.target.focus();
                }

                if (event.target.getAttribute('class') === 'todo-edit__save-button') {
                    var editId = parseInt(
                        event
                            .target
                            .parentNode
                            .parentNode
                            .parentNode
                            .getAttribute('id')
                            .replace(/\D/g, ''), 10
                    );

                    var editText = document.getElementById('editInput').value;

                    if (editText !== '') {
                        fetch('/todos/edit',
                            fetchJSONHelper('post', {
                                id: editId,
                                editText: editText
                            })
                        )
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            store.dispatch(updateTodo(data.id, data.editText));
                        });
                    }
                }
            }

            // СВАЙП'ы влево/вправо
            if (xAbs > 20 || yAbs > 20) {
                if (xAbs > yAbs) {
                    if (finalPoint.pageX < initialPoint.pageX) {
                        // СВАЙП left
                        selectedId = parseInt(
                            event.target.parentNode.getAttribute('id').replace(/\D/g, ''), 10
                        );
                        store.dispatch(selectTodo(selectedId));
                    } else {
                        // СВАЙП right
                        selectedId = parseInt(
                            event.target.parentNode.getAttribute('id').replace(/\D/g, ''), 10
                        );
                        if (selectedTodoId === selectedId) {
                            store.dispatch(unselectTodo(selectedId));
                        }
                    }
                } else {
                    // СВАЙП вниз (Обновление) + анимашка
                    /* eslint no-lonely-if: 0 */
                    if (finalPoint.pageY > initialPoint.pageY) {
                        document.getElementById('root').innerHTML = '<img ' +
                            'id="loadGif" ' +
                            'class="loader" ' +
                            'src="/loader__anim.gif" ' +
                            'alt="loading">';

                        setTimeout(() => {
                            fetch('/todos/all', {method: 'get'})
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                store.dispatch(getTodos(data.todos));
                            });
                        }, 500);
                    }
                }
            }
        }
    };
};
