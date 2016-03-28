const closeForms = () => {
    const tasks = document.getElementsByClassName('task__text');
    const forms = document.getElementsByClassName('task__rename');

    Array.prototype.forEach.call(tasks, function (item) {
        showElement(item);
    });
    hideElement(document.getElementsByClassName('add-task-form__text')[0]);
    Array.prototype.forEach.call(forms, function (item) {
        hideElement(item);
    });
};

const showElement = (element, opt) => {
    element.style.display = opt ? opt : 'block';
    if (typeof element.dataset.displayed !== 'undefined') {
        element.dataset.displayed = true;
    }
};

const hideElement = (element) => {
    element.style.display = 'none';
    if (typeof element.dataset.displayed !== 'undefined') {
        element.dataset.displayed = false;
    }
};

const showForm = (event) => {
    const element = event.target;
    const id = getElementId(element);
    const taskText = getElementById('task__text', id).textContent;

    hideElement(getElementById('task__text', id));
    hideElement(getElementById('task__delete', id));
    getElementById('rename-text', id).value = taskText;
    showElement(getElementById('task__rename', id));
};

const getElementById = (className, id) => {
    let elements = document.getElementsByClassName(className);
    return Array.prototype.find.call(elements, (element) => {
        return getElementId(element) === id;
    });
};

const showDeleteButton = (event) => {
    const id = getElementId(event.target);

    if (isNaN(id)) {
        return;
    }
    showElement(getElementById('task__delete', id));
    const deletion = getElementById('task__delete', id);

    setTimeout(() => {
        if (deletion) {
            userInterface.hideElement(deletion);
        }
    }, 2000);
};

const hideRefreshAnimation = () => {
    var content = document.getElementsByClassName('content')[0];
    var refreshPic = document.getElementsByClassName('refresh')[0];

    [content, refreshPic].forEach(function (item) {
        item.style.top = `${item.initialPos}px`;
    });
};

const getElementId = (element) => {
    return Number(element.dataset.id);
};

export const userInterface = {
    closeForms,
    showElement,
    hideElement,
    showForm,
    showDeleteButton,
    hideRefreshAnimation
};
