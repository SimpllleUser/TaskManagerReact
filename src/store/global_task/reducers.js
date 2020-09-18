// import { CREATE_TASK, DELETE_TASK } from "../tasks/types";
import { GET_G_TASKS, CREATE_G_TASK, DELETE_G_TASK, EDIT_G_TASK } from "./types";

const initialState = {
    tasks: []
}

export const global_taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_G_TASK:
            return {
                ...state,
                events: state.events.concat([action.event])
            }
        case GET_G_TASKS:
            return {
                ...state,
                events: state.events = action.events
            }
        case DELETE_G_TASK:
            return {
                ...state,
                events: state.events.filter(e => e.id !== action.id)
            };
        case EDIT_G_TASK:
            let event = action.event
            return {
                ...state,
                events: state.events.map(e => e.id === event.id ? event : e)
            };
        default:
            return state
    }
}