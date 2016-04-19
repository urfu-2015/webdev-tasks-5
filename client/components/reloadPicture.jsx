
import React from 'react';

let pathToPicture = '/reload2.png';

export default ({visibilityClass}) => {
    visibilityClass += ' wheel reload_img';
    return (
        <div className="reload">
            <img src={pathToPicture} alt="Перегрузка" className={visibilityClass} />
        </div>
    )
}
