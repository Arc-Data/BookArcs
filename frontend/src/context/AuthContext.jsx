import { createContext, useState } from "react";
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
    const loginUser = async (data) => {
        try {
            const response = await axios.post('api/auth/login', data)
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

    const registerUser = (data) => {
        try {

        }
        catch (error) {
            throw error
        }
    }


    const contextData = {
        loginUser,
        registerUser,
        loading,
        user,
        authTokens
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}