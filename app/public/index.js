function makeFormVisible() {
    var form = document.querySelector('.todo-list__form-add');
    form.classList.remove('todo-list__form_hidden');
    form.classList.add('todo-list__form_visible');
}

function makeFormInvisible() {
    if (!event.target.classList.length) { // кликаем по свободному пространству
            var form = document.querySelector('.todo-list__form_visible');
            form.classList.add('todo-list__form_hidden');
            form.classList.remove('todo-list__form_visible');
    }
}

// function sendNewData() {
//     const newTodoText = event.currentTarget.previousElementSibling.value;
//
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/');
//     xhr.send(newTodoText);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log(xhr.responseText);
//         } else {
//             console.error(xhr.status + ': ' + xhr.statusText);
//         }
//     }
// }

document.querySelector('.todo-list__add-button').addEventListener('click', makeFormVisible, false);
document.addEventListener('click', makeFormInvisible, false);
// var buttons = document.querySelectorAll('.todo-list__submit');
// for (let i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', sendNewData, false);
// }
