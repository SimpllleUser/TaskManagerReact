import { CREATE_TASK, GET_TASKS, DELETE_TASK, EDIT_TASK } from "./types";


const initialState = {
    tasks: []
}

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                events: state.events.concat([action.event])
            }
        case GET_TASKS:
            return {
                ...state,
                events: state.events = action.events
            }
        case DELETE_TASK:
            return {
                ...state,
                events: state.events.filter(e => e.id !== action.id)
            };
        case EDIT_TASK:
            let event = action.event
            return {
                ...state,
                events: state.events.map(e => e.id === event.id ? event : e)
            };
        default:
            return state
    }
}