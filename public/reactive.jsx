'use strict';

let TodoBlock = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            spinner: document.querySelector('.spinner'),
            startY: undefined,
            endY: undefined,
            startPageY: undefined,
            endPageY: undefined
        };
    },

    componentDidMount: function () {
        document.addEventListener('click', this.handleClickOnEmptySpace);
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);

        xhr('GET', this.props.url, (response) => {
            this.setState({data: response});
        })
    },

    handleClickOnEmptySpace: function (event) {
        event = event || window.event;

        if (!event.target.classList.length || event.target.classList.contains('todo-list') ||
            event.target.classList.contains('header') ||
            event.target.classList.contains('header__title')) {
            hideOtherActiveElement();
        }
    },

    handleTouchStart: function (event) {
        event = event || window.event;

        this.setState({
            startY: event.changedTouches[0].clientY,
            startPageY: event.changedTouches[0].pageY
        });

    },

    handleTouchMove: function (event) {
        event = event || window.event;
        const lastTouch = event.changedTouches[event.changedTouches.length - 1];
        let currentTop = parseInt(window.getComputedStyle(this.state.spinner, null)['top'].slice(0, -2)),
            height = parseInt(window.getComputedStyle(this.state.spinner, null)['height'].slice(0, -2));

        this.setState({
            endY: lastTouch.clientY,
            endPageY: lastTouch.pageY
        });

        // чтобы не утянуть спиннер слишком низко и не запульнуть выше дефолтного положения
        if (defaultTop + this.state.endY - this.state.startY + height < pullDivide / 3 &&
            currentTop >= defaultTop) {

            makeVisible(this.state.spinner, 'spinner');
            this.state.spinner.style.top = (defaultTop + this.state.endY - this.state.startY) + 'px';

            let angle = ((pullDivide - this.state.endPageY) / pullDivide) * 800;
            this.state.spinner.querySelector('img').style.transform = 'rotate(' + angle + 'deg)';
        }
    },

    handleTouchEnd: function () {
        if (this.state.endY - this.state.startY > 90 && this.state.startPageY < pullDivide &&
            this.state.endPageY < pullDivide) {
            location.reload();
        } else {
            this.setState({
                startY: undefined,
                endY: undefined,
                endPageY: undefined,
                startPageY: undefined
            });

            hideElement('spinner');
            this.state.spinner.style.top = defaultTop + 'px';
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
        let req, data = {};

        if (isAddForm(classList)) {
            req = 'POST';
            data.text = todo.text;
        } else {
            req = 'PATCH';
            data = todo;
        }

        xhr(req, this.props.url, (response) => {
            this.props.changeTodoList(response);
        }, data);

        hideOtherActiveElement();
    },

    showForm: function () {
        hideOtherActiveElement();

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
    getInitialState: function () {
        return {
            startX: undefined,
            endX: undefined
        }
    },

    deleteTodo: function (event) {
        event = event || window.event;
        event.persist();

        let todoNum = event.target.parentElement.parentElement.getAttribute('data-id');

        xhr('DELETE', this.props.url, (response) => {
            this.props.changeTodoList(response);
        }, {num: todoNum});
    },

    showEditForm: function (event) {
        hideOtherActiveElement();

        event = event || window.event;

        showEditForm(event);
    },

    handleTouchStart: function (event) {
        event = event || window.event;

        this.setState({startX: event.changedTouches[0].clientX});
    },

    handleTouchMove: function (event) {
        event = event || window.event;

        this.setState({endX: event.changedTouches[event.changedTouches.length - 1].clientX});
    },

    handleTouchEnd: function (event) {
        hideOtherActiveElement();

        event = event || window.event;

        showDeleteButton(event, this.state.startX, this.state.endX);

        this.setState({
            startX: undefined,
            endX: undefined
        });
    },

    render: function () {
        return (
            <section className="todo-list__item" data-id={this.props.num}
                     onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}
                     onTouchEnd={this.handleTouchEnd}>
                <div className="todo-list__text-and-delete">
                    <div className="todo-list__text js-todo-list__text js-todo-list__text_visible"
                         onClick={this.showEditForm}>{this.props.text}</div>
                    <button
                        className="todo-list__delete js-todo-list__delete todo-list__delete_hidden"
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

        const text = this.state.text.trim(),
            num = event.target.parentElement.getAttribute('data-id');

        if (!text) {
            return;
        }

        this.props.submitTodo({
            num: num,
            text: text
        }, event.target.classList);
        if (isAddForm(event.target.classList)) {
            this.setState({text: ''});
        }
    },

    render: function () {
        return (
            <form className={this.props.text ?
                "todo-list__form todo-list__form-edit js-todo-list__form-edit" +
                 " todo-list__form_hidden" :
                "todo-list__form todo-list__form-add js-todo-list__form-add" +
                 " todo-list__form_hidden"}
                  onSubmit={this.handleSubmit}>
                    <textarea className="todo-list__textarea js-todo-list__textarea" name="text"
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
