/**
 * Created by Надежда on 03.04.2016.
 */

//режим отображения
const modes = {redo: 'redo', delete: 'delete', nan:'nan'};

const initialState = {
    remarks: [],
    selectedRemark: null,
    mode: modes.nan
};

exports.remarkApp = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'NEW_REMARK':
            return {
                remarks: state.remarks.slice(),
                selectedRemark: action.remark,
                mode: modes.redo
            };
        case 'ADD_REMARK':
            return {
                remarks: state.remarks.concat([action.remark]),
                selectedRemarks: null,
                mode: modes.nan
            };
        case 'SELECT_REMARK':
            return {
                remarks: state.remarks,
                selectedRemark: action.remark,
                mode: modes.redo
            };
        case 'UPDATE_REMARK':
            return {
                remarks: state.remarks,
                selectedRemark: null,
                mode: modes.nan
            };
        case 'CHOOSE_FOR_DELETE':
            return {
                remarks: state.remarks,
                selectedRemark: action.remark,
                mode: modes.delete
            };
        case 'DELETE_REMARK':
            return {
                remarks: state.remarks.filter(elem => {
                    if (elem !== remarks) {
                        return elem;
                    }
                }),
                selectedRemark: null,
                mode: modes.nan
            };
        case 'CHANGE_ORDER':
            return {
            };
        case 'RELOAD_REMARKS':
            return {

            };
        case 'FIRST_LOAD_REMARKS':
            return {
                remarks: action.remarks,
                selectedRemark: null,
                mode: modes.nan
            };
        default:
            return state;
    }
};