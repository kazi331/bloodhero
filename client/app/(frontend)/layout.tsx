'use client'



import BottomNav from '@/components/home/BottomNav';
import { Inter } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })


export default function FrontLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div className="bg-slate-700">
            <div className="container w-full max-w-[30rem]" >
                <div className='h-full min-h-[calc(100vh-4rem)] bg-white'>
                    {children}
                    <Toaster position='top-center' closeButton richColors />
                </div>
                <BottomNav />
            </div>
        </div >
    )
}