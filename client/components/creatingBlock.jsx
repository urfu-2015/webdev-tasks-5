
import React from 'react';
import {addRemark, cancelAdding} from '../actions.jsx';
import CreatingButton from './creatingButton.jsx';
import RemarkForm from './remarkForm.jsx';
import {modes} from '../reducer.jsx';

function defineStyleTextBox(mode) {
    let result = {};
    if (mode === modes.creating) {
        result['display'] = 'block';
    } else {
        result['display'] = 'none';
    }
    return result;
}


export default ({store}) => {
    let {mode, newText} = store.getState();
    let styleForForm = defineStyleTextBox(mode);
    let actions = {
        first: cancelAdding,
        second: addRemark
    };
    let text = newText || "";
    return (
        <div>
            <CreatingButton store={store} />
            <RemarkForm text={text} formClass="redo-form" nameForm="creating" styleFor={styleForForm}
                        path="/remarks/new" method="POST" actions={actions} store={store} />
        </div>
    )
}