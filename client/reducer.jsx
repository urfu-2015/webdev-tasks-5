/**
 * Created by Надежда on 03.04.2016.
 */

//режим отображения
const modes = {redo: 'redo', delete: 'delete', nan:'nan', reload:'reload', creating: 'creating'};

exports.modes = modes;

const initialState = {
    remarks: [],
    selectedRemark: null,
    mode: modes.nan,
    diff: 0
};

exports.remarkApp = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'CREATE_REMARK':
            return {
                remarks: state.remarks.slice(),
                selectedRemark: null,
                mode: modes.creating,
                diff: 0
            };
        case 'NEW_REMARK':
            return {
                remarks: state.remarks.slice(),
                selectedRemark: action.index,
                mode: modes.redo,
                diff: 0
            };
        case 'ADD_REMARK':
            return {
                remarks: state.remarks.concat([action.remark]),
                selectedRemarks: null,
                mode: modes.nan,
                diff: 0,
                newText: action.text,
                indexUpdatedRemark: action.index
            };
        case 'SELECT_REMARK':
            return {
                remarks: state.remarks,
                selectedRemark: action.index,
                mode: modes.redo,
                diff: 0
            };
        case 'UPDATE_REMARK':
            let res = state.remarks.slice();
            res[action.index] = action.remark;
            return {
                remarks: res,
                selectedRemark: null,
                mode: modes.nan,
                diff: 0,
                newText: action.text,
                indexUpdatedRemark: action.index
            };
        case 'CHOOSE_FOR_DELETE':
            return {
                remarks: state.remarks,
                selectedRemark: action.index,
                mode: modes.delete,
                diff: action.diff
            };
        case 'RELOAD_REMARKS':
        case 'FIRST_LOAD_REMARKS':
            return {
                remarks: action.remarks,
                selectedRemark: null,
                mode: modes.nan,
                diff: 0
            };
        case 'START_RELOAD':
            return {
                remarks: state.remarks,
                selectedRemark: null,
                mode: modes.reload,
                diff: 0
            };
        case 'CANCEL_DELETE':
            return {
                remarks: state.remarks,
                selectedRemark: null,
                mode: modes.nan,
                diff: 0
            };
        case 'DELETE_REMARK':
            let result = state.remarks.slice(0, action.index).concat(state.remarks.slice(action.index + 1));
            return {
                remarks: result,
                selectedRemark: null,
                mode: modes.nan,
                diff: 0
            };
        case 'CANCEL_CREATING':
        case 'CANCEL_UPDATING':
            return {
                remarks: state.remarks,
                selectedRemark: null,
                mode: modes.nan,
                diff: 0
            };
        default:
            return state;
    }
};