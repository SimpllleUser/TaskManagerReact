import { SET_GTASKS, CREATE_GTASKS, DELETE_GTASKS, EDIT_GTASKS, SET_All_GTASKS } from "./types";

const initialState = {
    global_tasks: [],
    allGlobalTasks: []
}

export const global_taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GTASKS:
            return {
                ...state,
                global_tasks: state.global_tasks.concat([action.global_task])
            }
        case SET_GTASKS:
            return {
                ...state,
                global_tasks: state.global_tasks = action.global_tasks
            }
        case SET_All_GTASKS:
            return {
                ...state,
                allGlobalTasks: state.allGlobalTasks = action.global_tasks
            }
        case DELETE_GTASKS:
            return {
                ...state,
                global_tasks: state.global_tasks.filter(GTASKS => GTASKS.id != action.id)
            }
        case EDIT_GTASKS:
            let global_task = action.global_task
            return {
                ...state,
                global_tasks: state.global_tasks.map(GTASKS => GTASKS.id === global_task.id ? global_task : GTASKS)
            }
        default:
            return state
    }
}