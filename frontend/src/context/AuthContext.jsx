import { createContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [ authTokens, setAuthTokens ] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null )
    const [ user, setUser ] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null )
    const [ loading, setLoading ] = useState(true)

    const navigate = useNavigate()

    // this version does not currently support role based authenticating
    const loginUser = async (data, userType) => {
        try {
            console.log(userType)
            const response = await axios.post('api/auth/login', {
                email: data.email,
                password: data.password,
                type: userType
            })
            setAuthTokens(response.data)
            
            const user = jwtDecode(response.data.accessToken)
            setUser(user)

            localStorage.setItem('authTokens', JSON.stringify(response.data)) 

            navigate('/home')
        }
        catch (error) {
            throw error
        }
    }

    const registerUser = async (data) => {
        try {
            const response = await axios.post('api/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
            })

            setAuthTokens(response.data)
            
            const user = jwtDecode(response.data.accessToken)
            setUser(user)

            localStorage.setItem('authTokens', JSON.stringify(response.data)) 

            navigate('/home')
        }
        catch (error) {
            throw error
        }
    }

    const logoutUser = async () => {
        try {
            await axios.post('api/auth/logout', {
                refreshToken: authTokens.refreshToken
            })
        }
        catch (error) {
            console.log(`An error has occured during logout: ${error}`)
        }
        finally {
            setAuthTokens(null)
            setUser(null)
            localStorage.removeItem('authTokens')
        }
    }

    const updateToken = async () => {
        try {
            const response = await axios.post('api/auth/refresh', {
                refreshToken: authTokens.refreshToken
            })

            console.log("Token refreshed")
            console.log(response)
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.accessToken))
       
            localStorage.setItem('authTokens', JSON.stringify(response.data))
        }
        catch (error) {
            throw error
        }
    }


    const contextData = {
        loginUser,
        registerUser,
        logoutUser,
        loading,
        user,
        authTokens
    }

    useEffect(() => {
        let timeoutId

        const checkTokenExpiryAndRefresh = async () => {
            if (authTokens) {
                const currentTimeInSeconds = Math.floor(Date.now() / 1000)
                const decodedUser = jwtDecode(authTokens.accessToken)
                const timeUntilExpiry = decodedUser.exp - currentTimeInSeconds
                
                if (timeUntilExpiry < 180) {
                    try {
                        console.log("Will update token")
                        await updateToken()
                        console.log("Successfully updated token")

                        const twelveMinutes = 1000 * 6 * 12 
                        timeoutId = setTimeout(checkTokenExpiryAndRefresh, twelveMinutes)

                    }
                    catch (error) {
                        console.log("Token expired. Please login again")
                        logoutUser()
                    }
                } else {
                    const nextRefreshIn = Math.max(timeUntilExpiry - 180, 0) * 1000
                    console.log("Next refresh in", nextRefreshIn)
                    timeoutId = setTimeout(checkTokenExpiryAndRefresh, nextRefreshIn)
                }
            } else {
                clearTimeout()
            }
            setLoading(false)
        } 

        checkTokenExpiryAndRefresh()
        return () => clearTimeout(timeoutId)
    }, [authTokens])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}