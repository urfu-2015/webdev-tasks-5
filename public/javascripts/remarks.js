/**
 * Created by Надежда on 30.03.2016.
 */

var newRemark = document.querySelector('.new-remark');

//нажали на кнопку создания новой заметки
newRemark.addEventListener('click', function (event){
    event.preventDefault();
    document.querySelector('.creating').setAttribute('style', 'display: block;');
    newRemark.setAttribute('style', 'display: none;');
});

//отмена создания
document.querySelector('.redo-form_cancel').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.creating').setAttribute('style', 'display: none;');
    newRemark.setAttribute('style', 'display: block;');
});

//отправка заметки и ее сохрание
document.querySelector('.redo-form_send').addEventListener('click', function (event) {
    event.preventDefault();
    var text = document.querySelector('textarea.redo-form_text').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/remarks/new', true);
    xhr.onreadystatechange = function() { // (3)
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var main = document.querySelector('.main');
            var card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = text;
            main.querySelector('.creating').setAttribute('style', 'display: none;');
            main.removeChild(newRemark);
            newRemark.setAttribute('style', 'display: block;');
            main.appendChild(card);
            main.appendChild(newRemark);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('text=' + encodeURIComponent(text));
});