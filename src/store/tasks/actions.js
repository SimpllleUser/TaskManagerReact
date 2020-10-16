import axios from "axios"
import {
    CREATE_TASK,
    GET_ALLTASKS,
    DELETE_TASK,
    EDIT_TASK,
} from "./types";
import { showLoader, hideLoader } from "../loader/actions"
import { showError } from "../error/actions"
const URL_API = 'http://localhost:8080/api'

export const createTask = ({ global_taskID, task, author_UserID }) => async(dispatch) => {
    try {
        dispatch(showLoader())
        const response = await axios.post(URL_API + '/tasks', {
            global_taskID,
            newTask: task,
            author_UserID
        })
        dispatch({ type: CREATE_TASK, task: response.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }

}

// export const createTaskInGlobal_task = (payload) => async(dispatch) => {
//     const { id, task } = payload
//     try {
//         dispatch(showLoader())
//         const res = await axios.post(URL_API + '/tasks/create/in_global-task', {
//             id,
//             task: task
//         })
//         dispatch({ type: CREATE_TASK, task: res.data })
//         dispatch(hideLoader())
//     } catch (err) {
//         dispatch(hideLoader())
//         dispatch(showError(err))
//     }
//     dispatch(hideLoader())

// }
export const deleteTaskInGlobal_task = ({ id, taskId }) => async(dispatch) => {
    try {
        const author_UserID = JSON.parse(JSON.stringify(localStorage.getItem('user').userId))
        dispatch(showLoader())
        await axios.delete(URL_API + '/tasks/delete/in_global-task', {
            data: {
                id,
                author_UserID,
                taskId
            }
        })
        dispatch({ type: DELETE_TASK, id: taskId })
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
    dispatch(hideLoader())


}

export const saveEditableTask = ({ task }) => async(dispatch) => {
    try {
        dispatch(showLoader())
        await axios.put(URL_API + '/tasks/' + task.id, {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            type: task.type,
        })
        dispatch({ type: EDIT_TASK, task })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }

}

export const initTasks = (tasks) => {
    return {
        type: GET_ALLTASKS,
        tasks
    }
}