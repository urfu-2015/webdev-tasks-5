import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class TodoTextInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        }
    }

    handleSubmit(e) {
        const text = this.state.text.trim();
        this.props.onSave(text);
        if (this.props.newTodo) {
            this.setState({text: ''})
        }
        // const text = e.target.value.trim();
        // if (e.which === 13) {
        //     this.props.onSave(text);
        //     if (this.props.newTodo) {
        //         this.setState({text: ''})
        //     }
        // }
    }

    handleChange(e) {
        this.setState({text: e.target.value})
    }

    render() {
        let buttonText = this.props.newTodo ? 'Добавить' : 'Изменить';
        let editTextId = `edit-form-text-${this.props.todoId}`;
        let editButId = `edit-form-but-${this.props.todoId}`;
        return (
            <form className="todo__edit-form">
                <input
                    id={editTextId}
                    type="text"
                    autoFocus="true"
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                />
                <input
                    id={editButId}
                    type="button"
                    value={buttonText}
                    onClick={this.handleSubmit.bind(this)}
                    //onKeyDown={this.handleSubmit.bind(this)}
                />
            </form>
        )
    }
}

TodoTextInput.propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool,
    todoId: PropTypes.string
};

export default TodoTextInput
