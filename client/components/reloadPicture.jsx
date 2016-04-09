
import React from 'react';

let pathToPicture = '/images/reload2.png';

export default ({styleFor}) => {
    return (
        <div className="reload">
            <img className="wheel reload_img" src={pathToPicture} alt="Перегрузка" style={styleFor} />
        </div>
    )
}