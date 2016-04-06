import React, { Component } from 'react';
import {fetchEditNote, fetchDeleteNote, swipeLeft, swipeRight, fetchUpdateNotes} from '../actions';

class note extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: false, value: this.props.task };
        this.startPosition = {};
        this.handleClick = this.handleClick.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleChangeTask = this.handleChangeTask.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    handleClick() {
        this.setState({ selected: true });
    }

    handleChangeTask(event) {
        this.setState({ value: event.target.value });
    }

    onSubmit (event) {
        event.preventDefault();
        let input = event.target.firstChild;
        if (!input.value.trim()) {
            return
        }

        this.setState({ selected: false });
        this.props.store.dispatch(fetchEditNote(input.value, this.props.id));
    }

    handleDel() {
        this.props.store.dispatch(fetchDeleteNote(this.props.id));
    }

    onTouchStart (event) {
        event.stopPropagation();

        this.startPosition = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };
    }

    onTouchEnd (event) {
        let xAbs = Math.abs(event.changedTouches[0].pageX - this.startPosition.x);
        let yAbs = Math.abs(event.changedTouches[0].pageY - this.startPosition.y);

        if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (event.changedTouches[0].pageX < this.startPosition.x) {
                    /* СВАЙП ВЛЕВО*/
                    this.props.store.dispatch(swipeLeft(this.props.id));
                } else {
                    /* СВАЙП ВПРАВО*/
                    this.props.store.dispatch(swipeRight());
                }
            } else {
                if (event.changedTouches[0].pageY > this.startPosition.y) {
                    /* СВАЙП ВНИЗ*/
                    let loading = document.querySelector('.update-progress');
                    console.log(loading);
                    loading.classList.add('update-progress_visible');
                    setTimeout(() => {
                        this.props.store.dispatch(fetchUpdateNotes());
                        loading.classList.remove('update-progress_visible');
                    }, 1000);
                }
            }
        } else {
            if (event.target.classList.contains('notes-item__delete')) {
                this.handleDel();
            }
            //event.target.dispatchEvent(new Event('tap', {bubbles: true}));
        }
    }

    render() {
        //let swipeFlag = (this.props.swipedNoteId === this.props.id) ? ' swiped-todo' : '';
        let swipeFlag = (this.props.swipedNoteId === this.props.id) ? '' : ' notes-item__delete_invisible';
        return (
            <li id={this.props.id} className="notes__item notes-item"
                onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                <div id={"task-" + this.props.id} className="notes-item__task" onClick={this.handleClick}>
                    {(this.state.selected) ?
                        <form name="newNote" className="update-form" onSubmit={this.onSubmit}>
                            <input name="task" className="new-note-form__input"
                                   value={this.state.value} onChange={this.handleChangeTask} />
                            <button type="submit" className="new-note-form__button">Сохранить</button>
                        </form>
                        : this.state.value
                    }
                </div>
                <div className={"notes-item__delete" + swipeFlag} onclick={this.handleDel}>
                </div>
            </li>
        );
    }
}

export default note
