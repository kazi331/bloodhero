"use client"
import { useAuth } from "@/context/authContext"
import { auth } from "@/lib/logins"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Header from "./Header"

const Page = () => {
    const { user } = useAuth();
    const router = useRouter();
    const logout = async () => {
        try {
            await signOut(auth)
            toast.success("Logged out");
            router.push("/login")
        } catch (error) {
            console.error(error)
        }
    }
    return (<div>
        <Header />
        <div className="min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
            <h1> Notifications</h1>
        </div>
    </div>
    )
}

export default Page