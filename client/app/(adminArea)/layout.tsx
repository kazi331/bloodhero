import { DashboardProvider } from '@/context/dashboardContext';
import React from 'react';
import DashboardSideBar from './dashboard/DashboardSideBar';
import Topbar from './dashboard/Topbar';



export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    return (
        <DashboardProvider>
            <div className=" bg-[#0e1117] text-gray-200 min-h-screen">
                <div className=" md:container flex ">
                    <DashboardSideBar className="w-full min-w-max md:w-2/12" />
                    <main className="w-full md:10/12">
                        <Topbar />
                        {children}
                    </main>
                </div>
            </div>
        </DashboardProvider>
    )
}