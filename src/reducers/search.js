import * as types from '../constants/ActionTypes'

const initialState = ''

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH:
            return action.payload.toLowerCase();
        default:
            return state;
    }
}

export default myReducer;