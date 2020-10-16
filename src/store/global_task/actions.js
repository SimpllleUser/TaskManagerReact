import axios from "axios"
import { CREATE_G_TASK, DELETE_G_TASK, EDIT_G_TASK, SET_G_TASKS } from "./types";
import { showError } from "../error/actions"
import { showLoader, hideLoader } from "../loader/actions"

const URL_API = 'http://localhost:8080/api'
export const createGlobalTask = (global_task) => async(dispatch) => {
    try {
        dispatch(showLoader())
        const res = await axios.post(URL_API + '/global-task', global_task)
        dispatch({ type: CREATE_G_TASK, global_task: res.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
}


export const deleteGlobalTask = (global_taskId) => async(dispatch) => {
    try {
        dispatch(showLoader())
        await axios.delete(URL_API + '/global-task/' + global_taskId)
        dispatch({ type: DELETE_G_TASK, id: global_taskId })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
}

export const editGlobalTask = (global_task) => async(dispatch) => {
    const { id, title, description } = global_task
    try {
        dispatch(showLoader())
        await axios.put(URL_API + '/global_task/' + id, {
            title,
            description,
        })
        dispatch({ type: EDIT_G_TASK, global_task })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))

    }
}

export const setGlobalTasks = (global_tasks) => ({
    type: SET_G_TASKS,
    global_tasks
})