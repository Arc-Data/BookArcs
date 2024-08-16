import { IoLibraryOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

// TODO:
// 1: Live search on the actual home page when book collection is running
// 2: When book tracking and dashboard is actually conceptualize, go back and introduce the feature on this page
// 


const books = [
	{
		"id": 1,
		"title": "Re:Zero Kara Hajimeru Isekai Seikatsu Volume 19",
		"series": "Re:Zero Kara Hajimeru Isekai Seikatsu",
		"image": "https://res.cloudinary.com/dswlh7vp6/image/upload/v1723796651/Re_Zero_Volume_10_Cover_Art_mthfon.webp"
	},
	{
		"id": 2,
		"title": "Re:Zero Kara Hajimeru Isekai Seikatsu Volume 19",
		"series": "Re:Zero Kara Hajimeru Isekai Seikatsu",
		"image": "https://res.cloudinary.com/dswlh7vp6/image/upload/v1723796651/Re_Zero_Volume_10_Cover_Art_mthfon.webp"
	},
	{
		"id": 3,
		"title": "Re:Zero Kara Hajimeru Isekai Seikatsu Volume 19",
		"series": "Re:Zero Kara Hajimeru Isekai Seikatsu",
		"image": "https://res.cloudinary.com/dswlh7vp6/image/upload/v1723796651/Re_Zero_Volume_10_Cover_Art_mthfon.webp"
	},
	{
		"id": 4,
		"title": "Re:Zero Kara Hajimeru Isekai Seikatsu Volume 19",
		"series": "Re:Zero Kara Hajimeru Isekai Seikatsu",
		"image": "https://res.cloudinary.com/dswlh7vp6/image/upload/v1723796651/Re_Zero_Volume_10_Cover_Art_mthfon.webp"
	},
]

const Landing = () => {
	return (
		<div>
			<div className="items-center justify-center bg-primary-default"> 
				<div className="items-center py-16 mx-auto text-center md:py-32 md:flex max-w-7xl">
					<IoLibraryOutline className="mx-auto md:order-last text-background-default" size={200}/> 
					<div className="mx-auto text-center md:text-left">
						<h1 className="mt-10 text-2xl max-w-[400px] md:max-w-[700px] mx-auto md:text-4xl font-heading">
							The Book Platform everyone needs
						</h1>				
						<p className="max-w-[400px] md:max-w-[700px] mx-auto mt-4 text-lg ">Track book releases, progress, and buy light novels all in one platform!</p>
						<Link to="/signup">
							<button className="bg-accent-default px-8 py-2.5 rounded-full shadow text-text-800 mt-8 md:mt-20">Create an account</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="py-16 mx-auto md:py-32 max-w-7xl">
				<h1 className="text-2xl max-w-[400px] md:text-4xl font-heading md:max-w-[700px] mx-auto text-center">Discover the right book for you</h1>
				<search className="text-center">
					<input type="search" className="w-full border rounded-lg py-2.5 px-5 mt-10 max-w-[900px]" placeholder="Search for light novel title..." />
				</search>
				<div className="grid grid-cols-4 gap-4 mx-auto mt-4 md:max-w-6xl ">
					{books.map(book => {
						return (
							<div className="relative border group" key={book.id}>
								<img src={book.image} alt="" className="h-[260px] mx-auto md:h-auto" />
								<div className="absolute bottom-0 right-0 hidden px-2 group-hover:block bg-text-default text-background-default">{book.title}</div>
							</div>
						)
					})}
				</div>
			</div>
			<div className="bg-secondary-200 ">
				<div className="py-16 max-w-7xl">
					
				</div>
			</div>
		</div>
	)
}

export default Landing