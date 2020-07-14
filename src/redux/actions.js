import {
    CREATE_TASK,
    FECTH_TASKS,
    SHOW_LOADER,
    HIDE_LOADER,
    DELETE_TASK,
    EDIT_TASK,
    CREATE_CALENDAR_EVENT
} from "./types";

export function createTask(task) {
    return {
        type: CREATE_TASK,
        payload: task
    };
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
    return { type: DELETE_TASK, id };
}

export function saveEditableTask(task) {
    return { type: EDIT_TASK, task }
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
    return { type: CREATE_CALENDAR_EVENT, event }
}