import React from 'react';
import {Component} from 'react';
import {AddTodo} from '../actions';

class addButton extends Component {
    
    constructor(props) {
        super(props);
        this.textInputStyle = {
            resize: 'none'
        };
        this.onClick = this.onClick.bind(this);
    }
    
    onClick(event) {
        event.preventDefault();
        this.props.store.dispatch(AddTodo(document.getElementById('input-text').value));
    }

    render() {
        return (
            <div className="container">
                <div className="container-flex">
                    <div className="blue-list-item">
                        <form action="/list-add" method="POST">
                            <input id="input-text" type="text" style={this.textInputStyle}/>
                            <input id="submit-btn" onClick={this.onClick} className="submit-btn" type="submit"
                                   value="Добавить"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default addButton;