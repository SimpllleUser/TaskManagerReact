import axios from "axios"
// import { CREATE_TASK, DELETE_TASK } from "../tasks/types";
import { CREATE_G_TASK, DELETE_G_TASK, EDIT_G_TASK, SET_G_TASKS } from "./types";

const URL_API = 'http://localhost:8080/api'
export const createGlobalTask = (id, global_task) => {
    return async(dispatch, stateEvent) => {
        const res = await axios.post(URL_API + '/project/create/global-task', { id, global_task })
        dispatch({ type: CREATE_G_TASK, global_task: res.data })
    }
}

export const getTaskFromGlobalTasks = (global_task) => {
    return async(dispatch, stateEvent) => {
        await axios.put(URL_API + '/global-task/' + global_task._id, { global_task })
    }
}

export const deleteGlobalTask = (id, global_taskId) => {
    return async(dispatch, stateTask) => {
        await axios.delete(URL_API + '/project/delete/global-task', { data: { id, global_taskId } })
        dispatch({ type: DELETE_G_TASK, id: global_taskId })
    }
}

export function editGlobalTask(global_task) {
    const { id, title, description } = global_task
    return async(dispatch, stateTask) => {
        await axios.put(URL_API + '/global_task/' + id, {
            title,
            description,
        })

        dispatch({ type: EDIT_G_TASK, global_task })
    }
}

export const setGlobalTasks = (global_tasks) => ({
    type: SET_G_TASKS,
    global_tasks
})