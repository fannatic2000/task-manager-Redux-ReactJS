import * as types from '../constants/ActionTypes'

// taskList
export const listAll = () => {
    return {
        type: types.LIST_ALL,
    }
}

export const saveTask = (payload) => {
    return {
        type: types.SAVE_TASK,
        payload,
    }
}

export const deleteTask = (payload) => {
    return {
        type: types.DELETE_TASK,
        payload,
    }
}

export const updateStatus = payload => {
    return {
        type: types.UPDATE_STATUS_TASK,
        payload
    }
}

// Form
export const editTask = payload => {
    return {
        type: types.EDIT_TASK,
        payload
    }
}

export const clearEditTask = () => {
    return {
        type: types.CLEAR_EDIT_TASK,
    }
}


export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM,
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM,
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
}

// Filter tabel
export const filterTable = (payload) => {
    return {
        type: types.FILTER_TABLE,
        payload
    }
}

// Search
export const searchTask = (payload) => {
    return {
        type: types.SEARCH,
        payload
    }
}

// Sort
export const sortTask = (payload) => {
    return {
        type: types.SORT,
        payload
    }
}