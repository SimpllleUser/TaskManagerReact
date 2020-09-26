import axios from "axios"
import { CREATE_PROJECT, GET_PROJECTS, DELETE_PROJECT, EDIT_PROJECT } from "./types";
import { showLoader, hideLoader } from "../loader/actions"
const URL_API = 'http://localhost:8080/api'


export const getAllProjects = () => async(dispatch) => {

    try {
        dispatch(showLoader())
        const response = await axios.get(URL_API + '/project')
        dispatch({ type: GET_PROJECTS, projects: response.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        console.log("ERR", err.message)
    }

}

export const createProject = (project) => async(dispatch) => {
    const { title, description } = project
    try {
        dispatch(showLoader())
        const response = await axios.post(URL_API + '/project', {
            title,
            description
        })
        dispatch({ type: CREATE_PROJECT, project: response.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        console.log("ERR", err.message)
    }
}

export const deleteProject = (id) => async(dispatch) => {
    dispatch(showLoader())
    try {
        await axios.delete(URL_API + '/project/' + id)
        dispatch({ type: DELETE_PROJECT, id })
        dispatch(hideLoader())
    } catch (err) {
        console.log(err)
        dispatch(hideLoader())

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
        console.log(err)
    }

}