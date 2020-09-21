import axios from "axios"
import {
    CREATE_TASK,
    GET_ALLTASKS,
    FECTH_TASKS,
    SHOW_LOADER,
    HIDE_LOADER,
    DELETE_TASK,
    EDIT_TASK,
} from "./types";

const URL_API = 'http://localhost:8080/api'


export function createTask(task) {
    return (dispatch, stateTask) => {

        axios.post(URL_API + '/tasks', {
            title: task.title,
            description: task.description,
            estimate: task.estimate,
            status: task.status,
            priority: task.priority,
            type: task.type,
            date: task.date

        }).then(
            response => dispatch({ type: CREATE_TASK, task: response.data }),
        )
    }
}

export const getAllTasks = () => async(dispatch) => {

    try {
        const res = await axios.get(URL_API + '/tasks')
        const tasks = res.data
        dispatch({
            type: GET_ALLTASKS,
            tasks
        })
    } catch (error) {
        // Add alert Error !!!
        console.log(error)
    }


}

export function showLoader() {
    return {
        type: SHOW_LOADER
    };
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    };
}

export function deleteTask(id) {

    return (dispatch, stateTask) => {
        axios.delete(URL_API + '/tasks/' + id)
            .then(
                response => {
                    dispatch({ type: DELETE_TASK, id })
                }
            )
    }
}

export function saveEditableTask(task) {
    return (dispatch, stateTask) => {
        axios.put(URL_API + '/tasks/' + task.id, {
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                type: task.type,
            })
            .then(
                response => {
                    dispatch({ type: EDIT_TASK, task })
                }
            )
    }
}

export function fetchedTasks() {
    return async dispatch => {
        dispatch(showLoader());
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/tasks?_limit=5"
        );
        const json = await response.json();
        setTimeout(() => {
            dispatch({ type: FECTH_TASKS, payload: json });
            dispatch(hideLoader());
        }, 500);
    };
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

export const deleteTaskInGlobal_task = (payload) => {
    const { id, taskId } = payload

    return async(dispatch, stateTask) => {

        await axios.delete(URL_API + '/tasks/delete/in_global-task', {
            data: {
                id,
                taskId
            }
        })
        dispatch({ type: DELETE_TASK, id: taskId })
    }
}

export const initTasks = (tasks) => {
    return {
        type: GET_ALLTASKS,
        tasks
    }
}