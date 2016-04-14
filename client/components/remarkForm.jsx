
import React from 'react';
import request from '../lib/request.jsx';


function cancelHandler(store, action) {
    return function (event) {
        event.preventDefault();
        store.dispatch(action);
        console.log('cancel');
    }
}

function sendHandler(store, actionUnused, method, path, text) {
    return function (event) {
        event.preventDefault();
        text = event.currentTarget.parentNode.parentNode.querySelector('textarea[name="text"]').value;
        request(method, path, function (err, data) {
            if (err != undefined) {
                console.error(err);
                return;
            }
            let action = actionUnused(data.obj ,text, data.id);
            store.dispatch(action);
        }, 'text=' + encodeURIComponent(text));
    }
}

export default ({text, formClass, nameForm, visibilityClass, path, actions, method, store}) => {
    let forSend = formClass + '__send';
    let forFormClass = formClass + ' ' + nameForm;
    forFormClass += ' ' + visibilityClass;
    let forCancel = formClass + '__cancel';
    let forText = formClass + '__text';
    let forButtons = formClass + '__buttons';
    return (
        <div>
            <form className={forFormClass} name={nameForm} method={method}>
                <div>
                    <textarea name="text" placeholder="Введите вашу заметку..." className={forText}
                        form={nameForm} defaultValue={text} />
                </div>
                <div className={forButtons}>
                <input type="submit" value="Сохранить запись" className={forSend}
                       onClick={sendHandler(store, actions.second, method, path, text)}/>
                <input type="button" value="Отмена" className={forCancel}
                       onClick={cancelHandler(store, actions.first())} />
                </div>
            </form>
        </div>
    )
}
