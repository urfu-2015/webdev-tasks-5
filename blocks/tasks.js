import React from 'react'
import Header from './header'
import SaveForm from './saveForm'
import RemoveButton from './removeButton'
import Task from './task'

export default ({tasks, addButton}) => (
    <div className="data">
       <Header />
       <div className="list">
        {tasks.length?
            tasks.map(task => 
                {return task.change ?
                    <SaveForm 
                        key={task.orderNum}
                        text={task.todo}
                        num={task.orderNum} /> :
                    <div key={task.orderNum} className={'list__task__num_' + task.orderNum}>
                        <Task task={task} />
                        {task.remove ? 
                        <RemoveButton num={task.orderNum} /> :
                        null
                        }
                    </div>
                }) :
            <p>Create your first task!</p>
        }       
        {addButton ?
            <div className="list__task__num_-1">
                <button className="list__task__add">Add task</button>
            </div> :
            <SaveForm text={''} num={'-1'} />    
        }
        </div>
    </div>
);
