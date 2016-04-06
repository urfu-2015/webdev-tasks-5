import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
import { fetchTodos } from '../actions'

class App extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }
    componentDidMount() {
        const {todos, actions, dispatch} = this.props;
        dispatch(fetchTodos());
    }
    render() {
        const {todos, actions} = this.props;
        return (
            <div>
                <Header/>
                <MainSection todos={todos} actions={actions}/>
                <Footer addTodo={actions.addTodo}/>
            </div>
        )
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch),
        dispatch: dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
