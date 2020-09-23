// import { CREATE_TASK, DELETE_TASK } from "../tasks/types";
import { SET_G_TASKS, CREATE_G_TASK, DELETE_G_TASK, EDIT_G_TASK } from "./types";

const initialState = {
    global_tasks: []
}

export const global_taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_G_TASK:
            return {
                ...state,
                global_tasks: state.global_tasks.concat([action.global_task])
            }
        case SET_G_TASKS:
            return {
                ...state,
                global_tasks: state.global_tasks = action.global_tasks
            }
        case DELETE_G_TASK:
            return {
                ...state,
                global_tasks: state.global_tasks.filter(g_task => g_task.id != action.id)
            }
        case EDIT_G_TASK:
            let global_task = action.global_task
            return {
                ...state,
                global_tasks: state.global_tasks.map(g_task => g_task.id === global_task.id ? global_task : g_task)
            }
        default:
            return state
    }
}