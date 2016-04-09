/**
 * Created by Надежда on 03.04.2016.
 */
import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Remark from './remark.jsx';
import CreatingButton from './creatingButton.jsx';
import RemarkForm from './remarkForm.jsx';
import ReloadPicture from './reloadPicture.jsx';
import {modes} from '../reducer.jsx';
import request from '../lib/request.jsx';
import {firstLoadRemarks, startReload} from  '../actions.jsx';

//для Pull to Refresh
let startPointDoc = {};
let startTimeDoc;
function touchStartHandler(store) {
    return function (event) {
        startTimeDoc = new Date();
        startPointDoc.x = event.changedTouches[0].pageX;
        startPointDoc.y = event.changedTouches[0].pageY;
    }
}

function touchMoveHandler(store) {
    return function (event) {
        let nowPoint = event.changedTouches[0];
        let xAbs = Math.abs(startPointDoc.x - nowPoint.pageX);
        let yAbs = Math.abs(startPointDoc.y - nowPoint.pageY);
        let endTime = new Date();
        if ((yAbs > 10) && (endTime.getTime()-startTimeDoc.getTime()) > 200) {
            if (nowPoint.pageY > startPointDoc.y) {
                let action = startReload();
                store.dispatch(action);
            }
        }
    }
}

function touchEndHandler(store) {
    return function(event) {
        let nowPoint = event.changedTouches[0];
        let xAbs = Math.abs(startPointDoc.x - nowPoint.pageX);
        let yAbs = Math.abs(startPointDoc.y - nowPoint.pageY);
        let endTime = new Date();
        if ((yAbs > 10) && (endTime.getTime()-startTimeDoc.getTime()) > 200) {
            if (nowPoint.pageY > startPointDoc.y) {
                console.log('refresh');
                event.preventDefault();
                event.stopPropagation();
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
    }
}

function defineStyleForReload(mode) {
    if (mode === modes.reload) {
        return {
            display: 'block'
        }
    } else {
        return {
            display: 'none'
        }
    }
}


const Remarks = function ({store}) {
    //получили текущее состояние
    const {remarks, selectedRemark, mode} = store.getState();
    let styleForReload = defineStyleForReload(mode);
    return (
        <div onTouchStart={touchStartHandler(store)}
             onTouchMove={touchMoveHandler(store)}
             onTouchEnd={touchEndHandler(store)}>
            <ReloadPicture styleFor={styleForReload}/>
            <Header />
            <main className="main">
                {remarks.map((remark, index) => {
                    return <Remark text={remark.text} store={store} index={index}/>;
                })}
                <RemarkForm text={""} formClass={"redo-form"} nameForm={"creating"} />
                <CreatingButton />
            </main>
            <Footer />
        </div>
    );
};

export default Remarks;
