"use client"
import FullPageLoading from "@/components/common/FullPageLoading";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Error from "@/components/common/Error";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { push } = useRouter();
    const { user, loading } = useAuth();
    if (loading && !user.uid) return <FullPageLoading />
    if (!loading && user?.uid) return push('/profile')
    if (!loading && !user?.uid) return (
        <div className='flex flex-col justify-between bg-pink-500/20 min-h-[calc(100vh-4rem)]'>
            <Header />
            <div className="bg-white p-10 rounded-tr-3xl rounded-tl-3xl text-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 22px 0px' }}>
                {children}
            </div>
        </div>

    )
    return <Error>Something went wrong!!</Error>;
}

export default AuthLayout