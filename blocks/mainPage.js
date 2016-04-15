
import React from 'react';
import ReactDom from 'react-dom';
import TaskList from './tasklist.js';
import RefreshSign from './refreshSign.js';
const sendRequest = require('../public/scripts/xml-http.js').sendRequest;

document.prevEvent = null;
document.addEventListener('touchstart', function(evt){
    document.prevEvent = evt;
});
document.addEventListener('touchmove', function(evt){
    if (document.prevEvent.type === 'touchmove') {
        var currTouch = evt.touches[0];
        var prevTouch = document.prevEvent.touches[0];
        var diffX = prevTouch.pageX - currTouch.pageX;
        var diffY = currTouch.pageY - prevTouch.pageY;
        var touchesDiff = Math.sqrt(diffX * diffX + diffY * diffY);
        var sine = Math.abs(diffX) / touchesDiff;
        if (sine <= 0.5) {
            refreshSign.setState({shown: true});
            getTasks(function() {
                setTimeout(function() {
                    refreshSign.setState({shown: false});
                }, 300);
            });
        }
    }
    document.prevEvent = evt;
});
document.addEventListener('touchend', function(evt){
    document.prevEvent = evt;
});

var refreshSign = ReactDom.render(<RefreshSign />, document.querySelector('.page-top'));

function getTasks(cb) {
    var _cb = function(xhr) {
        var resJSON = JSON.parse(xhr.responseText);
        document.date = new Date(xhr.getResponseHeader('Date'));
        ReactDom.render(<TaskList tasks = {resJSON.tasks} />, document.querySelector('.root'));
        cb ? cb() : null;
    };
    sendRequest(null, {method: 'GET', path: '/tasks'}, _cb);
}

getTasks();
