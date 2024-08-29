import { useState } from "react";
import Nav from "../components/admin/Nav"
import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
    const [expanded, setExpanded] = useState(true);
    return (
        <div className="max-h-screen overflow-hidden">
            <Nav expanded={expanded} setExpanded={setExpanded}/>
            <div className="flex h-full">
                <Sidebar/>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout