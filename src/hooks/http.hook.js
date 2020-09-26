import axios from "axios"
import { useState, useCallback } from "react"
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../store/loader/actions"
// !FIX useHtpp add useCallback
export const useHttp = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const request = useCallback(async(url, method = 'get', body = null) => {
        setLoading(true)
        try {
            dispatch(showLoader())
            const res = await axios[method](url)
            const data = res.data
                // setLoading(false)
            dispatch(hideLoader())
            return data
        } catch (error) {
            // setLoading(false)
            dispatch(hideLoader())
            console.log(error)
        }
        dispatch(hideLoader())

    }, [])

    const clearErr = useCallback(() => setErr(null), [])

    return { request, err, clearErr }

}