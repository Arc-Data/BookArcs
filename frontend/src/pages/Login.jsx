import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    const [ data, setData ] = useState({
        email: '',
        password: '',
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
    }
    
    return (
        <div className="flex flex-col items-center justify-center pt-20">
            <h1 className="text-xl font-heading">BookArcs</h1>
            <form method="POST" onSubmit={handleSubmit} className="w-full max-w-md px-6 py-4 mt-4 border rounded-lg">
                <p className="text-center">Login</p>
                <div className="my-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                    <input type="email" onChange={handleChangeInput} name="email" id="email" className="bg-gray-50 border border-gray-300 text-text-default text-sm rounded-lg block w-full p-2.5 " />
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                    <input type="password" onChange={handleChangeInput} name="password" id="email" className="bg-gray-50 border border-gray-300 text-text-default text-sm rounded-lg  block w-full p-2.5 " />
                </div>
                
                <button type="submit" className="w-full bg-primary-default mt-10 py-1.5 rounded-lg">Login</button>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <p className="text-center">Don't have an account? <span className="text-primary-default"><Link to="/signup">Register</Link></span></p>
            </form>
        </div>
    )
}

export default Login