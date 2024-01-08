'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "@/lib/axios";
import { Menu } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";



const HeaderProfile = ({ userId }: { userId: string }) => {
    const { push } = useRouter();
    const logout = async () => {
        try {
            const res = await axios.get('/auth/logout')
            if (res.data.success) {
                toast.success(res.data.message, {
                    description: 'You will be redirected to login page',
                })
            }
            localStorage.removeItem('user')
            push('/login')

        } catch (err: any) {
            toast.error(err.response?.data.message)
        }
    }
    return (
        <div className="topbar-h flex items-center justify-between ">
            <span />
            <p className='text-white font-semibold'>My Profile</p>
            <DropdownMenu>
                <DropdownMenuTrigger >
                    <Menu className='text-gray-400 hover:text-gray-300 cursor-pointer h-7 w-7' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-500/30 text-gray-200 backdrop-blur border-none rounded-lg shadow-2xl" >
                    <Link href={`/profile/edit`}> <DropdownMenuItem className="hover:!bg-gray-300/40 hover:!text-gray-50 rounded" >Edit Profile</DropdownMenuItem></Link>
                    <Link href={`/profile/add-donation/${userId}`}><DropdownMenuItem className="hover:!bg-gray-300/40 hover:!text-gray-50 rounded">Add Donation</DropdownMenuItem></Link>
                    <Link href="/settings"><DropdownMenuItem className="hover:!bg-gray-300/40 hover:!text-gray-50 rounded">Settings</DropdownMenuItem></Link>
                    <DropdownMenuItem className="hover:!bg-gray-300/40 hover:!text-gray-50 rounded" onSelect={logout} >Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default HeaderProfile