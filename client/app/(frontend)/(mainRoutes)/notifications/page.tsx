"use client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"
import { auth } from "@/lib/logins"
import { signOut } from "firebase/auth"
import Link from "next/link"
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
            {user._id ? <>
                <h3>{user.name || user.email}</h3>
                <Button variant="destructive" onClick={logout} >Logout</Button>
            </> :
                <Button variant="ghost"><Link href="/login">Login</Link></Button>
            }
        </div>
    </div>
    )
}

export default Page