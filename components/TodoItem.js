import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false,

            swipedLeft: false,
            startMovingLeft: false,
            startMovingRight: false,
            moveOffset: 0
        };
        this.startPoint = {};
    }

    componentWillMount() {
        //React.initializeTouchEvents(true);
    }

    handleClick() {
        this.setState({editing: true})
    }

    handleSave(id, text) {
        if (text.length === 0) {
            this.props.deleteTodo(id)
        } else {
            this.props.editTodo(id, text)
        }
        this.setState({editing: false})
    }

    handleTouchStart(event) {
        // TODO: Tap по корзине, а не swipe
        // console.log(event.currentTarget);
        // console.log(event.target);
        //event.stopPropagation();
        // Если в состоянии сдвига попали на корзину -> удаляем
        // Проблема в том, что слой корзины лежит ниже самого TodoItem
        if (this.state.moveOffset === -100) {
            if (event.target.className === 'todo') {
                this.props.deleteTodo(this.props.todo.id);
            }
        }
        this.startPoint.x = event.changedTouches[0].pageX;
        this.startPoint.y = event.changedTouches[0].pageY;
    }

    handleTouchMove(event) {
        //event.stopPropagation();
        let nowPoint = event.changedTouches[0];
        var offset = {
            x: [nowPoint.pageX - this.startPoint.x],
            y: [nowPoint.pageY - this.startPoint.y]
        };
        if (Math.abs(offset.x) > 10) {
            if (offset.x < 0) {
                if (!this.state.startMovingRight) {
                    this.setState({startMovingLeft: true});
                    if (Math.abs(offset.x) >= 100) {
                        this.setState({moveOffset: -100});
                    } else {
                        this.setState({moveOffset: [parseInt(0, 10) + parseInt(offset.x, 10)]});
                    }
                }
            }
            if (offset.x > 0) {
                //console.log(this.state.moveOffset, offset.x);
                if (!this.state.startMovingLeft && this.state.swipedLeft) {
                    this.setState({startMovingRight: true});
                    if (Math.abs(offset.x) >= 100) {
                        this.setState({moveOffset: 0});
                    } else {
                        this.setState({moveOffset: [parseInt(-100, 10) + parseInt(offset.x, 10)]});
                    }
                }
            }
        }
    }

    handleTouchEnd(event) {
        //event.stopPropagation();
        //clearTimeout(editFormTimer);
        if (this.state.startMovingLeft) {
            this.setState({
                startMovingLeft: false,
                moveOffset: -100,
                swipedLeft: true
            });
        }
        if (this.state.startMovingRight) {
            this.setState({
                startMovingRight: false,
                moveOffset: 0,
                swipedLeft: false
            });
        }
    }

    render() {
        const {todo, deleteTodo} = this.props;

        let element;
        let todoTextId = `todo__text-${todo.id}`;
        let imgId = `todo__trashbox-${todo.id}`;
        let itemId = `todo__item-${todo.id}`;
        let todoId = `todo-${todo.id}`;

        var todoItemClass = classnames({
            'todo__item': true
        });
        var todoTextClass = classnames({
            'todo__text': true
        });
        if (this.state.editing) {
            element = (
                <p id={todoTextId} className={todoTextClass}>
                    <TodoTextInput
                        text={todo.text}
                        editing={this.state.editing}
                        onSave={(text) => this.handleSave(todo.id, text)}
                        todoId={todoId}
                    />
                </p>
            )
        } else {
            element = (
                <p id={todoTextId} className={todoTextClass} onClick={this.handleClick.bind(this)}>
                    {todo.text}
                </p>
            )
        }
        return (
            <div className="todo" id={todoId}
                 onTouchStart={this.handleTouchStart.bind(this)}
                 onTouchMove={this.handleTouchMove.bind(this)}
                 onTouchEnd={this.handleTouchEnd.bind(this)}
            >
                <img id={imgId} className="todo__trashbox" src="/static/trashbox.png"/>
                <article
                    style={{transform: ' translate(' + this.state.moveOffset + 'px)'}}
                    id={itemId} className={todoItemClass}>
                    {element}
                </article>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoItem
