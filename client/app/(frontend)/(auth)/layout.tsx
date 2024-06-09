"use client"
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { push } = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) return push('/profile');
        });
    }, []);
    return (
        <div className='flex flex-col justify-between bg-pink-500/20 min-h-[calc(100vh-4rem)]'>
            <Header />
            <div className="bg-white p-10 rounded-tr-3xl rounded-tl-3xl text-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 22px 0px' }}>
                {children}
            </div>
        </div>

    )
}

export default AuthLayout