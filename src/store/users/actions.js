import axios from "axios"
import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
} from "./types";
import { showLoader, hideLoader } from "../loader/actions"
import { showError } from "../error/actions"
const URL_API = 'http://localhost:8080/api'

export const getUsers = ({ project_id }) => async(dispatch) => {

    try {
        dispatch(showLoader())
        const response = await axios.get(URL_API + '/user/all/' + project_id, )
        dispatch({ type: GET_USERS, users: response.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }

}


export const deleteUeser = ({ project_id, uesr_id }) => async(dispatch) => {
    try {
        dispatch(showLoader())
        await axios.delete(URL_API + '/user/delete-from-project', {
            data: {
                project_id,
                uesr_id,
            }
        })
        dispatch({ type: DELETE_USER, uesr_id })
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
    dispatch(hideLoader())


}

export const addUser = ({ user_id, project_id }) => async(dispatch) => {
    console.log('user_id, project_id', user_id, project_id)
    try {
        dispatch(showLoader())
        const res = await axios.post(URL_API + '/user/addUser', {
            user_id,
            project_id
        })
        console.log('res.user', 'res', res.data, res)
        dispatch({ type: ADD_USER, user: res.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }

}