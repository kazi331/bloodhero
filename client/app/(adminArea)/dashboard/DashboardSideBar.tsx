"use client"
import { Droplet, Droplets, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import logo from 'public/images/logo.svg'
import { ReactNode } from 'react'

const menus = [
    { id: 1, label: 'donors', url: 'donors', icon: <Users /> },
    { id: 2, label: 'donations', url: 'donations', icon: <Droplets /> },
    { id: 3, label: 'requests', url: 'requests', icon: <Droplet /> },
]



const DashboardSideBar = () => {
    return (
        <aside className=' py-10 h-screen overflow-y-scroll min-w-min md:w-1/6 sticky top-0 bg-[#24273a]'>
            {/* sidebar logo */}
            <div className='flex flex-col items-center md:p-4 mb-8 '>
                <Image src={logo} alt="logo" property="true" className="w-8" />
                <h1 className="text-gray-300 font-bold text-lg mt-2 hidden md:block ">Blood Hero</h1>
            </div>
            {/* sidebar nav */}
            <div className="flex flex-col gap-y-1">
                {menus.map(item => <NavItem key={item.id} label={item.label} url={item.url} icon={item.icon} />)}
            </div>
        </aside>
    )
}

export default DashboardSideBar

const NavItem = ({ label, url, icon }: { label: string, url: string, icon: ReactNode }) => {
    const segment = useSelectedLayoutSegments();
    return (<div className='relative'>
        <Link href={`/dashboard/${url}`} className={`nav-item ${segment[1] === url && 'nav-active'}  `}>
            {icon} <span className="ml-2 capitalize hidden md:block">{label}</span>
        </Link>
    </div>)
}




