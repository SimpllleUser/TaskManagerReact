import axios from "axios";
import {
    CREATE_TASK,
    GET_ALLTASKS,
    DELETE_TASK,
    EDIT_TASK,
    SET_WORKLOG,
    GET_TASKS
} from "./types";
import { showLoader, hideLoader } from "../loader/actions";
import { showError } from "../error/actions";
const author = JSON.parse(localStorage.getItem("user")).userId;
const URL_API = "http://localhost:8080/api";

export const createTask = ({ id, task, user_id }) => async(dispatch) => {

    try {
        dispatch(showLoader());
        const response = await axios.post(URL_API + "/tasks", {
            globalTaskID: id,
            newTask: task,
            authorID: user_id,
        });
        dispatch({ type: CREATE_TASK, task: response.data });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};

export const deleteTaskInGlobal_task = ({ id, taskId }) => async(dispatch) => {
    try {
        const author_UserID = JSON.parse(
            JSON.stringify(localStorage.getItem("user").userId)
        );
        dispatch(showLoader());
        await axios.delete(URL_API + "/tasks/delete/in_global-task", {
            data: {
                id,
                author_UserID,
                taskId,
            },
        });
        dispatch({ type: DELETE_TASK, id: taskId });
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
    dispatch(hideLoader());
};
export const updateOptionTask = ({ task_id, option }) => async(dispatch) => {
    try {
        dispatch(showLoader());
        const res = await axios.put(URL_API + "/tasks/" + task_id, {
            option,
            author,
        });
        dispatch({ type: EDIT_TASK, task: res.data });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};
export const saveEditableTask = (task) => async(dispatch) => {
    try {
        dispatch(showLoader());
        await axios.put(URL_API + "/tasks/" + task.id, {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            type: task.type,
        });
        dispatch({ type: EDIT_TASK, task });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};

export const setWorkLogToTask = ({ workLog, task_id }) => async(dispatch) => {
    try {
        dispatch(showLoader());
        await axios.put(URL_API + "/tasks/" + task_id, { workLog, author });
        dispatch({ type: SET_WORKLOG, data: { workLog, task_id } });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};
export const setCommentToTask = () => {

}

export const initTasks = (tasks) => ({
    type: GET_TASKS,
    tasks,
});


export const setAllTasks = (tasks) => ({
    type: GET_ALLTASKS,
    tasks,
});