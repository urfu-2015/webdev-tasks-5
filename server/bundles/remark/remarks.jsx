/**
 * Created by Надежда on 03.04.2016.
 */

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux'
import {newRemark, addRemark, changeOrder,
    chooseForDelete, deleteRemark, firstLoadRemarks,
    reloadRemarks, selectRemark, updateRemark} from '../../../client/actions.jsx';
import {remarkApp} from '../../../client/reducer.jsx';
import Remarks from '../../../client/components/remarks.jsx';
import request from '../../../client/lib/request.jsx';


function render() {
    ReactDom.render(
        <Remarks store={store} />,
        document.getElementById('root')
    );
}

//const store = applyMiddleware(thunk)(createStore)(remarkApp);
const store = createStore(remarkApp);
render();
store.subscribe(render);


request('GET', '/api/remarks', (err, result) => {
    if (err != undefined) {
        console.log(err);
    } else {
        store.dispatch(firstLoadRemarks(result.data));
        //render();
    }
});

let newRemarkButton = document.querySelector('.new-remark');

//нажали на кнопку создания новой заметки
newRemarkButton.addEventListener('click', function (event){
    event.preventDefault();
    document.querySelector('.creating').setAttribute('style', 'display: block;');
    newRemarkButton.setAttribute('style', 'display: none;');
});

//отмена создания
document.querySelector('.redo-form_cancel').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.creating').setAttribute('style', 'display: none;');
    newRemarkButton.setAttribute('style', 'display: block;');
});

//отправка заметки и ее сохрание
document.querySelector('.redo-form_send').addEventListener('click', function (event) {
    event.preventDefault();
    let text = event.currentTarget.parentNode.querySelector('.redo-form_text').value;
    request('POST', '/remarks/new', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        let main = document.querySelector('.main');
        let card = document.createElement('div');
        card.classList.add('remark');
        card.innerHTML = text;
        main.querySelector('.creating').setAttribute('style', 'display: none;');
        main.removeChild(newRemarkButton);
        newRemarkButton.setAttribute('style', 'display: block;');
            main.appendChild(card);
        main.appendChild(newRemarkButton);
    }, 'text=' + encodeURIComponent(text));
});



function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//для Pull to Refresh
let startPointDoc = {};
let startTimeDoc;
document.addEventListener('touchstart', function (event) {
    startTimeDoc = new Date();
    startPointDoc.x = event.changedTouches[0].pageX;
    startPointDoc.y = event.changedTouches[0].pageY;
});

document.addEventListener('touchmove', function (event) {

});

document.addEventListener('touchend', function (event) {
    let nowPoint = event.changedTouches[0];
    let xAbs = Math.abs(startPointDoc.x - nowPoint.pageX);
    let yAbs = Math.abs(startPointDoc.y - nowPoint.pageY);
    let endTime = new Date();
    console.log(startPointDoc.x, nowPoint.pageX);
    if ((yAbs > 10) && (endTime.getTime()-startTimeDoc.getTime()) > 200) {
        if (nowPoint.pageY > startPointDoc.y) {
            console.log('refresh');
            event.preventDefault();
            event.stopPropagation();
            //let action = reloadRemarks();
            //store.dispatch(action);
            request('GET', '/api/remarks', (err, result) => {
                if (err != undefined) {
                    console.log(err);
                } else {
                    store.dispatch(firstLoadRemarks(result.data));
                    //render();
                }
            });
        }
    }
});
