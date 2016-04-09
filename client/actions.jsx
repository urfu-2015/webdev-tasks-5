/**
 * Created by Надежда on 03.04.2016.
 */
//import fetch from 'isomorphic-fetch';

export const newRemark = () => {
    return {
        type: 'NEW_REMARK',
        remark: null
    }
};

export const addRemark = (remark, text) => {
    return {
        type: 'ADD_REMARK',
        remark,
        text
    }
};

export const selectRemark = remark => {
    return {
        type: 'SELECT_REMARK',
        remark
    }
};

export const updateRemark = (remark, text) => {
    return {
        type: 'UPDATE_REMARK',
        index: remark,
        text
    }
};

export const deleteRemark = remark => {
    return {
        type: 'DELETE_REMARK',
        remark
    }
};

export const changeOrder = () => {
    return {
        type: 'CHANGE_ORDER',
        remark: null
    }
};

export const reloadRemarks = () => {
    return {
        type: 'RELOAD_REMARKS',
        remark: null
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

export const chooseForDelete = (remark, diff) => {
    return {
        diff,
        type: 'CHOOSE_FOR_DELETE',
        remark
    }
};