import UserNav from "../components/UserNav"
import { Outlet } from "react-router"

const UserLayout = () => {
    return (
        <div>
            <UserNav/>
            <div className="">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserLayout