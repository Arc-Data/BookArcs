import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const UserNav = () => {
    const { logoutUser } = useContext(AuthContext)

    return (
		<div className="fixed top-0 w-full shadow bg-background-default">
			<div className="flex items-center py-2.5 w-full max-w-7xl mx-auto px-2">
				<Link to="/" className="text-2xl font-heading">BookArcs</Link>
				<div className="flex items-center gap-4 ml-auto">
					<button className="" onClick={logoutUser}>Logout</button>
				</div>
			</div>
		</div>
	)
}

export default UserNav