import React from 'react';
import Note from './note';
import DeletableNote from './deletable-note';
import FormNote from './form-note';
import ButtonAdd from './button-add';
import Loader from './loader';
import {addNote} from '../actions';

export default ({store}) => {
    const  {notes, selectedNoteName, deletableNoteName, addButtonClicked} = store.getState();

    let initialPoint;

    function onTouchStart (event) {
        initialPoint = event.changedTouches[0];
    }

    function onTouchEnd (event) {
        let finalPoint = event.changedTouches[0];
        let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
            // Свайп вниз
            if (yAbs > xAbs) {
                event.preventDefault();
                if (finalPoint.pageY > initialPoint.pageY) {
                    // Сделали гифку видимой
                    const reloadGIF = document.querySelector('.loader');
                    reloadGIF.className = 'loader';

                    // Перезаргужаем записи
                    setTimeout(() => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('GET', '/api/notes', 'true');
                        xhr.send();
                        xhr.onreadystatechange = function() {

                            if (xhr.readyState != 4) return;

                            if (xhr.status != 200) {
                                return;
                            } else {
                                // Делаем гифку неотображаемой
                                reloadGIF.className = 'loader invisible';

                                // Рисуем записи
                                const data = JSON.parse(xhr.responseText);
                                data.notes.forEach(note => {
                                    store.dispatch(addNote(note));
                                })
                            }

                        };
                    }, 200);
                }
            }
        }
    }

    return (
        <div className="container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} >
            <Loader />
            {notes.map(value => (
                <div className="row">
                    {(value === selectedNoteName) ?
                        <FormNote value={value} store={store} type="change" />
                        : null
                    }
                    {(value === deletableNoteName) ?
                        <DeletableNote value={value} store={store} />
                        : null
                    }
                    {((value !==selectedNoteName) && (value !== deletableNoteName)) ?
                        <Note value={value} store={store} />
                        : null
                    }
                </div>
            ))}
            {addButtonClicked ?
                <FormNote store={store} type="add" />
                :
                <ButtonAdd store={store} />
            }
        </div>
    );
}
