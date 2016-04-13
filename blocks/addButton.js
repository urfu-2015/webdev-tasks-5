import React from 'react'

export default ({commonStaff}) => {
	function addButtonClick(event) {
	    commonStaff.edited = -1;
	    commonStaff.render();
	}
	return (
		<div className="task" data-num="-1">
            <button className="task__add" onClick={addButtonClick}>Add task</button>
        </div> 
	);
}

