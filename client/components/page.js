import React from 'react';
import Header from './header';
import Reloader from './reloader';
import AddButton from './addButton';
import TodoList from './todoList';
import {ReloadTodos} from '../actions';
import {Component} from 'react';
import {ShowReloadTodos} from '../actions';

class Page extends Component {

    constructor(props) {
        super(props);
        this.startPoint = {};
        this.nowPoint = {};
        this.startTime = null;
        this.touchStarter = this.touchStarter.bind(this);
        this.touchEnder = this.touchEnder.bind(this);
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
            console.log("show");
            this.props.store.dispatch(ShowReloadTodos());
        }
    }

    componentDidMount () {
        document.addEventListener('touchstart', this.touchStarter, false);
        document.addEventListener('touchend', this.touchEnder, false);
    };

    render() {
        const {todos, selectedTodo, swipedTodo, reloadTodos} = this.props.store.getState();
        return (
            <div>
                <Reloader isReloader={reloadTodos} store={this.props.store} />
                    <TodoList todos={todos} selectedTodo={selectedTodo} swipedTodo={swipedTodo} store={this.props.store} />
                <AddButton store={this.props.store} />
            </div>
        )
    }
}
export default Page
//export default ({store}) => {
//
//    var startPoint={}; // начальная точка тача
//    var nowPoint; // текущая точка тача

    //document.addEventListener('touchstart', function(event) {
    //    startPoint.x = event.changedTouches[0].pageX;
    //    startPoint.y = event.changedTouches[0].pageY;
    //    console.log("h");
    //});
    //document.addEventListener('touchend', function(event) {
    //    event.stopPropagation();
    //    var shift = {}; // смещение после тача
    //    nowPoint = event.changedTouches[0];
    //
    //    shift.x = nowPoint.pageX - startPoint.x;
    //    shift.y = nowPoint.pageY - startPoint.y;
    //
    //    if(nowPoint.pageY > startPoint.y + 50) {
    //        store.dispatch(ReloadTodos());
    //    }
    //});
//    function onClick() {
//        console.log("j");
//    }
//
//    const {todos, selectedTodo, swipedTodo, reloadTodos} = store.getState();
//    return (
//        <div onClick={onClick}>
//            <Reloader reloadTodos={reloadTodos}/>
//                <TodoList todos={todos} selectedTodo={selectedTodo} swipedTodo={swipedTodo} store={store} />
//            <AddButton store={store} />
//        </div>
//    );
//};