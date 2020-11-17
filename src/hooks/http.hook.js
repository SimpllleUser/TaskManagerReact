import axios from "axios"
import { useState, useCallback } from "react"
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../store/loader/actions"
import { showError } from "../store/error/actions"
import { config } from "dotenv";
const user = JSON.parse(localStorage.getItem('user'));
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { 'x-access-token': user.token };
    } else {
        return {};
    }
}

export const useHttp = () => {
    const dispatch = useDispatch();
    axios.defaults.baseURL = 'http://localhost:8080/api'
    axios.interceptors.request.use(
        config => {
            config.headers['x-access-token'] = user.token
            return config
        },
        error => {
            return Promise.reject(err)
        }
    )
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

// WORKED HOOK

// import axios from "axios"
// import { useState, useCallback } from "react"
// import { useDispatch } from "react-redux";
// import { showLoader, hideLoader } from "../store/loader/actions"
// import { showError } from "../store/error/actions"

// const authHeader = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.token) {
//         return { 'x-access-token': user.token };
//     } else {
//         return {};
//     }
// }

// export const useHttp = () => {
//     const dispatch = useDispatch();
//     axios.defaults.baseURL = 'http://localhost:8080/api'
//     const [loading, setLoading] = useState(false)
//     const [err, setErr] = useState(null)
//     const request = useCallback(async(url, method = 'get', body = null) => {
//         setLoading(true)
//         try {
//             dispatch(showLoader())
//                 // ! ADD HEADER TOKEN
//             const res = await axios[method](url, body)
//             const data = res.data
//             dispatch(hideLoader())
//             return data
//         } catch (err) {
//             setLoading(false)
//             dispatch(hideLoader())
//             dispatch(showError(err))
//         }
//         dispatch(hideLoader())

//     }, [])

//     const clearErr = useCallback(() => setErr(null), [])

//     return { request, err, clearErr }

// }