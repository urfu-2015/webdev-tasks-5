/**
 * Created by Надежда on 03.04.2016.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {selectRemark, chooseForDelete, updateRemark} from '../actions.jsx';
import request from '../lib/request.jsx';
import RemarkForm from '../components/remarkForm.jsx';
import {modes} from '../reducer.jsx';

var startPoint={};
var nowPoint;
var startTime;
var lastElementInLeft;

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function touchStartHandler(store) {
    return function (event) {
        console.log('touch');
        //event.preventDefault();
        //event.stopPropagation();
        /*if (lastElementInLeft != undefined) {
            lastElementInLeft.setAttribute('style', 'transform: translateX(0px)')
        }*/
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        startTime = new Date();
    }
}

function touchMoveEvent(store, index) {
    return function (event) {
        nowPoint = event.changedTouches[0];
        var diff = nowPoint.pageX - startPoint.x;

        if (Math.abs(diff) > 20) {
            lastElementInLeft = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();
            console.log(nowPoint.pageX, startPoint.x);
            //var but = document.querySelector('.delButton');
            let action = chooseForDelete(index, diff + 'px');
            store.dispatch(action);
            //event.currentTarget.setAttribute('style', 'transform: translateX(' + dif + 'px)');
            /*if(dif < 0) {
             var but = document.querySelector('.delButton');
             document.querySelector('.index').removeChild(but);
             insertAfter(but, elem);
             but.setAttribute('style', 'display: inline');
             elem.setAttribute('style', 'transform: translateX(' + dif + 'px)');
             } else {
             var but = document.querySelector('.delButton');
             but.setAttribute('style', 'display: none');
             elem.setAttribute('style', 'transform: translateX(' + 0 + 'px)');
             }*/
            //startPoint = {x: nowPoint.pageX, y: nowPoint.pageY};
        }
    }
}

function touchEndHandler(store, index) {
    return function (event) {
        var endTime = new Date();
        nowPoint = event.changedTouches[0];
        var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
        var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
        //swipes
        if ((xAbs > 10 || yAbs > 10) && (endTime.getTime() - startTime.getTime()) > 200) {
            //по горизонтали
            if (xAbs > yAbs) {
                event.preventDefault();
                event.stopPropagation();
                if (startPoint.x < nowPoint.pageX) {
                    let action = chooseForDelete(index, '0');
                    store.dispatch(action);
                    //event.currentTarget.setAttribute('style', 'transform: translateX(0)');
                } else {
                    console.log('here1');
                    let action = chooseForDelete(index, '-10%');
                    store.dispatch(action);
                    //event.currentTarget.setAttribute('style', 'transform: translateX(-10%);');
                }
                //вертикаль
            } else {
                /*if (startPoint.y < nowPoint.pageY) {
                 console.log('here');
                 }*/
            }
        } else {
            //tap
            if ((endTime.getTime() - startTime.getTime()) < 200) {
                event.preventDefault();
                event.stopPropagation();
                //определяем
                var styleCurrentCard = event.currentTarget.getAttribute('style') || '';
                if (styleCurrentCard.match(/transform: translateX([^0]px)/)) {
                    console.log('в стороне');
                    return;
                }
                let action = selectRemark(index);
                store.dispatch(action);
                //document.querySelector('.new-remark').setAttribute('style', 'display: none;');
                //var myclick = event.targetTouches[0];
                //var main = document.querySelector('.main');
                let card = event.currentTarget;
                //card.setAttribute('style', 'display:none;');
                //store.dispatch(selectRemark());
                //проверяем, есть ли где-то открытая форма
                //let redo = document.querySelector('.redo-form');
                //let redoTextArea = redo.querySelector('textarea.redo_text');
                //let text = redoTextArea ? redoTextArea.value : '';
                //если есть, то прячем ее
                //if (redo != undefined) {
                //    redo.setAttribute('style', 'display:none;');
                //}
                //renderRemark(redo.parentNode, text, store);
                //let text = event.currentTarget.innerHTML;
                //renderRedo(event.currentTarget.parentNode, text, 'redo', 'redo');
                //card.parentNode.querySelector('.redo-form_text').innerHTML = card.innerHTML;
                //card.parentNode.querySelector('.redo-form').setAttribute('style', 'display:block;');
                //redo.querySelector('.redo_text').innerHTML = card.innerHTML;
                //insertAfter(redo, card);
                //отмена
                card.parentNode.querySelector('.redo-form_cancel').addEventListener('click', function (event) {
                    event.preventDefault();
                    let action = updateRemark(index);
                    store.dispatch(action);
                    //card.parentNode.querySelector('.redo-form').setAttribute('style', 'display: none;');
                    //card.setAttribute('style', 'display:block;');
                    //document.querySelector('.new-remark').setAttribute('style', 'display: block;');
                });

                //отправка изменения
                card.parentNode.querySelector('.redo-form_send').addEventListener('click', function (event) {
                    event.preventDefault();
                    var text = card.parentNode.querySelector('textarea.redo-form_text').value;
                    request('PUT', '/remarks/' + index, function (err, data) {
                        if (err != undefined) {
                            console.error(err);
                            return;
                        }
                        //let main = document.querySelector('.main');
                        //card.innerHTML = text;
                        let action = updateRemark(index, text);
                        store.dispatch(action);
                        //card.setAttribute('style', 'display:block;');
                        //card.parentNode.querySelector('.redo-form').setAttribute('style', 'display: none;');
                        //document.querySelector('.new-remark').setAttribute('style', 'display: block;');
                    }, 'text=' + encodeURIComponent(text));
                });
            } else {
                //long tap
            }
        }
    }
}

function defineStyleRemark(selected, current, mode, diff) {
    let result = {};
    if (selected === current) {
        switch (mode) {
            case modes.delete:
                console.log(diff);
                result['display'] = 'block';
                result['transform'] = 'translateX(' + diff + ')';
                break;
            case modes.redo:
                result['display'] = 'none';
                break;
            case modes.nan:
            default:
                result['display'] = 'block';
                result['transform'] = 'translateX(0)';
        }
    } else {
        result['display'] = 'block';
        result['transform'] = 'translateX(0)';
    }
    return result;
}

function defineStyleTextBox(selected, current, mode) {
    let result = {};
    if (selected === current && mode === modes.redo) {
        result['display'] = 'block';
    } else {
        result['display'] = 'none';
    }
    return result;
}

function defineStyleDeleteButton(selected, current, mode) {
    let result = {};
    if (selected === current && mode === modes.delete) {
        result['display'] = 'block';
    } else {
        result['display'] = 'none';
    }
    return result;
}

const Remark = ({text, store, index}) => {
    //store.subscribe(renderRedo);
    //store.subscribe(renderRemark);
    let {selectedRemark, mode, diff, newText, indexUpdatedRemark} = store.getState();
    text = (newText != undefined && index === indexUpdatedRemark) ? newText : text;
    //console.log(selectedRemark, index, text, newText, indexUpdatedRemark);
    let styleForRemark = defineStyleRemark(selectedRemark, index, mode, diff);
    let styleForTextArea = defineStyleTextBox(selectedRemark, index, mode);
    let styleForDeleteButton = defineStyleDeleteButton(selectedRemark, index, mode);
    //console.log(styleForRemark, styleForTextArea);
    return (
        <li className="remarkContainer">
            <div className="remark" onTouchStart={touchStartHandler(store)}
                 onTouchMove={touchMoveEvent(store, index)}
                 onTouchEnd={touchEndHandler(store, index)}
                 style={styleForRemark}>{text}</div>
            <RemarkForm formClass="redo-form" nameForm="redo" styleFor={styleForTextArea} text={text}/>
        </li>
        )
    };


//<ReloadPicture styleFor={styleForDeleteButton} />
export default Remark;