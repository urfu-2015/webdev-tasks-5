import React from 'react';

export default React.createClass({
    getInitialState: function () {
        return {
            text: this.props.task.todo,
            num: this.props.task.orderNum,
            saveFunc: this.props.handler.save
        };
    },
    handleChange: function (event) {
        this.setState({ text: event.target.value });
    },
    handleSave: function (event) {
        this.state.saveFunc(event);
    },
    render: function () {
        return (
        <div className="task" data-num={this.state.num}>
            <input
                type="text"
                name="todo"
                onChange={this.handleChange}
                className="task__input" data-num={this.state.num}
                value={this.state.text}/>
            <button
                className="task__submit"
                data-num={this.state.num}
                onClick={this.handleSave}>Save</button>
        </div>
        );
    }
});
