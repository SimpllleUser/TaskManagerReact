import axios from "axios"
import { CREATE_PROJECT, SET_PROJECTS, DELETE_PROJECT, EDIT_PROJECT } from "./types";
import { setTasks } from "../tasks/actions"
import { setGlobalTasks } from "../global_task/actions"
import { showLoader, hideLoader } from "../loader/actions"
import { showError } from "../error/actions"

const URL_API = 'http://localhost:8080/api'
const userStorage = JSON.parse(localStorage.getItem("user"))
const selectProjectStorage = JSON.parse(localStorage.getItem("project")) || {}
const user_id = userStorage && userStorage.userId;

export const getAllProjects = () => async(dispatch) => {

    try {
        dispatch(showLoader())
        const response = await axios.get(URL_API + '/project/users/' + user_id)
        dispatch({ type: SET_PROJECTS, projects: response.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }

}

export const getAllDataFromProject = (id) => async(dispatch) => {
    try {
        dispatch(showLoader())
        const res = await axios.get(URL_API + '/project/allData/' + id)
        dispatch(setGlobalTasks(res.data.global_tasks))
        dispatch(setTasks(res.data.tasks))
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
}

export const createProject = (project) => async(dispatch) => {
    const { title, description } = project
    try {
        dispatch(showLoader())
        const response = await axios.post(URL_API + '/project', {
            title,
            description,
            user_id
        })
        if (!selectProjectStorage.title) {
            localStorage.setItem('project', JSON.stringify(project))
        }
        dispatch({ type: CREATE_PROJECT, project: response.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
}

export const deleteProject = ({ id, user_id }) => async(dispatch) => {
    dispatch(showLoader())

    try {
        await axios.delete(URL_API + '/project/' + id, { data: { user_id } })
        dispatch({ type: DELETE_PROJECT, id })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))

    }

}

export const editProject = (project) => async(dispatch) => {
    const { id, title, description } = project
    try {
        dispatch(showLoader())
        await axios.put(URL_API + '/project/' + id, {
            title,
            description,
        })
        dispatch({ type: EDIT_PROJECT, project })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
}

export const setProjects = (projects) => ({ type: SET_PROJECTS, projects })