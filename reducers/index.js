import {combineReducers} from 'redux'
import todos from './todos'
import swipe from './swipe'

const rootReducer = combineReducers({
    todos,
    swipe
});

export default rootReducer
