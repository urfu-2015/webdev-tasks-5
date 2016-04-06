import React, {PropTypes, Component} from 'react'
import TodoTextInput from './TodoTextInput'
import classnames from 'classnames'

class Footer extends Component {
    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }
    render() {
        return (
            <footer className="footer">
                <TodoTextInput
                    newTodo
                    onSave={this.handleSave.bind(this)}
                    placeholder="What needs to be done?"
                />
            </footer>
        )
    }
}

Footer.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default Footer
