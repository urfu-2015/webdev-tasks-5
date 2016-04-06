'use strict';
import React from 'react';
import {SelectTodo, DeleteTodo, ChangeTodo, ShowDeleteTodo, HideDeleteTodo} from '../actions';
import {Component} from 'react';


class todoElement extends Component {
    constructor(props) {
        super(props);
        this.getById = this.getById.bind(this);
        this.getClassByNumber = this.getClassByNumber.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.startPoint = {};
        this.nowPoint = null;
        this.startTime = null;
        this.textInputStyle = {
            resize: 'none'
        };
        this.deleteInlineStyle = null;
    }
    getById(id) {
        // возвращает элемент из document с данным id
        return document.getElementById(id);
    }
    getClassByNumber(className, number) {
        return document.getElementsByClassName(className)[number];
    }


    onTouchStart(event) {

        event.stopPropagation();

        this.startPoint.x = event.changedTouches[0].pageX;
        this.startPoint.y = event.changedTouches[0].pageY;

        this.startTime = new Date();

        if (event.targetTouches.length == 1) {
            // одиночный тач (по картинке корзины) - удаление
            var clickedElem = event.target;
            var idClickedElem = clickedElem.getAttribute('id');
            var idType = idClickedElem.substr(0, 3);
            if (idType == 'img' || idType == 'del') { // если тач по картинке или по блоку с картинкой
                var numberId = idClickedElem.slice(-1 * idClickedElem.length + 3); // берем все после первых 3 цифр
                this.props.store.dispatch(DeleteTodo(numberId));
            }
        }
    }

    onTouchEnd(event) {
        event.stopPropagation();
        var shift = {}; // смещение после тача
        this.nowPoint = event.changedTouches[0];

        shift.x = this.nowPoint.pageX - this.startPoint.x;
        shift.y = this.nowPoint.pageY - this.startPoint.y;

        var clickedElem = event.target;
        var listNumber = clickedElem.getAttribute('id').slice(4);

        // Если был ШортТач

        var endTime=new Date();
        if(event.changedTouches[0].pageX == this.startPoint.x &&
            event.changedTouches[0].pageY == this.startPoint.y &&
            (endTime.getTime()-this.startTime.getTime()) > 20) { // тач на месте - предлагаем изменить блок
            if (event.target.tagName !== 'INPUT') { // если тыкаем по диву, а не по форме

                this.props.store.dispatch(SelectTodo(listNumber));
                event.preventDefault();
            }
        }
        // Если свайп сверху вниз, обновляем страничку
        //if(nowPoint.pageY > startPoint.y + 50) {
        //    store.dispatch(HideDeleteTodo());
        //    var containerReloader = getClassByNumber('reloader', 0); // берем блок .reloader
        //    var div = document.createElement('div');
        //    div.className = 'container-reload';
        //    div.innerHTML = createReloadDiv();
        //    containerReloader.appendChild(div);
        //    setTimeout(getListTodo, 500);
        //}
        // Если свайп влево, показываем картинку удаления
        if(Math.abs(shift.x) > 20) {
            if(shift.x < 0 && Math.abs(shift.y) < 50){
                this.props.store.dispatch(ShowDeleteTodo(listNumber));
            }
            // Если свайп вправо, закрываем картинку
            if(shift.x > 0 && Math.abs(shift.y) < 50)
            {
                this.props.store.dispatch(HideDeleteTodo());
            }
        }
    }

    submitForm(event) {
        this.props.store.dispatch(ChangeTodo(this.props.id, document.getElementById("input-change-text-" + this.props.id).value));
        event.preventDefault();
        event.stopPropagation();
    }

    componentDidUpdate () {
        if(this.refs.myTextInput) {
            this.refs.myTextInput.value = this.refs.myTextInput.value;
        }
    }

    render () {
        const {id, value, isChange, isDelete, store} = this.props;
        if (isDelete) {
            this.deleteInlineStyle = {
                marginLeft : "0px",
                marginRight : "0px"
            };
        } else {
            this.deleteInlineStyle = {
                marginLeft : "30px",
                marginRight : "30px"
            };
        }
        return (
            <div className="container-flex" id={"list" + id} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                <div className="bluelight-list-item" id={"cont" + id} style={this.deleteInlineStyle}>
                    {isChange ?
                        <form className="changeForm" action="#1" method="POST" onSubmit={this.submitForm}>
                            <input ref="myTextInput" autoFocus={true} id={"input-change-text-" + id } type="text" style={this.textInputStyle} defaultValue={"" + value} />
                            <input type="submit" className="submit-change-btn" defaultValue="Изменить" />
                        </form> :
                        value
                    }
                </div>
                {isDelete ?
                    <div className="delete" id={"del"+id} onTouchStart={this.onTouchStart}>
                        <img id={"img"+id} src="trash.png" className="image-delete" />
                    </div>:
                    null
                }
            </div>
        );
    }
}
//export default ({id, value, isChange, isDelete, store}) => {
//    function getById(id) {
//        // возвращает элемент из document с данным id
//        return document.getElementById(id);
//    }
//    function getClassByNumber(className, number) {
//        return document.getElementsByClassName(className)[number];
//    }
//    function createReloadDiv() {
//        return `<div class="container-flex">
//                    <div class="reload-image">
//                        <img src="reload.png" class="image-reload">
//                    </div>
//                </div>`;
//    }
//
//    var startPoint={}; // начальная точка тача
//    var nowPoint; // текущая точка тача
//    var startTime; // время начала тача
//
//    function onTouchStart(event) {
//        //event.preventDefault();
//
//        event.stopPropagation();
//
//        startPoint.x = event.changedTouches[0].pageX;
//        startPoint.y = event.changedTouches[0].pageY;
//
//        startTime = new Date();
//
//        if (event.targetTouches.length == 1) {
//            // одиночный тач (по картинке корзины) - удаление
//            var clickedElem = event.target;
//            var idClickedElem = clickedElem.getAttribute('id');
//            var idType = idClickedElem.substr(0, 3);
//            if (idType == 'img' || idType == 'del') { // если тач по картинке или по блоку с картинкой
//                var numberId = idClickedElem.slice(-1 * idClickedElem.length + 3); // берем все после первых 3 цифр
//                store.dispatch(DeleteTodo(numberId));
//            }
//        }
//    }
//    function onTouchEnd(event) {
//        event.stopPropagation();
//        var shift = {}; // смещение после тача
//        nowPoint = event.changedTouches[0];
//
//        shift.x = nowPoint.pageX - startPoint.x;
//        shift.y = nowPoint.pageY - startPoint.y;
//
//        var clickedElem = event.target;
//        var listNumber = clickedElem.getAttribute('id').slice(4);
//
//        // Если был ШортТач
//
//        var endTime=new Date();
//        if(event.changedTouches[0].pageX == startPoint.x &&
//            event.changedTouches[0].pageY == startPoint.y &&
//            (endTime.getTime()-startTime.getTime()) > 20) { // тач на месте - предлагаем изменить блок
//            if (event.target.tagName !== 'INPUT') { // если тыкаем по диву, а не по форме
//
//                store.dispatch(SelectTodo(listNumber));
//                event.preventDefault();
//            }
//        }
//        // Если свайп сверху вниз, обновляем страничку
//        //if(nowPoint.pageY > startPoint.y + 50) {
//        //    store.dispatch(HideDeleteTodo());
//        //    var containerReloader = getClassByNumber('reloader', 0); // берем блок .reloader
//        //    var div = document.createElement('div');
//        //    div.className = 'container-reload';
//        //    div.innerHTML = createReloadDiv();
//        //    containerReloader.appendChild(div);
//        //    setTimeout(getListTodo, 500);
//        //}
//        // Если свайп влево, показываем картинку удаления
//        if(Math.abs(shift.x) > 20) {
//            if(shift.x < 0 && Math.abs(shift.y) < 50){
//                store.dispatch(ShowDeleteTodo(listNumber));
//            }
//            // Если свайп вправо, закрываем картинку
//            if(shift.x > 0 && Math.abs(shift.y) < 50)
//            {
//                store.dispatch(HideDeleteTodo());
//            }
//        }
//    }
//    if (isDelete) {
//        deleteInlineStyle = {
//            marginLeft : "0px",
//            marginRight : "0px"
//        };
//    } else {
//        deleteInlineStyle = {
//            marginLeft : "30px",
//            marginRight : "30px"
//        };
//    }
//
//    function submitForm(event) {
//        store.dispatch(ChangeTodo(id, document.getElementById("input-change-text-" + id).value));
//        event.preventDefault();
//        event.stopPropagation();
//    }
//    //function componentDidMount() {
//    //    console.log(this);
//    //}
//    window.addEventListener('onTouchStart', function () {
//        console.log("HOO");
//    });
//
//    return (
//        <div className="container-flex" id={"list" + id} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
//            <div className="bluelight-list-item" id={"cont" + id} style={deleteInlineStyle}>
//            {isChange ?
//                <form className="changeForm" action="/list-change" method="POST" onSubmit={submitForm}>
//                    <input ref="textInput" autoFocus={true} id={"input-change-text-" + id } type="text" style={textInputStyle} defaultValue={"" + value} />
//                    <input type="submit" className="submit-change-btn" defaultValue="Изменить" />
//                </form> :
//                value
//            }
//            </div>
//            {isDelete ?
//                <div className="delete" id={"del"+id} onTouchStart={onTouchStart}>
//                    <img id={"img"+id} src="trash.png" className="image-delete" />
//                </div>:
//                null
//            }
//        </div>
//    );
//};
export default todoElement