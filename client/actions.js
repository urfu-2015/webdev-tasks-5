export const  addNote  = note => {
    return {
        type: 'ADD_NOTE',
        note
    };
};

export const  delNote = id => {
    return {
        type: 'DEL_NOTE',
        id
    };
};

export const editNote = note => {
    return {
        type: 'EDIT_NOTE',
        note
    };
};

export const updateNotes = notes => {
    return {
        type: 'UPDATE_NOTES',
        notes
    };
};

export const swipeLeft = id => {
    return {
        type: 'SWIPE_LEFT',
        id
    };
};

export const swipeRight = id => {
    return {
        type: 'SWIPE_RIGHT'
    };
};

export function fetchAddNote(task) {
    return dispatch => {
        return fetch('/todos/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({task})
        })
            .then(response => response.json())
            .then(json => {
                dispatch(addNote(json))
            });
    };
}

export function fetchEditNote(newText, id) {
    return dispatch => {
        return fetch('/todos/edit', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id, newText})
        })
            .then(response => response.json())
            .then(json => {
                dispatch(editNote(json))
            });
    };
}

export function fetchDeleteNote(id) {
    return dispatch => {
        return fetch('/todos/delete', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id})
        })
            .then(response => response.json())
            .then(json => {
                dispatch(delNote(json))
            });
    };
}

export function fetchUpdateNotes() {
    return dispatch => {
        fetch('/todos')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                dispatch(updateNotes(data.notes));
            });
    };
}
