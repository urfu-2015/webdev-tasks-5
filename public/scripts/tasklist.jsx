'use strict';

(function () {

    window.TaskList = React.createClass({

        getInitialState: function () {
            return {tasks: []};
        },
        
        componentDidMount: function () {
            addTaskCB = this.addTask;
            clearTasksCB = this.clearTasks;
            setTimeout(completelyLoaded(), 0);
        },
        
        addTask: function (task) {
            this.setState({ tasks: this.state.tasks.concat(task)});
        },
        
        clearTasks: function () {
            this.setState({ tasks: [] });
        },
        
        getDeleteCB: function (id) {
            return (function () {
                var newTasks = this.state.tasks.filter(function (task) {
                    return task.id != id
                });
                this.setState({ tasks: newTasks });
            }).bind(this);
        },

        render: function () {
            var items = [];
            this.state.tasks.forEach((function (task) {
                items.push(<TaskItem
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    deleteCB={this.getDeleteCB(task.id)}
                    />);
            }).bind(this));
            return <div>{items}</div>;
        }
    });

})();