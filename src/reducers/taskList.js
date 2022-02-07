import * as types from '../constants/ActionTypes'

const generateID = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const save = (taskList) => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

const initialState = JSON.parse(localStorage.getItem('taskList')) || [];

const myReducer = (state = initialState, action) => {
    let newTaskList = [];
    switch (action.type) {

        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            if (action.payload.id) {
                newTaskList = state.map(task => {
                    return task.id === action.payload.id ? action.payload : task;
                })
            } else {
                action.payload.id = generateID();
                newTaskList = [...state, action.payload];
            }
            
            save(newTaskList);
            return newTaskList;

        case types.DELETE_TASK:
            newTaskList = state.filter(task => task.id !== action.payload);
            save(newTaskList);
            return newTaskList;

        case types.UPDATE_STATUS_TASK:
            newTaskList = state.map(task => {
                if (task.id === action.payload) task.status = !task.status
                return {...task}; // Memo problem -> destructuring to change memory address
            })
            save(newTaskList);
            return newTaskList;

        default:
            return state;
    }
}

export default myReducer;