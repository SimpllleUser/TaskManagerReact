import axios from "axios"
import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
} from "./types";
import { showLoader, hideLoader } from "../loader/actions"
import { showError } from "../error/actions"
const URL_API = process.env.REACT_APP_API_URL+'api'

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

export const deleteUser = ({ project_id, user_id }) => async(dispatch) => {
    try {
        dispatch(showLoader())
        await axios.delete(URL_API + '/user/delete-from-project', {
            data: {
                project_id,
                user_id,
            }
        })
        dispatch({ type: DELETE_USER, user_id })
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
    dispatch(hideLoader())
}

export const addUser = ({ user_id, project_id }) => async(dispatch) => {
    try {
        dispatch(showLoader())
        const res = await axios.post(URL_API + '/user/addUser', {
            user_id,
            project_id
        })
        dispatch({ type: ADD_USER, user: res.data })
        dispatch(hideLoader())
    } catch (err) {
        dispatch(hideLoader())
        dispatch(showError(err))
    }
}

export const initUsers = (users) => ({ type: GET_USERS, users })