import React from 'react';
import DashboardSideBar from './dashboard/DashboardSideBar';
import Topbar from './dashboard/donors/Topbar';



export default function AdminLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div className="w-full bg-[#0e1117] text-gray-200 min-h-screen">
            <div className=" md:container flex">
                <DashboardSideBar />
                <main className="w-full md:w-5/6">
                    <Topbar />
                    <div className='p-4'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}