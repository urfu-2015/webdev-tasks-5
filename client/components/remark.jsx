/**
 * Created by Надежда on 03.04.2016.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {selectRemark, chooseForDelete, updateRemark, cancelDelete, cancelUpdating} from '../actions.jsx';
import request from '../lib/request.jsx';
import RemarkForm from '../components/remarkForm.jsx';
import {modes} from '../reducer.jsx';
import DeleteButton from '../components/deleteButton.jsx';

var startPoint={};
var nowPoint;
var startTime;
var lastElementInLeft;

function touchStartHandler(store) {
    return function (event) {
        console.log('touch');
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
            let action = chooseForDelete(index, diff + 'px');
            store.dispatch(action);
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
            if (xAbs > 2*yAbs) {
                event.preventDefault();
                event.stopPropagation();
                if (startPoint.x < nowPoint.pageX) {
                    let action = cancelDelete();
                    store.dispatch(action);
                } else {
                    let action = chooseForDelete(index, '-10%');
                    store.dispatch(action);
                }
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
                /*let card = event.currentTarget;
                card.parentNode.querySelector('.redo-form_cancel').addEventListener('click', function (event) {
                    event.preventDefault();
                    let action = updateRemark(index);
                    store.dispatch(action);
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
                        let action = updateRemark(index, text);
                        store.dispatch(action);
                    }, 'text=' + encodeURIComponent(text));
                });*/
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
    let {selectedRemark, mode, diff, newText, indexUpdatedRemark} = store.getState();
    text = (newText !== undefined && index === indexUpdatedRemark) ? newText : text;
    console.log(text, newText, index, indexUpdatedRemark);
    let styleForRemark = defineStyleRemark(selectedRemark, index, mode, diff);
    let styleForTextArea = defineStyleTextBox(selectedRemark, index, mode);
    let styleForDeleteButton = defineStyleDeleteButton(selectedRemark, index, mode);
    let actions = {
        first: cancelUpdating,
        second: updateRemark
    };
    return (
        <li className="remarkContainer">
            <div className="remark" onTouchStart={touchStartHandler(store)}
                 onTouchMove={touchMoveEvent(store, index)}
                 onTouchEnd={touchEndHandler(store, index)}
                 style={styleForRemark}>{text}</div>
            <DeleteButton styleFor={styleForDeleteButton} store={store} index={index}
                          isDeleted={selectedRemark === index}/>
            <RemarkForm formClass="redo-form" nameForm="redo" styleFor={styleForTextArea}
                        text={text} path={'/remarks/' + index} method="PUT" store={store} actions={actions} />
        </li>
        )
    };

//{text, formClass, nameForm, styleFor, path, action, method, store}
export default Remark;
