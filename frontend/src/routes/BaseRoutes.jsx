import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { Outlet, redirect, useNavigate } from "react-router"

const BaseRoutes = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [user])

    return !user && (<Outlet />)
}

export default BaseRoutes