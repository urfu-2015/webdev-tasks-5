import React from 'react';

export default () => (
    <div className="new-note">
        <button className="new-note__button-add new-note__button_visible">Добавить</button>
        <form name="newNote" className="new-note__form new-note-form new-note-form_invisible">
            <input name="task" className="new-note-form__input" placeholder="Новая заметка.." />
                <button type="button" className="new-note-form__button">Сохранить</button>
        </form>
    </div>
);
