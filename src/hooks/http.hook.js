import axios from "axios"
import { useState, useCallback } from "react"
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../store/loader/actions"
import { showError } from "../store/error/actions"
// import {config} from "dotenv";
const user = JSON.parse(localStorage.getItem('user'));

// axios.interceptors.request.use(config => {
//         config.headers.authorization = `Bearer ${user.token}`
//         return config
//     },
//     err => {
//         return Promise.reject(err)
//     }
// )

export const useHttp = () => {
    const dispatch = useDispatch();
    axios.defaults.baseURL = process.env.REACT_APP_API_URL + 'api'
    if (user) {
        axios.interceptors.request.use(
            config => {
                config.headers['x-access-token'] = user.token
                return config
            },
            error => {
                return Promise.reject(err)
            }
        )
    }
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
    const request = useCallback(async(url, method = 'get', body = null) => {
        setLoading(true)
        console.log(axios.defaults.baseURL + url)
        try {
            dispatch(showLoader())
                // ! ADD HEADER TOKEN
            console.log()
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