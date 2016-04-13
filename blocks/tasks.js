import React from 'react'
import SaveForm from './saveForm'
import AddButton from './addButton'
import Task from './task'

export default ({commonStaff, handler}) => (
   <div className="list">
    {commonStaff.tasks.length?
        commonStaff.tasks.map(task => {
            return commonStaff.edited == task.orderNum ?
                <SaveForm commonStaff={commonStaff}
                    handler={handler}
                    key={task.orderNum}
                    task={task} /> :
                <Task commonStaff={commonStaff}
                    handler = {handler}
                    key={task.orderNum}
                    task={task}/>
            }) :
        <p>Create your first task!</p>
    }       
    {commonStaff.edited != -1 ?
        <AddButton commonStaff={commonStaff} /> :
        <SaveForm  commonStaff={commonStaff}
            handler={handler}
            task={{todo:"",orderNum: -1}} />    
    }
    </div>
);
