import React from 'react';
import {Component} from 'react';
import {ReloadTodos} from '../actions';

class Reloader extends Component {
    constructor(props) {
        super(props);
        this.makeUpdate = this.makeUpdate.bind(this);
    }

    makeUpdate() {
        if (this.props.isReloader) {
            console.log('reload');
            this.props.store.dispatch(ReloadTodos());
        }
    }

    componentDidUpdate() {
        this.timeoutId = window.setTimeout(function () {
            this.makeUpdate();
        }.bind(this), 1000);
    }

    render() {
        const {isReloader} = this.props;
        return (
                <div className="reloader">
                    {isReloader ?
                        <div className='container-reload'>
                            <div className="container-flex">
                                <div className="reload-image">
                                    <img src="reload.png" className="image-reload" />
                                </div>
                            </div>
                        </div>:
                        null
                    }
                </div>
        )
    }
}

export default Reloader

//export default ({isReloader}) => (
//    <div className="reloader">
//        {isReloader ?
//            <div className='container-reload'>
//                <div className="container-flex">
//                    <div className="reload-image">
//                        <img src="reload.png" className="image-reload" />
//                    </div>
//                </div>
//            </div>:
//            null
//        }
//    </div>
//);