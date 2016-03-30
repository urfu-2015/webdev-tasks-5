/**
 * Created by Надежда on 30.03.2016.
 */

document.querySelector('.new-remark').addEventListener('click', function (event){
    event.preventDefault();
    var creatingElement = document.querySelector('.creating');
    creatingElement.setAttribute('style', 'display: block;');
});

document.querySelector('.redo-form_cancel').addEventListener('click', function (event) {
    event.preventDefault();
    var creatingElement = document.querySelector('.creating');
    creatingElement.setAttribute('style', 'display: none;');
});

document.querySelector('.redo-form_send').addEventListener('click', function (event) {
    event.preventDefault();
});