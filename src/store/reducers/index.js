import { combineReducers } from 'redux'

import numbers from './numbers'
import todo from './todo'

export default combineReducers ({
    numbers,
    todo
})