import React from 'react';

export default () => (
    <section className="task-controllers">
        <form className="task-form task-form_hidden" name="task-add-form">
            <textarea className="task-form__textarea" placeholder="Введите текст заметки"></textarea>
            <button className="button task-form__button-save">Сохранить</button>
        </form>
        <button className="button task-controllers__button-add">Добавить</button>
    </section>
);
