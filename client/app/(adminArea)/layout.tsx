import { DashboardProvider } from '@/context/dashboardContext';
import React from 'react';
import { Toaster } from 'sonner';
import DashboardSideBar from './dashboard/DashboardSideBar';
import Topbar from './dashboard/Topbar';



export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    return (
        <DashboardProvider>
            <div className=" bg-[#0e1117] text-gray-200 min-h-screen " vaul-drawer-wrapper="">
                {/*  <div className="grid grid-cols-12">
                     <DashboardSideBar className="col-auto min-w-min sm:col-span-1 md:col-span-2" />
                    <main className="col-span-11 md:col-span-10"><Topbar />{children}</main> 
                </div> */}
                {<div className="flex">
                    <DashboardSideBar className="shrink-0 " />
                    <main className="w-9/12 flex-grow max-w-full">
                        <Topbar />
                        {children}
                    </main>
                </div>}
                <Toaster position='top-center' closeButton richColors theme='dark' />
            </div>
        </DashboardProvider>
    )
}