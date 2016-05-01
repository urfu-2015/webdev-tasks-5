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
        this.startTarget = event.target;
        console.log('handleTouchStart');
    }

    handleTouchMove(event) {
        //event.preventDefault(); // Можно конечно, но тогда писать свой скролл
        //event.stopPropagation();
        const {todos, swipe, actions, dispatch} = this.props;
        let nowPoint = event.changedTouches[0];
        //console.log(nowPoint.pageX, nowPoint.pageY);
        var offset = {
            x: [nowPoint.pageX - this.startPoint.x],
            y: [nowPoint.pageY - this.startPoint.y]
        };
        if (swipe.verticalSwipe.state) {
            actions.verticalMove(event.target, offset.y);

            // Дальше код, который относится к локальной обработке pull-to-refresh
            if (swipe.verticalSwipe.offset > 0) {
                this.setState({
                    pullPixels: swipe.verticalSwipe.offset
                });
                if (swipe.verticalSwipe.offset >= 100) {
                    this.setState({
                        spinning: true,
                        pullPixels: 100
                    })
                }
            }
        }
        if (swipe.horizontalSwipe.state) {
            actions.horizontalMove(event.target, offset.x);
        }
        if (Math.abs(offset.y) > 20 || Math.abs(offset.x) > 20) {
            if (Math.abs(offset.y) > Math.abs(offset.x)) {
                if (!swipe.verticalSwipe.state && !swipe.horizontalSwipe.state) {
                    actions.verticalStart(event.target);
                }
            } else {
                if (!swipe.verticalSwipe.state && !swipe.horizontalSwipe.state) {
                    actions.horizontalStart(event.target);
                }
            }
        }
    }
    

    handleTouchEnd(event) {
        const {todos, swipe, actions} = this.props;
        console.log('handleTouchEnd');
        let nowPoint = event.changedTouches[0];
        let delay = new Date();
        var offset = {
            x: [nowPoint.pageX - this.startPoint.x],
            y: [nowPoint.pageY - this.startPoint.y]
        };

        if (swipe.verticalSwipe.state) {
            actions.verticalStop(event.target, offset.y);
        }
        if (swipe.horizontalSwipe.state) {
            actions.horizontalStop(event.target, offset.x);
        }
        // Уже точно не свайп - проверим на tap
        if (delay - this.ldelay < 300) {
            if (this.startTarget == event.target) {
                //console.log('Eq target');
                actions.tap(event.target);
            }
        }
        // Дальше код, который относится к локальной обработке pull-to-refresh
        if (this.state.pullPixels > 0) {
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
    }

    render() {
        const {todos, swipe, actions} = this.props;
        let spinner;
        var spinnerClass = classnames({
            'todo__refresh': true,
            'animate': this.state.spinning
        });
        if (this.state.pullPixels > 15) {
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
                <MainSection todos={todos} swipe={swipe} actions={actions}/>
                <Footer addTodo={actions.addTodo}/>
            </div>
        )
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired,
    swipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        todos: state.todos,
        swipe: state.swipe
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
