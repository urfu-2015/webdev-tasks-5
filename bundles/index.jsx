var xhr = require('./xhr.js');

var React = require('react');
var ReactDOM = require('react-dom');

var assign = Object.assign || function (obj1, obj2) {
        var obj3 = {},
            attrname;
        for (attrname in obj1) {
            if (obj1.hasOwnProperty(attrname)) {
                obj3[attrname] = obj1[attrname];
            }
        }
        for (attrname in obj2) {
            if (obj2.hasOwnProperty(attrname)) {
                obj3[attrname] = obj2[attrname];
            }
        }
        return obj3;
    };

var TodoListItemComponent = React.createClass({

    getInitialState: function () {
        return {
            text: this.props.todo.text
        };
    },

    startEditing: function () {
        this.props.onStartEditing(this.props.todo._id);
    },

    stopEditing: function () {
        this.props.onStopEditing(this.props.todo._id);
    },

    onChangeHandler: function (event) {
        this.setState({text: event.target.value})
    },

    handleBlur: function (event) {
        this.stopEditing();
        var newText = event.target.value;
        if (this.props.todo._id === 'newTodo') {
            this.props.onAdding(newText);
        } else {
            if (newText !== '') {
                xhr.update({_id: this.props.todo._id, text: newText}, function (data) {
                    this.setState({text: data.text});
                }.bind(this));
            } else {
                this.setState({text: this.props.todo.text});
            }
        }
    },

    handleSwipeRight: function () {
        xhr.delete({_id: this.props.todo._id, text: this.props.todo.text}, function () {
            this.props.remove();
        }.bind(this));
    },

    eventObj: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        timeout: null,
        liStartX: 0,
        liStartY: 0,
        liTouchStartX: 0,
        liTouchStartY: 0
    },

    handleTouchMove: function (e) {
        var touch = e.changedTouches[0];
        this.eventObj.endX = touch.pageX;
        this.eventObj.endY = touch.pageY;

        var offset = this.eventObj.endX - this.eventObj.startX;
        this.props.onElementDragLeft(this.props.id, offset);
    },

    handleTouchStart: function (e) {
        var touch = e.targetTouches[0];
        this.eventObj.startX = touch.pageX;
        this.eventObj.startY = touch.pageY;
    },

    handleTouchLiStart: function (e) {
        var touch = e.targetTouches[0];
        this.eventObj.liStartX = e.target.offsetLeft - touch.pageX;
        this.eventObj.liStartY = e.target.offsetTop - touch.pageY;
        this.eventObj.timeout = setTimeout(function () {
            this.props.onElementSetDrag(this.props.id,
                this.eventObj.liStartX + touch.pageX, this.eventObj.liStartY + touch.pageY);
        }.bind(this), 1000);
    },

    handleTouchLiMove: function (e) {
        clearTimeout(this.eventObj.timeout);
        if (this.props.dragging) {
            var touch = e.targetTouches[0];
            var liTouchX = touch.pageX;
            var liTouchY = touch.pageY;
            this.props.onElementSetDrag(this.props.id,
                this.eventObj.liStartX + liTouchX,
                this.eventObj.liStartY + liTouchY);
            e.preventDefault();
        }
    },

    handleTouchLiEnd: function () {
        if (this.props.dragging) {
            this.props.onElementSetDrag();
        }
        clearTimeout(this.eventObj.timeout);
    },

    handleTouchEnd: function (e) {
        var touch = e.changedTouches[0];
        this.eventObj.endX = touch.pageX;
        this.eventObj.endY = touch.pageY;

        if (this.eventObj.startX - this.eventObj.endX === 0 &&
            this.eventObj.startY - this.eventObj.endY === 0) {
            this.startEditing();
        }
        if (this.eventObj.startX - this.eventObj.endX > 130 &&
            Math.abs(this.eventObj.startY - this.eventObj.endY) < 15) {
            this.handleSwipeRight(this.props.id);
        } else {
            this.props.onElementDragLeft();
        }
    },

    render: function () {

        var inputStyles = {};
        var viewStyles = {};

        if (this.props.editing) {
            viewStyles.display = "none";
        } else {
            inputStyles.display = "none";
        }

        return (
            <li id={this.props.id}
                onTouchStart={this.handleTouchLiStart}
                onTouchEnd={this.handleTouchLiEnd}
                onTouchMove={this.handleTouchLiMove}
                className={this.props.dragging ? 'dragging' : ''}
                style={assign({left: this.props.left, top: this.props.top}, this.props.style)}>
                <div className='view' style={viewStyles}
                     onTouchStart={this.handleTouchStart}
                     onTouchMove={this.handleTouchMove}
                     onTouchEnd={this.handleTouchEnd}>
                    {this.state.text}
                </div>
                <input className='edit' type='text'
                       ref={function(input) { if (input != null) {input.focus();}}}
                       onBlur={this.handleBlur}
                       style={inputStyles}
                       value={this.state.text}
                       onChange={this.onChangeHandler}
                />
            </li>
        );
    }
});

var TodoList = React.createClass({

    getInitialState: function () {
        return {
            todos: [],
            editingTodoId: null,
            loadingVisible: true,
            dragging: false,
            draggingElement: {},
            leftDraggingElement: {}
        };
    },

    componentDidMount: function () {
        this.handleUpdate();
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchend', this.handleTouchEnd);
        document.addEventListener('touchmove', this.handleTouchMove);
    },

    setEditingModelId: function (TodoId) {
        this.setState({editingTodoId: TodoId});
    },

    unsetEditingModelId: function (TodoId) {
        if (TodoId === this.state.editingTodoId) {
            this.setState({editingTodoId: null});
        }
    },

    eventObj: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    },

    handleTouchStart: function (event) {
        var touch = event.targetTouches[0];
        this.eventObj.startX = touch.pageX;
        this.eventObj.startY = touch.pageY;
    },

    handleTouchMove: function (e) {
        e.preventDefault();
    },

    handleTouchEnd: function (e) {
        var touch = e.changedTouches[0];
        this.eventObj.endX = touch.pageX;
        this.eventObj.endY = touch.pageY;

        if (!this.state.dragging) {
            if (this.eventObj.startY - this.eventObj.endY > -200 &&
                this.eventObj.startY - this.eventObj.endY < -50 &&
                Math.abs(this.eventObj.startX - this.eventObj.endX) < 25) {
                this.handleAddEmptyObject();
            }

            if (this.eventObj.startY - this.eventObj.endY < -200 &&
                Math.abs(this.eventObj.startX - this.eventObj.endX) < 25) {
                this.handleUpdate();
            }
        }
    },

    handleAddEmptyObject: function () {
        this.state.todos.unshift({_id: 'newTodo'});
        this.setState({todos: this.state.todos});
    },

    handleAdd: function (text) {
        if (text === '') {
            this.state.todos.shift();
            this.setState({todos: this.state.todos});
            return;
        }
        var added = {
            text: text,
            prev: null,
            next: this.state.todos[1] ? this.state.todos[1]._id : null
        };

        xhr.add(added, function (data) {
            this.state.todos[0] = data;
            if (this.state.todos[1]) {
                this.state.todos[1].prev = data._id;
            }
            this.setState({todos: this.state.todos});
        }.bind(this));
    },

    handleUpdate: function () {
        this.state.loadingVisible = true;
        this.setState(this.state);

        xhr.getAll(function (data) {
            this.setState({todos: data});
            setTimeout(function () {
                this.state.loadingVisible = false;
                this.setState(this.state)
            }.bind(this), 1000);
        }.bind(this));
    },

    handleRemove: function (i) {
        var newItems = this.state.todos.slice();

        if (newItems[i - 1]) {
            newItems[i - 1].next = newItems[i].next;
        }
        if (newItems[i + 1]) {
            newItems[i + 1].prev = newItems[i].prev;
        }

        newItems.splice(i, 1);
        this.setState({todos: newItems, leftDraggingElement: {}});

        this.state.todos.length === 0 ? document.body.style.position = 'relative' :
            document.body.style.position = 'static';
    },

    handleElementSetDrag: function (key, left, top) {
        var overKey = this.state.draggingElement.overKey;
        if (key) {
            this.setState({dragging: true});
            var height = 80; // высота строки
            var overNumber = Math.floor(top / height);
            if (overNumber >= this.state.todos.length) {
                overNumber = this.state.todos.length - 1;
            } else if (overNumber < 0) {
                overNumber = -1;
            }
            overKey = overNumber === -1 ? -1 : this.state.todos[overNumber]._id;
            this.state.draggingElement = {key: key, overKey: overKey, left: left, top: top};
            this.setState(this.state);
        } else {
            this.setState({dragging: false});
            if (overKey === this.state.draggingElement.key) {
                this.setState({draggingElement: {}});
            } else {
                xhr.reorder({
                    moveId: this.state.draggingElement.key,
                    overId: overKey
                }, function (data) {
                    this.setState({todos: data, draggingElement: {}});
                }.bind(this));
            }
        }
    },

    handleElementDragLeft: function (id, offset) {
        this.setState({leftDraggingElement: {id: id, offset: offset}});
    },

    render: function () {
        var todoNodes = this.state.todos.map(function (todo, i) {
            return ([
                this.state.draggingElement.overKey === -1 && i === 0 ?
                    (<li key="empty-li" className="empty-li"/>) : undefined,
                <TodoListItemComponent
                    key={todo._id}
                    id={todo._id}
                    text={todo.text || ''}
                    prev={todo.prev || null}
                    next={todo.next || null}
                    todo={todo}
                    remove={this.handleRemove.bind(this, i)}
                    editing={todo._id !== 'newTodo' ? this.state.editingTodoId === todo._id : true}
                    onStartEditing={this.setEditingModelId}
                    onStopEditing={this.unsetEditingModelId}
                    onAdding={this.handleAdd}
                    onElementSetDrag={this.handleElementSetDrag}
                    dragging={this.state.draggingElement.key === todo._id}
                    left={this.state.draggingElement.left}
                    top={this.state.draggingElement.top}
                    onElementDragLeft={this.handleElementDragLeft}
                    style={todo._id === this.state.leftDraggingElement.id
                    && this.state.leftDraggingElement.offset < 0 ?
                    {marginLeft: this.state.leftDraggingElement.offset + 'px'} : undefined}
                />,
                this.state.draggingElement.overKey === todo._id ?
                    (<li key="empty-li" className="empty-li"/>) : undefined

            ]);
        }, this);

        return (
            <div className='todo-list-container'>
                <div className={this.state.loadingVisible ? 'grid-row' : 'grid-row hidden'}>
                    <div className="col">
                        <ul className="loading">
                            <li className={this.state.loadingVisible ? '' : 'li-hidden'}/>
                            <li className={this.state.loadingVisible ? '' : 'li-hidden'}/>
                            <li className={this.state.loadingVisible ? '' : 'li-hidden'}/>
                        </ul>
                    </div>
                </div>
                <ul className='todo-list'>
                    {todoNodes}
                </ul>
            </div>
        );
    }
});

ReactDOM.render(
    <TodoList />,
    document.getElementById('main')
);