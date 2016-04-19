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
const lengthDeleteButton = 82;

function touchStartHandler(store) {
    return function (event) {
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        startTime = new Date();
    }
}

function touchMoveEvent(store, index) {
    return function (event) {
        nowPoint = event.changedTouches[0];
        let diff = nowPoint.pageX - startPoint.x;
        let yAbs = Math.abs(startPoint.y - nowPoint.pageY);
        if (diff < 20 && yAbs < 30 && diff > lengthDeleteButton) {
            lastElementInLeft = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();
            let action = chooseForDelete(index, diff + 'px');
            store.dispatch(action);
        }
    }
}

function touchEndHandler(store, index) {
    return function (event) {
        let endTime = new Date();
        nowPoint = event.changedTouches[0];
        let xAbs = Math.abs(startPoint.x - nowPoint.pageX);
        let yAbs = Math.abs(startPoint.y - nowPoint.pageY);
        //swipess
        if ((xAbs > 10 || yAbs > 10) && (endTime.getTime() - startTime.getTime()) > 100) {
            //по горизонтали
            if (xAbs > 20 && yAbs < 30) {
                event.preventDefault();
                event.stopPropagation();
                if (startPoint.x < nowPoint.pageX) {
                    let action = cancelDelete();
                    store.dispatch(action);
                } else {
                    let action = chooseForDelete(index, '0');
                    store.dispatch(action);
                }
            }
        } else {
            //tap
            if ((xAbs < 2 && yAbs < 2 && (endTime.getTime() - startTime.getTime()) < 200)) {
                event.preventDefault();
                event.stopPropagation();
                let action = selectRemark(index);
                store.dispatch(action);
            } else {
                //long tap
            }
        }
    }
}


function defineClassRemark(selected, current, mode) {
    if (selected === current) {
        switch (mode) {
            case modes.delete:
                return 'remark_delete remark';
            case modes.redo:
                return 'remark_hidden remark';
            case modes.nan:
            default:
                return 'remark_visible remark';
        }
    } else {
        return 'remark_visible remark';
    }
}

function defineClassForm(selected, current, mode, nameForm) {
    if (selected === current && mode === modes.redo) {
        return nameForm + '_visible';
    } else {
        return nameForm + '_hidden';
    }
}

function defineClassDeleteButton(selected, current, mode) {
    if (selected === current && mode === modes.delete) {
        return 'delButton_visible';
    } else {
        return 'delButton_hidden';
    }
}

const Remark = ({text, store, index}) => {
    let {selectedRemark, mode, diff, newText, indexUpdatedRemark} = store.getState();
    text = (newText !== undefined && index === indexUpdatedRemark) ? newText : text;
    let classForForm = defineClassForm(selectedRemark, index, mode, 'redo-form');
    let classForRemark = defineClassRemark(selectedRemark, index, mode);
    let classForDeleteButton = defineClassDeleteButton(selectedRemark, index, mode);
    let actions = {
        first: cancelUpdating,
        second: updateRemark
    };
    return (
        <li className="remarkContainer">
            <div className="remarkContainer_card">
                <div onTouchStart={touchStartHandler(store)}
                     onTouchMove={touchMoveEvent(store, index)}
                     onTouchEnd={touchEndHandler(store, index)}
                     className={classForRemark}>{text}</div>
                <DeleteButton store={store} index={index}
                              isDeleted={selectedRemark === index} formClass="remark"
                              visibilityClass={classForDeleteButton}/>
            </div>
            <RemarkForm formClass="redo-form" nameForm="redo" visibilityClass={classForForm}
                        text={text} path={'/remarks/' + index} method="PUT" store={store} actions={actions} />
        </li>
        )
    };

export default Remark;
