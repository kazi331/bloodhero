'use client'
import BottomNav from '@/components/home/BottomNav';
import { AuthProvider } from "@/context/authContext";

import React from 'react';
import { Toaster } from 'sonner';


export default function FrontLayout({ children, }: { children: React.ReactNode }) {

    return (
        <AuthProvider>
            <div className="bg-[#0e1117]">
                <div className="container w-full max-w-[30rem]" >
                    <div className='h-full min-h-[calc(100vh-4rem)] bg-white'>
                        {children}
                        <Toaster position='top-center' closeButton richColors />
                    </div>
                    <BottomNav />
                </div>
            </div >
        </AuthProvider>
    )
}