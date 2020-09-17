import { useState, useCallback } from "react"
import axios from "axios"
// !FIX useHtpp add useCallback
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const request = useCallback(async(url, method = 'get', body = null) => {
        setLoading(true)
        try {
            const res = await axios[method](url)
            const data = res.data
            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }, [])

    const clearErr = useCallback(() => setErr(null), [])

    return { loading, request, err, clearErr }

}