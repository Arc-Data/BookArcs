import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"

const AdminLogin = () => {
    const [ error, setError ] = useState()
    const [ data, setData ] = useState({
        email: '',
        password: '',
    })
    const { loginUser } = useContext(AuthContext)

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
        
        setError()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser(data)
        }
        catch (error) {
            setError(error.response.data.message)
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center pt-20">
            <h1 className="text-xl font-heading">BookArcs</h1>
            <form method="POST" onSubmit={handleSubmit} className="w-full max-w-md px-6 py-4 mt-4 border rounded-lg">
                <p className="text-center">Admin Login</p>
                {error && <p className="mt-1 text-xs text-center text-red-500">{error}</p>}
                <div className="my-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                    <input type="email" onChange={handleChangeInput} name="email" id="email" className="bg-gray-50 border border-gray-300 text-text-default text-sm rounded-lg block w-full p-2.5 " />
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                    <input type="password" onChange={handleChangeInput} name="password" id="password" className="bg-gray-50 border border-gray-300 text-text-default text-sm rounded-lg  block w-full p-2.5 " />
                </div>
                
                <button type="submit" className="w-full bg-primary-default mt-10 py-1.5 rounded-lg">Login</button>
            </form>
        </div>
    )
}

export default AdminLogin