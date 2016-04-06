import React from 'react'

export default React.createClass({
  getInitialState: function() {
    return {
      text: this.props.text,
      num: this.props.num
    };
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
  },
  render: function() {
    return (
    <div className={'list__task__num_' + this.props.num}>
        <input 
            type="text"
            name="todo"
            onChange={this.handleChange}
            className={"list__task__input__num_" + this.state.num}
            value={this.state.text}/>
        <button className="list__task__submit">Save</button>
    </div>
    )}
});