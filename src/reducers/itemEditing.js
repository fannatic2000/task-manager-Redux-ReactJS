import * as types from '../constants/ActionTypes'

const initialState = {};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_TASK:
            return {...action.payload};
        case types.CLEAR_EDIT_TASK:
            return {};
        default:
            return state;
    }
}

export default myReducer;