import React from 'react';
import {selectDeleteNote, selectChangeNote} from '../actions';

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
        let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX) {
                    store.dispatch(selectDeleteNote(value));
                }
            }
        } else {
            var finish = new Date();
            if (finish.getTime() - start.getTime() < 200) {
                store.dispatch(selectChangeNote(value));
            }
        }
    }

    return (
        <div className="note" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {value}
        </div>
    )
}
