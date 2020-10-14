import axios from "axios"
import { useState, useCallback } from "react"
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../store/loader/actions"
import { showError } from "../store/error/actions"

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { 'x-access-token': user.token };
    } else {
        return {};
    }
}

// !FIX useHtpp add useCallback
export const useHttp = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const request = useCallback(async(url, method = 'get', body = null) => {
        setLoading(true)
        try {
            dispatch(showLoader())
                // ! ADD HEADER TOKEN
            const res = await axios[method](url, body)
            const data = res.data
            dispatch(hideLoader())
            return data
        } catch (err) {
            setLoading(false)
            dispatch(hideLoader())
            dispatch(showError(err))
        }
        dispatch(hideLoader())

    }, [])

    const clearErr = useCallback(() => setErr(null), [])

    return { request, err, clearErr }

}