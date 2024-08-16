import Nav from "../components/Nav"
import { IoLibraryOutline } from "react-icons/io5";

const Landing = () => {
	return (
		<div>
			<div className="items-center justify-center bg-primary-default "> 
				<div className="items-center py-16 mx-auto text-center md:py-32 md:flex max-w-7xl">
					<IoLibraryOutline className="mx-auto md:order-last text-background-default" size={200}/> 
					<div className="mx-auto text-center md:text-left">
						<h1 className="mt-10 text-2xl max-w-[400px] md:max-w-[700px] mx-auto md:text-4xl font-heading">
							The Book Platform everyone needs
						</h1>				
						<p className="max-w-[400px] md:max-w-[700px] mx-auto mt-4 text-lg ">Track book releases, progress, and buy light novels all in one platform!</p>
						<button className="bg-accent-default px-8 py-2.5 rounded-full shadow text-text-800 mt-8 md:mt-20">Create an account</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing