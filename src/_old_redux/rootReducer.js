import { combineReducers } from 'redux'
import { tasksReducer } from './tasksReducer'
import { appReducer } from './appReducer'
import { calendarReducer } from './calendarReducer'

export const rootReducer = combineReducers({
    calendar: calendarReducer,
    tasks: tasksReducer,
    app: appReducer
})