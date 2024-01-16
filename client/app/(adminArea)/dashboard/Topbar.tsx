'use client'
import { BellDot, Search, Settings, User } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";

const Topbar = () => {
    const segment = useSelectedLayoutSegments();
    return (<>
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 bg-[#1e2030] mb-4 p-4 sticky top-0 overflow-auto w-full  ">
                {/* title */}
                <div className="flex items-center">
                    <h2 className="md:text-lg font-bold capitalize text-gray-300">{segment[1]}</h2>
                    <label htmlFor="search" className="relative ml-8 flex items-center">
                        <Search className="text-gray-500 hover:text-gray-400 absolute left-1 w-4 items-center" />
                        <input type="text" id="search" className="bg-transparent text-sm text-gray-400 border-none focus-visible:ring-gray-700 rounded-lg pl-6" placeholder="Search" />
                    </label>
                </div>

                {/* Search */}


                {/* filter and new donor */}
                <div className="text-gray-500 flex gap-2">
                    <BellDot size={20} className="hover:text-gray-400 cursor-pointer" />
                    <Settings size={20} className="hover:text-gray-400 cursor-pointer" />
                    <User size={20} className="hover:text-gray-400 cursor-pointer" />
                </div>
            </div>
        </div>
    </>
    )
}

export default Topbar