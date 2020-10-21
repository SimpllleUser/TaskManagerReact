import {
    SHOW_ERR,
    HIDE_ERR
} from "./types.js"

export const showError = (err) => (dispatch) => {
    const error = { title: err.name, body: err.message }
    dispatch({ type: SHOW_ERR, error })
}
export const hideErr = () => ({ type: HIDE_ERR })