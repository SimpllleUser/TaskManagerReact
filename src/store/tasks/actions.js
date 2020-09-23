import axios from "axios"
import {
    CREATE_TASK,
    GET_ALLTASKS,
    DELETE_TASK,
    EDIT_TASK,
} from "./types";

const URL_API = 'http://localhost:8080/api'

export const createTask = (task) => async(dispatch) => {

    const response = await axios.post(URL_API + '/tasks', {
        task
    })
    dispatch({ type: CREATE_TASK, task: response.data })
}

export const createTaskInGlobal_task = (payload) => {
    const { id, newTask } = payload
    return async(dispatch, stateTask) => {
        const res = await axios.post(URL_API + '/tasks/create/in_global-task', {
            id,
            task: newTask
        })
        dispatch({ type: CREATE_TASK, task: res.data })
    }
}

export const deleteTaskInGlobal_task = ({ id, taskId }) => async(dispatch) => {
    await axios.delete(URL_API + '/tasks/delete/in_global-task', {
        data: {
            id,
            taskId
        }
    })
    dispatch({ type: DELETE_TASK, id: taskId })
}

export const saveEditableTask = (task) => async(dispatch) => {
    await axios.put(URL_API + '/tasks/' + task.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        type: task.type,
    })
    dispatch({ type: EDIT_TASK, task })
}

export const initTasks = (tasks) => {
    return {
        type: GET_ALLTASKS,
        tasks
    }
}