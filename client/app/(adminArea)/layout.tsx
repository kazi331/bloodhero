import { DashboardProvider } from '@/context/dashboardContext';
import React from 'react';
import DashboardSideBar from './dashboard/DashboardSideBar';
import Topbar from './dashboard/Topbar';



export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    return (
        <DashboardProvider>
            <div className=" bg-[#0e1117] text-gray-200 min-h-screen">
                <div className="grid grid-cols-12">
                    <DashboardSideBar className="col-auto min-w-min sm:col-span-1 md:col-span-2" />
                    <main className="col-span-11 md:col-span-10"><Topbar />{children}</main>
                </div>

            </div>
        </DashboardProvider>
    )
}