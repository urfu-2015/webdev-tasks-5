
import React from 'react';

export default ({text, formClass, nameForm}) => {
    let forSend = formClass + '_send';
    let forFormClass = formClass + ' ' + nameForm;
    let forCancel = formClass + '_cancel';
    let forText = formClass + '_text';
    return (
        <form className={forFormClass} name={nameForm}>
            <textarea name="text" placeholder="Введите вашу заметку..." className={forText}
                form={nameForm} defaultValue={text} method="POST" />
            <input type="submit" value="Сохранить запись" className={forSend} />
            <input type="button" value="Отмена" className={forCancel} />
        </form>
    )
}