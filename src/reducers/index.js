import { combineReducers } from 'redux'
import taskList from './taskList'
import isDisplayForm  from './isDisplayForm'
import itemEditing from './itemEditing'
import filterTable from './filterTable'
import search from './search'
import sort from './sort'

const myReducer = combineReducers({
    taskList,
    isDisplayForm,
    itemEditing,
    filterTable,
    search, 
    sort  
})

export default myReducer;