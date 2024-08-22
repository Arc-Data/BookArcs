import { Link } from "react-router-dom"

const Nav = () => {
	return (
		<div className="fixed top-0 w-full shadow bg-background-default">
			<div className="flex items-center py-2.5 w-full max-w-7xl mx-auto px-2">
				<Link to="/" className="text-2xl font-heading">BookArcs</Link>
				<div className="flex items-center gap-4 ml-auto">
					<Link to="/login" className="">Login</Link>
					<Link to="/signup" className="">
						<button className="px-5 py-2.5 rounded bg-accent-default shadow">Sign Up</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Nav