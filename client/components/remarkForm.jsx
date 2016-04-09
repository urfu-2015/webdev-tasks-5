
import React from 'react';
import request from '../lib/request.jsx';

function cancelHandler(store, action) {
    return function (event) {
        event.preventDefault();
        store.dispatch(action);
    }
}

function sendHandler(store, actionUnused, method, path, text) {
    return function (event) {
        event.preventDefault();
        text = event.currentTarget.parentNode.querySelector('textarea[name="text"]').value;
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

export default ({text, formClass, nameForm, styleFor, path, actions, method, store}) => {
    let forSend = formClass + '_send';
    let forFormClass = formClass + ' ' + nameForm;
    let forCancel = formClass + '_cancel';
    let forText = formClass + '_text';
    return (
        <form className={forFormClass} name={nameForm} style={styleFor}>
            <textarea name="text" placeholder="Введите вашу заметку..." className={forText}
                form={nameForm} defaultValue={text} method="POST" />
            <input type="submit" value="Сохранить запись" className={forSend}
                   onClick={sendHandler(store, actions.second, method, path, text)}/>
            <input type="button" value="Отмена" className={forCancel}
                   onClick={cancelHandler(store, actions.first())} />
        </form>
    )
}
