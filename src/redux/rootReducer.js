import { combineReducers } from 'redux'
import { postsReducer } from './postsReducer'
import { appReducer } from './appReducer'
import { calendarReducer } from './calendarReducer'

export const rootReducer = combineReducers({
    calendar: calendarReducer,
    posts: postsReducer,
    app: appReducer
})