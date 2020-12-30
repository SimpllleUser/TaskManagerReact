import axios from "axios"
import { CREATE_GTASKS, DELETE_GTASKS, EDIT_GTASKS, SET_GTASKS, SET_All_GTASKS } from "./types";
import { showError } from "../error/actions"
import { showLoader, hideLoader } from "../loader/actions"

const URL_API = process.env.REACT_APP_API_URL+'api'
export const createGlobalTask = (global_task) => async(dispatch) => {

    try {
        dispatch(showLoader())
        const res = await axios.post(URL_API + '/global-task', global_task)
        dispatch({ type: CREATE_GTASKS, global_task: res.data })
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
        dispatch({ type: DELETE_GTASKS, id: global_taskId })
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
        await axios.put(URL_API + '/global-task/' + id, {
            title,
            description,
        })
        dispatch({ type: EDIT_GTASKS, global_task })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))

    }
}

export const setGlobalTasks = (global_tasks) => ({
    type: SET_GTASKS,
    global_tasks
})

export const setAllGlobalTasks = (global_tasks) => ({
    type: SET_All_GTASKS,
    global_tasks
})