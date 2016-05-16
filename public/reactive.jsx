'use strict';

let startY, endY, startX, endX;

var TodoBlock = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        document.addEventListener('click', this.handleClickOnEmptySpace);
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);
        var xhr = new XMLHttpRequest();

        xhr.open('GET', this.props.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.setState({data: JSON.parse(xhr.response)});
            }
        };
    },
    handleClickOnEmptySpace: function (event) {
        if (!event.target.classList.length) {
            checkForActiveElement();
        }
    },
    handleTouchStart: function (event) {
        startY = event.changedTouches[0].clientY;
    },
    handleTouchMove: function (event) {
        endY = event.changedTouches[event.changedTouches.length - 1].clientY;
    },
    handleTouchEnd: function (event) {
        if (endY - startY > 50) {
            reload();
        }
        startY = undefined;
        endY = undefined;
    },
    changeTodoList: function (todos) {
        this.setState({data: todos});
    },

    render: function () {
        return (
            <TodoList data={this.state.data} url={this.props.url} changeTodoList={this.changeTodoList}/>
        );
    }
});

var TodoList = React.createClass({
    handleTodoSubmit: function (todo, classList) {
        var xhr = new XMLHttpRequest();

        let req, data = {};
        if (classList.contains('todo-list__form-add')) {
            req = 'POST';
            data.text = todo.text;
        } else {
            req = 'PATCH';
            data = todo;
        }
        xhr.open(req, this.props.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.props.changeTodoList(JSON.parse(xhr.response));
            }
        };
        checkForActiveElement();
    },
    showForm: function () {
        checkForActiveElement();

        let addForm = document.querySelector('.' + FORM + '-add');

        addForm.dataset.active = '';
        makeVisible(addForm, 'form');
        addForm.querySelector('.' + TEXTAREA).focus();
    },
    render: function () {
        var todoNodes = this.props.data.map((todo) => {
            return (
                <TodoItem num={todo.num} key={todo.num} text={todo.todo}
                          changeTodoList={this.props.changeTodoList} url={this.props.url}
                          handleTodoSubmit={this.handleTodoSubmit}>
                </TodoItem>
            );
        });
        return (
            <article className="todo-list">
                {todoNodes}
                <button onClick={this.showForm} className="todo-list__add-button" type="button">Добавить
                </button>
                <Form handleTodoSubmit={this.handleTodoSubmit}/>
            </article>
        );
    }
});

var TodoItem = React.createClass({
    handleDelete: function (event) {
        event.persist();
        let todoNum = event.target.parentElement.parentElement.getAttribute('data-id');

        let xhr = new XMLHttpRequest();

        xhr.open('DELETE', this.props.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({num: todoNum}));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.props.changeTodoList(JSON.parse(xhr.response));
            }
        };
    },
    handleClick: function (event) {
        checkForActiveElement();

        if (!event.target.classList.contains(TEXT)) {
            return;
        }

        let editForm = event.target.parentElement.parentElement.querySelector('.' + FORM);

        editForm.dataset.active = '';
        makeVisible(editForm, 'form');

        makeHidden('text', event.target);
        editForm.querySelector('.' + TEXTAREA).focus();
    },
    handleTouchStart: function (event) {
        startX = event.changedTouches[0].clientX;
    },
    handleTouchMove: function (event) {
        endX = event.changedTouches[event.changedTouches.length - 1].clientX;
    },
    handleTouchEnd: function (event) {
        if (startX - endX > 50) {
            checkForActiveElement();

            let deleteButton = event.target.parentElement.parentElement.querySelector('.' + DELETE);

            deleteButton.dataset.active = '';
            deleteButton.style.width = event.target.clientHeight + 'px';
            makeVisible(deleteButton, 'delete');
        }

        startX = undefined;
        endX = undefined;
    },
    render: function () {
        return (
            <section className="todo-list__item" data-id={this.props.num}
                     onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}
                     onTouchEnd={this.handleTouchEnd}>
                <div className="todo-list__text-delete">
                    <div className="todo-list__text todo-list__text_visible"
                         onClick={this.handleClick}>{this.props.text}</div>
                    <button className="todo-list__delete todo-list__delete_hidden"
                            onClick={this.handleDelete}></button>
                </div>
                <Form handleTodoSubmit={this.props.handleTodoSubmit} text={this.props.text}/>
            </section>
        );
    }
});

var Form = React.createClass({
    getInitialState: function () {
        let text = '';
        if (this.props.text) {
            text = this.props.text;
        }
        return {
            text: text
        };
    },
    handleTextChange: function (event) {
        this.setState({text: event.target.value});
    },
    handleSubmit: function (event) {
        event.preventDefault();
        const text = this.state.text.trim();
        const num = event.target.parentElement.getAttribute('data-id');
        if (!text) {
            return;
        }
        this.props.handleTodoSubmit({
            num: num,
            text: text
        }, event.target.classList);
        this.setState({text: ''});
    },

    render: function () {
        return (
            <form className={this.props.text ?
                "todo-list__form todo-list__form-edit todo-list__form_hidden" :
                "todo-list__form todo-list__form-add todo-list__form_hidden"}
                  onSubmit={this.handleSubmit}>
                    <textarea className="todo-list__textarea" name="text"
                              onChange={this.handleTextChange} value={this.state.text}></textarea>
                <button className={this.props.text ? "todo-list__submit todo-list__submit-edit" :
                    "todo-list__submit"} type="submit">
                    Сохранить
                </button>
            </form>
        );
    }
});

ReactDOM.render(
    <TodoBlock url="/todo"/>,
    document.querySelector('.main')
);
