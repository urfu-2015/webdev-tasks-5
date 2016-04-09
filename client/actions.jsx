/**
 * Created by Надежда on 03.04.2016.
 */
//import fetch from 'isomorphic-fetch';

export const newRemark = () => {
    return {
        type: 'NEW_REMARK'
    }
};

export const addRemark = (remark, text, index) => {
    return {
        type: 'ADD_REMARK',
        remark,
        text,
        index
    }
};

export const createRemark = () => {
    return {
        type: 'CREATE_REMARK'
    }
};

export const canselAdding = () => {
    return {
        type: 'CANCEL_ADDING'
    }
};

export const selectRemark = index => {
    return {
        type: 'SELECT_REMARK',
        index
    }
};

export const updateRemark = (remark, text, index) => {
    return {
        type: 'UPDATE_REMARK',
        remark,
        text,
        index
    }
};

export const cancelUpdating = () => {
    return {
        type: 'CANCEL_UPDATING'
    }
}

export const deleteRemark = index => {
    return {
        type: 'DELETE_REMARK',
        index
    }
};

export const changeOrder = () => {
    return {
        type: 'CHANGE_ORDER'
    }
};

export const reloadRemarks = () => {
    return {
        type: 'RELOAD_REMARKS'
    }
};

export const firstLoadRemarks = (remarks) => {
    return {
        type: 'FIRST_LOAD_REMARKS',
        remarks
    }
};

export const startReload = () => {
    return {
        type: 'START_RELOAD'
    }
};
//для ассинхронной фунции

/*function requestRemarks() {
    return {
        type: 'REQUEST_REMARKS',
        remark: null
    }
}

function receiveRemarks(data) {
    return {
        type: 'RECEIVE_REMARKS',
        remarks: data.remarks
    }
}

function fetchRemarks() {
    return dispatch => {
        dispatch(requestRemarks());
        return fetch('/api/remarks')
            .then(response => response.json())
            .then(json => dispatch(receiveRemarks(json)))
    }
}

export function firstLoadRemarks() {
    return (dispatch) => {
        return dispatch(fetchRemarks())
    }
}*/

export const chooseForDelete = (index, diff) => {
    return {
        diff,
        type: 'CHOOSE_FOR_DELETE',
        index
    }
};

export const cancelDelete = (index) => {
    return {
        type: 'CANCEL_DELETE',
        index
    }
};