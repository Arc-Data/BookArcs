import { useState } from "react"
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { TbLogs } from "react-icons/tb";
import { FaRegClipboard } from "react-icons/fa";


const Sidebar = () => {
    const [expanded, setExpanded] = useState(true)

    return (
        <div className="p-1 min-h-screen border  border-primary-default *:cursor-pointer">
            <div className={`w-12 h-12 grid place-items-center  hover:bg-gray-200 hover:shadow rounded-full ${expanded && "ml-auto"}`}>
                <TbLayoutSidebarRightCollapse size={28} className={`text-primary-default rounded ${expanded ? "hidden" : "block"}`} onClick={() => setExpanded(true)}/>
                <TbLayoutSidebarLeftCollapse size={28} className={`text-primary-default ${expanded ? "block" : "hidden"}`} onClick={() => setExpanded(false)}/>
            </div>
            <div className={`mt-12 space-y-2`}>
                <div className="flex items-center justify-between gap-12 px-2 py-2 rounded-md hover:bg-gray-200">
                    <span className={`${expanded ? "block px-6" : "hidden" } `}>Home</span>
                    <MdOutlineDashboard size={28} className="text-primary-default"/>
                </div>
                <div className="flex items-center justify-between gap-12 px-2 py-2 rounded-md hover:bg-gray-200">
                    <span className={`${expanded ? "block px-6" : "hidden" } `}>Books</span>
                    <IoLibraryOutline size={28} className="text-primary-default"/>
                </div>
                <div className="flex items-center justify-between gap-12 px-2 py-2 rounded-md hover:bg-gray-200">
                    <span className={`${expanded ? "block px-6" : "hidden" } `}>Notifications</span>
                    <FaRegBell size={28} className="text-primary-default"/>
                </div>
                <div className="flex items-center justify-between gap-12 px-2 py-2 rounded-md hover:bg-gray-200">
                    <span className={`${expanded ? "block px-6" : "hidden" } `}>Logs</span>
                    <TbLogs size={28} className="text-primary-default"/>
                </div>
                <div className="flex items-center justify-between gap-12 px-2 py-2 rounded-md hover:bg-gray-200">
                    <span className={`${expanded ? "block px-6" : "hidden" } `}>Requests</span>
                    <FaRegClipboard size={28} className="text-primary-default"/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar