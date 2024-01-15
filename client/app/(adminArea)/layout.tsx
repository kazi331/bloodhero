import { DashboardProvider } from '@/context/dashboardContext';
import React from 'react';
import DashboardSideBar from './dashboard/DashboardSideBar';
import Topbar from './dashboard/Topbar';



export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    return (
        <DashboardProvider>
            <div className="w-full bg-[#0e1117] text-gray-200 min-h-screen">
                <div className=" md:container flex">
                    <DashboardSideBar />
                    <main className="w-full md:w-5/6">
                        <Topbar />
                        {children}
                    </main>
                </div>
            </div>
        </DashboardProvider>
    )
}