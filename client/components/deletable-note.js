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
        store.dispatch(deleteNote(value));
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
