import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "../utils/axios"

const SignUp = () => {
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))

        setErrors(prev => ({
            ...prev, 
            [name]: null
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        if (data.password !== data.confirm_password) {
            setErrors(prev => ({
                ...prev,
                confirm_password: "Passwords do not match"
            }));
            return;
        }
        
        try {
            const response = await axios.post('api/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
            })
            console.log(response)
        }
        catch (error) {
            setErrors(error.response.data.errors)
        }
        finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center pt-20">
            <h1 className="text-xl font-heading">BookArcs</h1>
            <form method="POST" onSubmit={handleSubmit} className="w-full max-w-md px-6 py-4 mt-4 border rounded-lg">
                <p className="text-center">Create an account</p>
                <div className="my-3">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
                    <input 
                        type="text" 
                        onChange={handleChangeInput} 
                        name="username" 
                        id="username" 
                        className="bg-gray-50 border border-gray-300 text-text-default text-sm rounded-lg block w-full p-2.5" 
                        required
                    />
                    {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
                </div>
                <div className="my-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                    <input 
                        type="email" 
                        onChange={handleChangeInput} 
                        name="email" 
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-text-default text-sm rounded-lg block w-full p-2.5" 
                        required
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                    <input 
                        type="password" 
                        onChange={handleChangeInput} 
                        name="password" 
                        id="password" 
                        className="bg-gray-50 border border-gray-300 text-text-default text-sm rounded-lg block w-full p-2.5" 
                        required
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>
                <div className="my-3">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium">Confirm Password</label>
                    <input 
                        type="password" 
                        onChange={handleChangeInput} 
                        name="confirm_password" 
                        id="confirm_password" 
                        className="bg-gray-50 border border-gray-300 text-sm text-text-default rounded-lg block w-full p-2.5"
                        required 
                    />
                    {errors.confirm_password && <p className="mt-1 text-xs text-red-500">{errors.confirm_password}</p>}
                </div>
                <button type="submit" className="w-full bg-primary-default mt-10 py-1.5 rounded-lg" disabled={loading}>Create</button>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <p className="text-center">Already have an account? <span className="text-primary-default"><Link to="/login">Login</Link></span></p>
            </form>
        </div>
    )
}

export default SignUp