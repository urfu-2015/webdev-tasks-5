
import React from 'react';
import {addRemark, cancelAdding} from '../actions.jsx';
import CreatingButton from './creatingButton.jsx';
import RemarkForm from './remarkForm.jsx';
import {modes} from '../reducer.jsx';

function defineClassForm(mode, nameForm) {
    if (mode === modes.creating) {
        return nameForm + '_visible';
    } else {
        return nameForm + '_hidden';
    }
}

export default ({store}) => {
    let {mode, newText} = store.getState();
    let classForm = 'redo-form';
    let visibilityClass = defineClassForm(mode, classForm);
    let actions = {
        first: cancelAdding,
        second: addRemark
    };
    let text = newText || "";
    return (
        <div>
            <CreatingButton store={store} />
            <RemarkForm text={text} formClass={classForm} nameForm="creating" visibilityClass={visibilityClass}
                        path="/remarks/new" method="POST" actions={actions} store={store} />
        </div>
    )
}
