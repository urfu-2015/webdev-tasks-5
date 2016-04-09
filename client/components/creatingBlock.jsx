
import React from 'react';
import {addRemark, canselAdding} from '../actions.jsx';
import CreatingButton from './creatingButton.jsx';
import RemarkForm from './remarkForm.jsx';
import {modes} from '../reducer.jsx';

function defineStyleTextBox(mode) {
    let result = {};
    console.log(mode);
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
        first: canselAdding,
        second: addRemark
    };
    let text = newText || "";
    console.log(text);
    return (
        <li>
            <CreatingButton store={store} />
            <RemarkForm text={text} formClass="redo-form" nameForm="creating" styleFor={styleForForm}
                        path="/remarks/new" method="POST" actions={actions} store={store} />
        </li>
    )
}