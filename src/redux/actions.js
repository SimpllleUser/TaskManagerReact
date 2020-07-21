import axios from "axios"
import {
    CREATE_TASK,
    GET_ALLTASKS,
    FECTH_TASKS,
    SHOW_LOADER,
    HIDE_LOADER,
    DELETE_TASK,
    EDIT_TASK,
    CREATE_CALENDAR_EVENT
} from "./types";

const URL_API = 'http://localhost:8080/api'

export function createTask(task) {

    return (dispatch, stateTask) => {

        axios.post(URL_API + '/tasks', {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority

        }).then(
            response => dispatch({ type: CREATE_TASK, task: response.data }),
        )
    }
}

export function getAllTasks() {

    return (dispatch, stateTask) => {

        axios.get(URL_API + '/tasks').then(
            response => dispatch({ type: GET_ALLTASKS, tasks: response.data }),
        )
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

    // return { type: DELETE_TASK, id };
}

export function saveEditableTask(task) {
    console.log('EDITABLE TASK', task)
    return (dispatch, stateTask) => {
        axios.put(URL_API + '/tasks/' + task.id, {
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
            })
            .then(
                response => {
                    dispatch({ type: EDIT_TASK, task })
                    console.log('response', response)
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

export function createEvent(event) {
    return (dispatch, stateTask) => {

        axios.post(URL_API + '/calendar-event', {
            title: event.title,
            description: event.description,
            date: event.date
        }).then(
            response => dispatch({ type: CREATE_CALENDAR_EVENT, event }),
        )
    }
}