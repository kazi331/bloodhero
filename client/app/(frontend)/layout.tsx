'use client'

import BottomNav from '@/components/home/BottomNav';
import axios from '@/lib/axios';
import useAuthStore from '@/state/auth';
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';


export default function FrontLayout({ children, }: { children: React.ReactNode }) {

    const { user, login, setLoading } = useAuthStore();
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            const res = await axios.get(`/logged-user`, { withCredentials: true })
            login(res.data)
            setLoading(false)
        }
        try {
            fetchUser();
        } catch (err: any) {
            console.log(err)
        }
    }, [login, setLoading])


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