/**
 * Created by Надежда on 03.04.2016.
 */

//режим отображения
const modes = {redo: 'redo', delete: 'delete', nan:'nan', reload:'reload'};

exports.modes = modes;

const initialState = {
    remarks: [],
    selectedRemark: null,
    mode: modes.nan,
    diff: 0,
};

exports.remarkApp = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'NEW_REMARK':
            return {
                remarks: state.remarks.slice(),
                selectedRemark: action.remark,
                mode: modes.redo,
                diff: 0
            };
        case 'ADD_REMARK':
            return {
                remarks: state.remarks.concat([action.remark]),
                selectedRemarks: null,
                mode: modes.nan,
                diff: 0,
                newText: action.text
            };
        case 'SELECT_REMARK':
            return {
                remarks: state.remarks,
                selectedRemark: action.remark,
                mode: modes.redo,
                diff: 0
            };
        case 'UPDATE_REMARK':
            return {
                remarks: state.remarks,
                selectedRemark: null,
                mode: modes.nan,
                diff: 0,
                newText: action.text,
                indexUpdatedRemark: action.index
            };
        case 'CHOOSE_FOR_DELETE':
            return {
                remarks: state.remarks,
                selectedRemark: action.remark,
                mode: modes.delete,
                diff: action.diff
            };
        case 'DELETE_REMARK':
            return {
                remarks: state.remarks.filter(elem => {
                    if (elem !== remarks) {
                        return elem;
                    }
                }),
                selectedRemark: null,
                mode: modes.nan,
                diff: 0
            };
        case 'CHANGE_ORDER':
            return {
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
        default:
            return state;
    }
};