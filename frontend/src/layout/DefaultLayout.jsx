import { Outlet } from "react-router"
import Nav from "../components/Nav"

const DefaultLayout = () => {
    return (
        <div>
            <Nav/>
            <div className="">
                <Outlet/>
            </div>
        </div>
    )
}

export default DefaultLayout