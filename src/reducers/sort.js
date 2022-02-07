import * as types from '../constants/ActionTypes'

const initialState = {
    by: 'name',
    value: 1
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

export default myReducer;