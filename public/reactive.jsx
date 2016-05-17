'use strict';

let TodoBlock = React.createClass({
    getInitialState: function () {
        return {data: []};
    },

    componentDidMount: function () {
        document.addEventListener('click', this.handleClickOnEmptySpace);
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);

        let xhr = new XMLHttpRequest();

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
        event = event || window.event;

        if (!event.target.classList.length || event.target.classList.contains('todo-list') ||
            event.target.classList.contains('header') ||
            event.target.classList.contains('header__title')) {
            checkForActiveElement();
        }
    },

    handleTouchStart: function (event) {
        event = event || window.event;
        startY = event.changedTouches[0].clientY;
        startPageY = event.changedTouches[0].pageY;
    },

    handleTouchMove: function (event) {
        event = event || window.event;
        const lastTouch = event.changedTouches[event.changedTouches.length - 1];
        let currentTop = parseInt(window.getComputedStyle(spinner, null)['top'].slice(0, -2));
        let height = parseInt(window.getComputedStyle(spinner, null)['height'].slice(0, -2));
        endY = lastTouch.clientY;
        endPageY = lastTouch.pageY;

        // чтобы не утянуть спиннер слишком низко и не запульнуть выше дефолтного положения
        if (defaultTop + endY - startY + height < pullDivide / 3 && currentTop >= defaultTop) {
            spinner.classList.remove('spinner_hidden');
            spinner.style.top = (defaultTop + endY - startY) + 'px';

            let angle = ((pullDivide - endPageY) / pullDivide) * 800;
            spinner.querySelector('img').style.transform = 'rotate(' + angle + 'deg)';
        }
    },

    handleTouchEnd: function () {
        if (endY - startY > 80 && startPageY < pullDivide && endPageY < pullDivide) {
            location.reload();
        } else {
            startY = undefined;
            endY = undefined;
            endPageY = undefined;
            startPageY = undefined;

            spinner.classList.add('spinner_hidden');
            spinner.style.top = defaultTop + 'px';
        }
    },

    changeTodoList: function (todos) {
        this.setState({data: todos});
    },

    render: function () {
        return (
            <TodoList data={this.state.data} url={this.props.url}
                      changeTodoList={this.changeTodoList}/>
        );
    }
});

let TodoList = React.createClass({
    submitTodo: function (todo, classList) {
        let xhr = new XMLHttpRequest();
        let req, data = {};

        if (classList.contains(FORM + '-add')) {
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
        showAddForm();
    },

    render: function () {
        let todoNodes = this.props.data.map((todo) => {
            return (
                <TodoItem num={todo.num} key={todo.num} text={todo.todo}
                          changeTodoList={this.props.changeTodoList} url={this.props.url}
                          submitTodo={this.submitTodo}>
                </TodoItem>
            );
        });

        return (
            <article className="todo-list">
                {todoNodes.reverse()}
                <button onClick={this.showForm} className="todo-list__add-button" type="button">
                    Добавить
                </button>
                <Form submitTodo={this.submitTodo}/>
            </article>
        );
    }
});

let TodoItem = React.createClass({
    deleteTodo: function (event) {
        event = event || window.event;
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
        event = event || window.event;

        showEditForm(event);
    },

    handleTouchStart: function (event) {
        event = event || window.event;

        startX = event.changedTouches[0].clientX;
    },

    handleTouchMove: function (event) {
        event = event || window.event;

        endX = event.changedTouches[event.changedTouches.length - 1].clientX;
    },

    handleTouchEnd: function (event) {
        event = event || window.event;

        showDeleteButton(event);
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
                            onClick={this.deleteTodo}></button>
                </div>
                <Form submitTodo={this.props.submitTodo} text={this.props.text}/>
            </section>
        );
    }
});

let Form = React.createClass({
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
        event = event || window.event;

        this.setState({text: event.target.value});
    },

    handleSubmit: function (event) {
        event = event || window.event;
        event.preventDefault();

        const text = this.state.text.trim();
        const num = event.target.parentElement.getAttribute('data-id');

        if (!text) {
            return;
        }

        this.props.submitTodo({
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
