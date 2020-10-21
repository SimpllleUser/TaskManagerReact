import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {
    const storageName = 'user'
    const accountData = JSON.parse(localStorage.getItem('user')) || ''

    const [token, setToken] = useState(accountData.token || '');
    const [userId, setUserId] = useState(accountData.userId || '');

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }))
    }, [])
    const logout = useCallback(() => {
        setToken('')
        setUserId('')
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login]);

    return { login, logout, token, userId }
}