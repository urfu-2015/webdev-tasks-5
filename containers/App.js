import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
import {fetchTodos} from '../actions'
import classnames from 'classnames'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pulling: false,
            pullPixels: 0,
            spinning: false
        };
        this.startPoint = {};
    }

    componentDidMount() {
        const {todos, actions, dispatch} = this.props;
        dispatch(fetchTodos());
    }

    handleTouchStart(event) {
        // console.log(event.currentTarget);
        // console.log(event.target);

        this.startPoint.x = event.changedTouches[0].pageX;
        this.startPoint.y = event.changedTouches[0].pageY;
        this.ldelay = new Date();
        console.log('handleTouchStart');
    }

    handleTouchMove(event) {
        //event.stopPropagation();
        let nowPoint = event.changedTouches[0];
        //console.log(nowPoint.pageX, nowPoint.pageY);
        var offset = {
            x: [nowPoint.pageX - this.startPoint.x],
            y: [nowPoint.pageY - this.startPoint.y]
        };
        if (Math.abs(offset.y) > 20) {
            if (offset.y > 0) {
                console.log(`Down ${this.state.pullPixels}px touchmove`);
                this.setState({
                    pulling: true,
                    pullPixels: [parseInt(this.state.pullPixels, 10) + 20]
                });
                if (this.state.pullPixels >= 100) {
                    this.setState({
                        spinning: true,
                        pullPixels: 100
                    })
                }
                this.startPoint = {x: nowPoint.pageX, y: nowPoint.pageY};
            }
            if (offset.y < 0) {
                this.setState({
                    pulling: false,
                    pullPixels: 0,
                    spinning: false
                });
                this.startPoint = {x: nowPoint.pageX, y: nowPoint.pageY};
            }
        }
    }

    handleTouchEnd(event) {
        console.log('handleTouchEnd');
        this.setState({
            pulling: false,
            pullPixels: 100,
            spinning: true
        });
        this.props.dispatch(fetchTodos())
            .then(
                this.setState({
                    pulling: false,
                    pullPixels: 0,
                    spinning: false
                })
            );
    }

    render() {
        const {todos, actions} = this.props;
        let spinner;
        var spinnerClass = classnames({
            'todo__refresh': true,
            'animate': this.state.spinning
        });
        if (this.state.pullPixels) {
            if (this.state.spinning) {
                spinner = (
                    <img
                        className={spinnerClass}
                        src="/static/refresh.png"
                    >
                    </img>
                )
            } else {
                spinner = (
                    <img
                        className={spinnerClass}
                        style={{transform: ' rotate(' + this.state.pullPixels * 1.5 + 'deg)'}}
                        src="/static/refresh.png"
                    >
                    </img>
                )
            }
        }
        let space = (
            <div style={{height: this.state.pullPixels + 'px'}}>
            </div>
        );
        return (
            <div className="app-container"
                 onTouchStart={this.handleTouchStart.bind(this)}
                 onTouchMove={this.handleTouchMove.bind(this)}
                 onTouchEnd={this.handleTouchEnd.bind(this)}
            >
                {spinner}
                {space}
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
