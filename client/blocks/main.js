'use strict';

import React from 'react';
import Item from './item';

export default ({store}) => {

    const {notes} = store.getState();

    if (notes.length === 0) {
        return (<p>Notes not found!</p>);
    } else {
        return (
        <div className="container">
            {notes.map(note => (
                <div key={notes.indexOf(note)}
                     style={{order: notes.indexOf(note)}}
                     className="container__item">
                    <Item store={store} name={note} />
                </div>
            ))}
        </div>
        );
    }
};
