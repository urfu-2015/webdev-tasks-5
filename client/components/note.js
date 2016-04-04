import React from 'react';

export default ({text, id}) => {
    return (
        <div id={"task-item-" + id} className="task-item">
            <span className="task-item__span">{text}</span>
        </div>
    );

};
