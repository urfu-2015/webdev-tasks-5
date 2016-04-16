import React from 'react';
import ReactDOM from 'react-dom';
import {createNote, updateNote, removeNote, getListNotes} from './actions.jsx';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            isDelete: false,
            isEdit: false,
            isSwipe: false,
            text: props.text
        };
        this.startPointX = 0;
        this.onTouchStart = onTouchStart.bind(this);
        this.onTouchMove = onTouchMove.bind(this);
        this.onTouchEnd = onTouchEnd.bind(this);
        this.onChange = onChange.bind(this);
        this.onUpdate = onUpdate.bind(this);
        this.onRemove = onRemove.bind(this);
    }

    render() {
        if (this.state.isDelete) {
            return false;
        } else if (this.state.isSwipe) {
            return (
                <div className='note'>
                    <div className='noteText'
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}
                        onTouchEnd={this.onTouchEnd}>
                            {this.state.text}
                    </div>
                    <img src='/del.png' className='inline' onTouchStart={this.onRemove}/>
                </div>
            )
        } else if (this.state.isEdit){
            return (
                <div className='note'>
                    <form method='put' action='/notes'>
                        <input type='text' value={this.state.text} onChange={this.onChange}/>
                        <button onTouchStart={this.onUpdate}>Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className='note'>
                    <div className='noteText'
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}
                        onTouchEnd={this.onTouchEnd}>
                            {this.state.text}
                    </div>
                </div>
            )
        }
    }
}

function onTouchStart(event) {
    this.startPointX = event.changedTouches[0].pageX;
}

function onTouchMove(event) {
    var currentPointX = event.changedTouches[0].pageX;
    if (this.startPointX - currentPointX > 50) {
        if (!this.state.isSwipe) {
            this.setState({isSwipe: true});
        }
    } else if (currentPointX - this.startPointX > 50) {
        if (this.state.isSwipe) {
            this.setState({isSwipe: false});
        }
    }
}

function onTouchEnd(event) {
    var currentPointX = event.changedTouches[0].pageX;
    if (Math.abs(currentPointX - this.startPointX) < 50) {
        this.setState({isEdit: true});
    }
}

function onChange(event) {
    this.setState({text: event.target.value});
}

function onUpdate(event) {
    var oldText = event.target.previousElementSibling.value;
    var idValue = 'id=' + this.id;
    var innerHTML = oldText ? oldText : 'Название';
    var newValue = 'newValue=' + innerHTML;
    var text = idValue + '&' + newValue;
    this.setState({text: innerHTML});
    updateNote(text, () => {
        this.setState({isEdit: false});
    });
}

function onRemove(event) {
    removeNote(this.id, () => {
        this.setState({isDelete: true});
    });
}

export default Note
