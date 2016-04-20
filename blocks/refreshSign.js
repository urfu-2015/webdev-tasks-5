
import React from 'react';
import ReactDom from 'react-dom';
const sendRequest = require('../public/scripts/xml-http.js').sendRequest;

var RefreshSign = React.createClass({
    getInitialState: function () {
        return {
            shown: false
        };
    },
    render: function () {
        var signClassName = 'refresh-sign';
        var imageClassName = 'refresh-sign__image';
        if (this.state.shown) {
            signClassName += ' refresh-sign_shown';
            imageClassName += ' refresh-sign__image_shown';
        }
        return (
            <div className = {signClassName}>
                <img src = 'images/refresh.gif' className = {imageClassName} />
            </div>
        );
    }
});

export default RefreshSign;
