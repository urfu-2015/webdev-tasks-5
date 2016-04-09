/**
 * Created by Надежда on 03.04.2016.
 */

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux'
import {newRemark, addRemark, changeOrder,
    chooseForDelete, deleteRemark, firstLoadRemarks,
    reloadRemarks, selectRemark, updateRemark} from '../../../client/actions.jsx';
import {remarkApp} from '../../../client/reducer.jsx';
import Remarks from '../../../client/components/remarks.jsx';
import request from '../../../client/lib/request.jsx';


function render() {
    ReactDom.render(
        <Remarks store={store} />,
        document.getElementById('root')
    );
}

//const store = applyMiddleware(thunk)(createStore)(remarkApp);
const store = createStore(remarkApp);
render();
store.subscribe(render);


request('GET', '/api/remarks', (err, result) => {
    if (err != undefined) {
        console.log(err);
    } else {
        store.dispatch(firstLoadRemarks(result.data));
    }
});
