var xhr = require('./../scripts/xhr.js');
var assign = require('./../scripts/assign.js');

var React = require('react');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            text: this.props.todo.text
        };
    },

    startEditing: function () {
        this.props.onStartEditing(this.props.todo._id);
    },

    stopEditing: function () {
        this.props.onStopEditing(this.props.todo._id);
    },

    onChangeHandler: function (e) {
        this.setState({text: e.target.value})
    },

    handleBlur: function (e) {
        this.stopEditing();
        var newText = e.target.value;
        if (this.props.todo._id === 'newTodo') {
            this.props.onAdding(newText);
        } else {
            if (newText !== '') {
                xhr.update({_id: this.props.todo._id, text: newText}, function (data) {
                    this.setState({text: data.text});
                }.bind(this));
            } else {
                this.setState({text: this.props.todo.text});
            }
        }
    },

    handleSwipeRight: function () {
        xhr.delete({_id: this.props.todo._id, text: this.props.todo.text}, function () {
            this.props.remove();
        }.bind(this));
    },

    eventObj: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        timeout: null,
        liStartX: 0,
        liStartY: 0,
        liTouchStartX: 0,
        liTouchStartY: 0
    },

    handleTouchMove: function (e) {
        var touch = e.changedTouches[0];
        this.eventObj.endX = touch.pageX;
        this.eventObj.endY = touch.pageY;

        var offset = this.eventObj.endX - this.eventObj.startX;
        this.props.onElementDragLeft(this.props.id, offset);
    },

    handleTouchStart: function (e) {
        var touch = e.targetTouches[0];
        this.eventObj.startX = touch.pageX;
        this.eventObj.startY = touch.pageY;
    },

    handleTouchLiStart: function (e) {
        var touch = e.targetTouches[0];
        this.eventObj.liStartX = e.target.offsetLeft - touch.pageX;
        this.eventObj.liStartY = e.target.offsetTop - touch.pageY;
        this.eventObj.timeout = setTimeout(function () {
            this.props.onElementSetDrag(this.props.id,
                this.eventObj.liStartX + touch.pageX, this.eventObj.liStartY + touch.pageY);
        }.bind(this), 1000);
    },

    handleTouchLiMove: function (e) {
        clearTimeout(this.eventObj.timeout);
        if (this.props.dragging) {
            var touch = e.targetTouches[0];
            var liTouchX = touch.pageX;
            var liTouchY = touch.pageY;
            this.props.onElementSetDrag(this.props.id,
                this.eventObj.liStartX + liTouchX,
                this.eventObj.liStartY + liTouchY);
            e.preventDefault();
        }
    },

    handleTouchLiEnd: function () {
        if (this.props.dragging) {
            this.props.onElementSetDrag();
        }
        clearTimeout(this.eventObj.timeout);
    },

    handleTouchEnd: function (e) {
        var touch = e.changedTouches[0];
        this.eventObj.endX = touch.pageX;
        this.eventObj.endY = touch.pageY;

        if (this.eventObj.startX - this.eventObj.endX === 0 &&
            this.eventObj.startY - this.eventObj.endY === 0) {
            this.startEditing();
        }
        if (this.eventObj.startX - this.eventObj.endX > 130 &&
            Math.abs(this.eventObj.startY - this.eventObj.endY) < 15) {
            this.handleSwipeRight(this.props.id);
        } else {
            this.props.onElementDragLeft();
        }
    },

    render: function () {

        var inputStyles = {};
        var viewStyles = {};

        if (this.props.editing) {
            viewStyles.display = "none";
        } else {
            inputStyles.display = "none";
        }

        return (
            <li id={this.props.id}
                onTouchStart={this.handleTouchLiStart}
                onTouchEnd={this.handleTouchLiEnd}
                onTouchMove={this.handleTouchLiMove}
                className={this.props.dragging ? 'dragging' : ''}
                style={assign({left: this.props.left, top: this.props.top}, this.props.style)}>
                <div className='view' style={viewStyles}
                     onTouchStart={this.handleTouchStart}
                     onTouchMove={this.handleTouchMove}
                     onTouchEnd={this.handleTouchEnd}>
                    {this.state.text}
                </div>
                <input className='edit' type='text'
                       ref={function(input) { if (input != null) {input.focus();}}}
                       onBlur={this.handleBlur}
                       style={inputStyles}
                       value={this.state.text}
                       onChange={this.onChangeHandler}
                />
            </li>
        );
    }
});
