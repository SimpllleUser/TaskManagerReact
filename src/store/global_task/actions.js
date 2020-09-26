import axios from "axios"
import { CREATE_G_TASK, DELETE_G_TASK, EDIT_G_TASK, SET_G_TASKS } from "./types";
import { showLoader, hideLoader } from "../loader/actions"

const URL_API = 'http://localhost:8080/api'
export const createGlobalTask = (id, global_task) => async(dispatch) => {
    try {
        dispatch(showLoader())
        const res = await axios.post(URL_API + '/project/create/global-task', { id, global_task })
        dispatch({ type: CREATE_G_TASK, global_task: res.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        console.log(err)
    }

}


export const deleteGlobalTask = (id, global_taskId) => async(dispatch) => {
    try {
        dispatch(showLoader())
        await axios.delete(URL_API + '/project/delete/global-task', { data: { id, global_taskId } })
        dispatch({ type: DELETE_G_TASK, id: global_taskId })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        console.log(err)
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
        console.log(err)
    }

}

export const setGlobalTasks = (global_tasks) => ({
    type: SET_G_TASKS,
    global_tasks
})