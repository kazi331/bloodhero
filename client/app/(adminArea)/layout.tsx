import { Inter } from 'next/font/google'
import React from 'react'
import DashboardSideBar from './dashboard/DashboardSideBar'


const inter = Inter({ subsets: ['latin'] })
export default function FrontLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div className=" bg-[#0e1117] text-gray-200 min-h-screen">
            <div className="w-full md:container flex">
                <DashboardSideBar />
                <main className="p-4 md:w-5/6">{children}</main>
            </div>
        </div>
    )
}