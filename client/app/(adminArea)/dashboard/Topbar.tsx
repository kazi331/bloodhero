'use client'
import { Button } from "@/components/ui/button";
import { FilterIcon, Grid2X2Icon, List, Plus, Search } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";

const Topbar = () => {
    const segment = useSelectedLayoutSegments();
    return (<>
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 bg-[#1e2030] mb-4 p-4 sticky top-0 overflow-auto w-full  ">
                {/* title */}
                <div className="flex items-center">
                    <h2 className="text-lg font-bold capitalize">{segment[1]}</h2>
                    <label htmlFor="search" className="relative ml-8">
                        <Search className="text-gray-500 hover:text-gray-400 absolute top-1/4 left-0 w-5" />
                        <input type="text" id="search" className="bg-transparent border-none focus-visible:ring-0 pl-8" placeholder="Search" />
                    </label>
                </div>
                {/* view style */}
                {/*   <div className="text-gray-500 flex items-center gap-2">
                    <Button className="flex gap-2 bg-transparent text-gray-400 hover:text-white hover:bg-gray-700">
                        <List /> <span>List</span>
                    </Button>
                    <div className="w-[1px] h-8 bg-gray-400/50 "></div>
                    <Button className="flex gap-2 bg-transparent text-gray-400 hover:text-white hover:bg-gray-700">
                        <Grid2X2Icon /> <span>Grid</span>
                    </Button>
                </div> */}

                {/* filter and new donor */}
                <div className="text-gray-500 flex items-center gap-2 whitespace-nowrap">
                    <Button><FilterIcon /> Filter</Button>
                    {segment[1] !== 'requests' && <Button><Plus /> New {segment[1] === 'donors' ? 'Donor' : 'Donation'}</Button>}
                </div>
            </div>
        </div>
    </>
    )
}

export default Topbar