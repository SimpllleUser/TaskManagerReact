import axios from "axios"
import { CREATE_G_TASK, DELETE_G_TASK, EDIT_G_TASK, SET_G_TASKS } from "./types";

const URL_API = 'http://localhost:8080/api'
export const createGlobalTask = (id, global_task) => async(dispatch) => {
    const res = await axios.post(URL_API + '/project/create/global-task', { id, global_task })
    dispatch({ type: CREATE_G_TASK, global_task: res.data })
}


export const deleteGlobalTask = (id, global_taskId) => {
    return async(dispatch, stateTask) => {
        await axios.delete(URL_API + '/project/delete/global-task', { data: { id, global_taskId } })
        dispatch({ type: DELETE_G_TASK, id: global_taskId })
    }
}

export const editGlobalTask = (global_task) => async(dispatch) => {
    const { id, title, description } = global_task
    await axios.put(URL_API + '/global_task/' + id, {
        title,
        description,
    })

    dispatch({ type: EDIT_G_TASK, global_task })
}

export const setGlobalTasks = (global_tasks) => ({
    type: SET_G_TASKS,
    global_tasks
})