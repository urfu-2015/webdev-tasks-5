import React from 'react';
import {selectUnDeleteNote, deleteNote} from '../actions';

export default ({value, store}) => {

    let initialPoint;
    let initialNode;
    let start;

    function onTouchStart (event) {
        initialPoint = event.changedTouches[0];
        initialNode = event.target;
        start = new Date();
    }

    function onTouchEnd (event) {
        let finalPoint = event.changedTouches[0];
        if (initialNode !==  event.target) {
            return;
        }
        let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        if (xAbs > 20) {
            if (finalPoint.pageX > initialPoint.pageX){
                store.dispatch(selectUnDeleteNote(value))
            }
        }
    }

    function onClickDelete (event) {
        const json = JSON.stringify({
            text: value
        });
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/api/notes', 'true');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function() {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                return;
            } else {
                store.dispatch(deleteNote(value));
            }

        }
    }

    return (
        <div className="deletable-note" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="note_for-delete">
                {value}
            </div>
            <div className="trash" onClick={onClickDelete}>
                Удалить
            </div>
        </div>
    )
}
