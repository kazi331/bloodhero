'use client'
import BottomNav from '@/components/home/BottomNav';
import { AuthProvider } from "@/context/authContext";
import { Galada, Hind_Siliguri } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import React from 'react';
import { Toaster } from 'sonner';


const siliguri = Hind_Siliguri({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-siliguri',
})
const galada = Galada({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-siliguri',
})

export default function FrontLayout({ children, }: { children: React.ReactNode }) {

    return (
        <AuthProvider>
            <div className={`${siliguri.variable}`}>
                <div className="container w-full max-w-[30rem]" >
                    <div className='h-full min-h-[calc(100vh-4rem)] bg-white'>
                        {children}
                        <Toaster position='top-center' closeButton richColors />
                    </div>
                    <BottomNav />
                </div>
            </div >
            <NextTopLoader color='hsl(344deg 80% 56% / 70%)' />
        </AuthProvider>
    )
}