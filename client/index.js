'use strict';

require('./style.styl');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Wrapper from './blocks/main';
import Item from './blocks/item';
import {getNotes, addNote, deleteNote, callSaveForm, resetSaveForm, changeNote, changeOrder} from './actions';
import {noteApp} from './reducer';

import {swipeLeft, swipeDown} from './actions/swipe';
import {resetDel, createDel, handlerDelete, moveDel} from './actions/del-item';
import {renderSave, resetSave} from './actions/save-item';
import {initShift, shift, finishShift} from './actions/replace';
import {resetTransform, setTransformX, setTransformY} from './actions/transforms';
import {shiftUpdater, resetUpdater, startRotate} from './actions/updater';

import {update, updateOrder, create} from './client-request';

const store = createStore(noteApp);


function render() {
    ReactDom.render(
        <Wrapper store={store} />,
        document.querySelector('.wrapper')
    );
}

var lastEvent;
var direction = 'x';

update(store);
store.subscribe(render);

document.querySelector('.add').addEventListener('submit', event => {
    event.preventDefault();

    var note = document.querySelector('#input_text').value;
    if (!note) return;

    create(store, note);
}, false);

var startPoint;
var finalPoint;
var longTouch;

function replace() {
    if (startPoint.target.closest('.container__del') || document.querySelector('.save')) return;

    direction = 'y';
    initShift(startPoint.target.closest('.container__item'));
}

document.querySelector('.delete').addEventListener('touchstart', handlerDelete, false);
document.querySelector('.delete').addEventListener('orientationchange', moveDel, false);

document.addEventListener('touchstart', event => {
    if (event.targetTouches.length === 1) {
        let touch = event.targetTouches[0];
        startPoint = touch;
        direction = 'x';

        resetSave(touch, store);

        if (!touch.target.closest('.delete')) {
            resetDel();
        }

        if (finalPoint && !touch.target.closest('.delete')) {
            resetTransform(finalPoint.target.closest('.container__item'));
        }

        longTouch = setTimeout(replace, 500);

        lastEvent = 'touchstart';
    }
}, false);

var countMove = 0;

document.addEventListener('touchmove', event => {
    clearTimeout(longTouch);
    if (document.querySelector('.save')) return;

    if (event.targetTouches.length == 1 && countMove > 5) {
        lastEvent = 'touchmove';
        var touch = event.targetTouches[0];
        var touchTarget = touch.target;

        var item = touchTarget.closest('.container__item');

        var absX = Math.abs(touch.pageX - startPoint.pageX);
        var absY = Math.abs(touch.pageY - startPoint.pageY);
        finalPoint = touch;

        if (absY > absX && direction === 'x' && touch.pageY < document.documentElement.clientHeight) {
            shiftUpdater(absY);
        }

        if (!item) return;

        if (absX < item.offsetWidth * 0.2 && direction === 'x') {
            setTransformX(item, touch.pageX - startPoint.pageX);
        }

        if (direction === 'y') {
            event.preventDefault();
            setTransformY(item, touch.pageY - startPoint.pageY);
            shift(touch);
        }
    }
    countMove += 1;
}, false);

document.addEventListener('touchend', event => {
    clearTimeout(longTouch);
    let target = event.changedTouches[0].target;
    countMove = 0;

    if (event.changedTouches.length == 1 && lastEvent === 'touchstart' && direction === 'x' &&
        (target.className === 'container__item' || target.className === 'container__item_text')) {
        renderSave(target, store);
        event.preventDefault();
        return;
    }

    if (event.changedTouches.length === 1 && lastEvent === 'touchmove' && direction === 'x') {
        if (target.closest('.container__item') &&
            startPoint.pageX - finalPoint.pageX > target.closest('.container__item').offsetWidth * 0.2) {
            swipeLeft(target.closest('.container__item'));
            createDel(target.closest('.container__item'), store);
        } else {
            if (!target.closest('.delete')) {
                resetTransform(finalPoint.target.closest('.container__item'));
            }
            if (finalPoint.pageY - startPoint.pageY >= 50) {
                swipeDown(store, finalPoint);
                startRotate();
            } else {
                resetUpdater();
            }
        }

        return;
    }

    if (event.changedTouches.length == 1 && lastEvent === 'touchmove' && direction === 'y') {
        finishShift(store);

        updateOrder(store);
    }

    direction = 'x';
}, false);
