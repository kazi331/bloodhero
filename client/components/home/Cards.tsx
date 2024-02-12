import { Badge } from "@/components/ui/badge"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import Link from "next/link"

import bellIcon from 'public/icons/home/bell.svg'
import bloodIcon from 'public/icons/home/blood.svg'
import gearIcon from 'public/icons/home/gear.svg'
import searchIcon from 'public/icons/home/search.svg'


type cardType = {
    icon: StaticImport | string,
    title: string,
    count: String,
    color: String,
    bg: String,
    url: string
}
const cardItems: cardType[] = [
    {
        title: "Find A Donor",
        icon: searchIcon,
        count: "235k",
        color: "text-blue-300",
        bg: "bg-primary/10",
        url: "/search"

    }, {
        title: "Blood Request",
        icon: bellIcon,
        count: "235k",
        color: "text-blue-300",
        bg: "bg-[#fbefca]",
        url: "#"

    }, {
        title: "Blood Bank",
        icon: bloodIcon,
        count: "map",
        color: "text-blue-300",
        bg: "bg-[#caf3e9]",
        url: "/"

    }, {
        title: "Others",
        icon: gearIcon,
        count: "more",
        color: "text-blue-300",
        bg: "bg-gray-100",
        url: "#"

    }
]

const Cards = () => {
    return (
        <div className="grid grid-cols-12 bg-gradient-to-b from-slate-50 mb-10">
            {
                cardItems.map((item, index) => (
                    <Link key={index} href={item.url} className="col-span-6 mx-auto mb-6 bg-white shadow  rounded-xl flex flex-col items-center justify-center  w-40 h-44 min-w-fit py-4 px-2 gap-y-2">
                        <div className=" flex flex-col items-center justify-center rounded-full" >
                            <div className={`${item.bg}  w-16 h-16 flex items-center justify-center rounded-full`} >
                                < Image src={item.icon} alt={item.title} className="w-7 h-7" />
                            </div>
                            <p className="text-sm text-gray-500 my-2">{item.title}</p>
                            {/* <span className="px-3 py-1 rounded-full text-white text-sm mt-2 bg-blue-300">{item.count}</span> */}
                            <Badge variant="secondary" className="py-1 text-sm text-gray-600">{item.count}</Badge>
                        </div>
                    </Link>)
                )
            }
        </div >
    )
}


export default Cards