export function createNote(text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/notes', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(text);
    callback();
}

export function getListNotes(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/notes', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var notesFromMemory = JSON.parse(xhr.responseText).notes;
            callback(notesFromMemory);
        }
    };
    xhr.send();
}

export function removeNote(text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/notes', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(text);
    callback();
}

export function updateNote(text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/notes', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(text);
    callback();
}
