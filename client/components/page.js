import React from 'react';
import Header from './header';
import Reloader from './reloader';
import AddButton from './addButton';
import TodoList from './todoList';
import {ReloadTodos} from '../actions';
import {Component} from 'react';
import {ShowReloadTodos, MoveReload} from '../actions';

class Page extends Component {

    constructor(props) {
        super(props);
        this.startPoint = {};
        this.nowPoint = {};
        this.startTime = null;
        this.touchStarter = this.touchStarter.bind(this);
        this.touchEnder = this.touchEnder.bind(this);
        this.touchMover = this.touchMover.bind(this);
    }

    touchStarter (event) {
        event.stopPropagation();
        this.startPoint = {};
        this.startPoint.x = event.changedTouches[0].pageX;
        this.startPoint.y = event.changedTouches[0].pageY;
        this.startTime = new Date();
    }

    touchEnder (event) {
        event.stopPropagation();
        var shift = {}; // смещение после тача
        var nowPoint = event.changedTouches[0];
        shift.x = nowPoint.pageX - this.startPoint.x;
        shift.y = nowPoint.pageY - this.startPoint.y;
        // Если свайп сверху вниз, обновляем страничку
        if(nowPoint.pageY > this.startPoint.y + 50) {
            this.props.store.dispatch(ShowReloadTodos());
        }
    }
    
    touchMover (event) {
        event.stopPropagation();
        this.movePoint = event.changedTouches[0];
        var shiftY = this.startPoint.y - this.movePoint.pageY;
        if (shiftY < 0) {
            this.props.store.dispatch(MoveReload(shiftY));
        }
    }

    componentDidMount () {
        document.addEventListener('touchstart', this.touchStarter, false);
        document.addEventListener('touchend', this.touchEnder, false);
        document.addEventListener('touchmove', this.touchMover, false);
    };

    render() {
        const {todos, selectedTodo, swipedTodo, reloadTodos, shiftX, shiftY} = this.props.store.getState();
        return (
            <div>
                <Reloader isReloader={reloadTodos} store={this.props.store} shiftY={shiftY}/>
                    <TodoList todos={todos} selectedTodo={selectedTodo} swipedTodo={swipedTodo} store={this.props.store} shiftX={shiftX}/>
                <AddButton store={this.props.store} />
            </div>
        )
    }
}
export default Page