import axios from "axios"
import { CREATE_PROJECT, GET_PROJECTS, DELETE_PROJECT, EDIT_PROJECT } from "./types";
const URL_API = 'http://localhost:8080/api'


export const getAllProjects = () => async(dispatch) => {

    try {
        const response = await axios.get(URL_API + '/project')
        dispatch({ type: GET_PROJECTS, projects: response.data })
    } catch (err) {
        console.log("ERR", err.message)
    }

}

export const createProject = (project) => async(dispatch) => {
    const { title, description } = project
    try {
        const response = await axios.post(URL_API + '/project', {
            title,
            description
        })
        dispatch({ type: CREATE_PROJECT, project: response.data })
    } catch (err) {
        console.log("ERR", err.message)
    }
}

export const deleteProject = (id) => async(dispatch) => {
    await axios.delete(URL_API + '/project/' + id)
    dispatch({ type: DELETE_PROJECT, id })
}

export const editProject = (project) => async(dispatch) => {
    const { id, title, description } = project
    await axios.put(URL_API + '/project/' + id, {
        title,
        description,
    })
    dispatch({ type: EDIT_PROJECT, project })
}