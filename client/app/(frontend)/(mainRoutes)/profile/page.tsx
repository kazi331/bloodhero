'use client'
import Donations from '@/components/common/Donations'
import FullPageLoading from '@/components/common/FullPageLoading'
import { useAuth } from '@/context/authContext'
import { ExternalLink, Info } from 'lucide-react'
import Link from 'next/link'
import HeaderProfile from './HeaderProfile'
import ProfileArea from './ProfileArea'

const Page = () => {
    const { user, loading } = useAuth();
    if (loading || !user) return <FullPageLoading />
    return (
        <div className='px-6 bg-[#2d2d63] profile-bg h-full min-h-[calc(100vh-4rem)]'>
            <HeaderProfile userId={user?._id} />
            {user?.type ? <>
                <ProfileArea user={user} />
                <Donations donations={user?.donations} />
            </> :
                <div className='p-10 bg-gray-100/10 rounded flex flex-col items-center justify-center '>
                    <p className='flex gap-2 text-yellow-300'><Info /> Please Update Your profile</p>
                    <Link href={`/profile/edit`}
                        className='flex items-center mt-2 text-gray-200 hover:underline underline-offset-4'>
                        Update Profile <ExternalLink className='w-5 ml-1' />
                    </Link>
                </div>
            }

        </div >
    )
}

export default Page