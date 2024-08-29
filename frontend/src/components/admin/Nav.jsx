import { Link } from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";


const Nav = () => {
    return (
			<div className="flex items-center justify-between w-full gap-4 px-4 py-5 mx-auto md:px-16 ">
          <Link to="/" className="text-2xl font-heading">BookArcs</Link>
          <div className="">Profile</div>
			</div>
	)
}

export default Nav