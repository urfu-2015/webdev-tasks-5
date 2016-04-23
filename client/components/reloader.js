import React from 'react';
import {Component} from 'react';
import {ReloadTodos, BeforeReload} from '../actions';

class Reloader extends Component {
    
    constructor(props) {
        super(props);
        this.makeUpdate = this.makeUpdate.bind(this);
    }

    makeUpdate() {
        if (this.props.beforeReload) {
            setTimeout(() => {
                this.props.store.dispatch(ReloadTodos());
            }, 1000);
        } else if (this.props.isReloader && this.props.shiftY == 0) {
            this.props.store.dispatch(BeforeReload());
        }
    }

    componentDidUpdate() {
        //this.timeoutId = window.setTimeout(function () {
            this.makeUpdate();
        //}.bind(this), 100);
    }

    render() {
        const {isReloader, beforeReload} = this.props;
        var Path;
        if (isReloader) {
            if (this.props.shiftY < 0 && this.props.shiftY > -40) {
                Path = '1.13.gif';
            } else if (this.props.shiftY <= -40 && this.props.shiftY > -43) {
                Path = '2.13.gif';
            } else if (this.props.shiftY <= -43 && this.props.shiftY > -46) {
                Path = '3.13.gif';
            } else if (this.props.shiftY <= -46 && this.props.shiftY > -49) {
                Path = '4.13.gif';
            } else if (this.props.shiftY <= -49 && this.props.shiftY > -52) {
                Path = '5.13.gif';
            } else if (this.props.shiftY <= -52 && this.props.shiftY > -55) {
                Path = '6.13.gif';
            } else if (this.props.shiftY <= -55 && this.props.shiftY > -58) {
                Path = '7.13.gif';
            } else if (this.props.shiftY <= -58 && this.props.shiftY > -61) {
                Path = '8.13.gif';
            } else if (this.props.shiftY <= -61 && this.props.shiftY > -64) {
                Path = '9.13.gif';
            } else if (this.props.shiftY <= -64 && this.props.shiftY > -67) {
                Path = '10.13.gif';
            } else if (this.props.shiftY <= -67 && this.props.shiftY > -70) {
                Path = '11.13.gif';
            } else if (this.props.shiftY <= -70 && this.props.shiftY > -73) {
                Path = '12.13.gif';
            } else if (this.props.shiftY <= -73) {
                Path = 'loading.gif';
            }
            this.reloadStyle = {
                maxHeight: Math.abs(Math.round(this.props.shiftY)) + "px",
                marginTop:  Math.abs(Math.round(this.props.shiftY) / 5) + "px"
            };
            if (beforeReload) {
                Path = 'loading.gif';
                this.reloadStyle = {
                    maxHeight: 75 + "px",
                    marginTop:  15 + "px"
                };
            }
        }
        return (
                <div className="reloader">
                    {isReloader ?
                        <div className='container-reload' style={this.reloadStyle}>
                            <div className="container-flex">
                                <div className="reload-image">
                                    <img src={"http://near-flavor.surge.sh/" + Path} className="image-reload" />
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