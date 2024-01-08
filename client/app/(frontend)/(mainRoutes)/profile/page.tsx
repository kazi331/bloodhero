'use client'
import Donations from '@/components/common/Donations'
import { useAuth } from '@/context/authContext'
import { ExternalLink, Info } from 'lucide-react'
import Link from 'next/link'
import HeaderProfile from './HeaderProfile'
import ProfileArea from './ProfileArea'


const Page = () => {
    /*  const [user, setUser] = useState<userProps>({} as userProps);
     useEffect(() => {
         const fetchUser = async () => {
             const res = await axios.get(`/logged-user`, { withCredentials: true })
             // login(res.data)
             setUser(res.data)
         }
         try {
             fetchUser();
         } catch (err: any) {
             console.log(err)
         }
     }, []) */
    const { user, loading } = useAuth();
    if (loading) return <div className='min-h-[calc(100vh-4rem)]  bg-[#2d2d63]'>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
    </div>
    if (!user) return <div className='min-h-[calc(100vh-4rem)]  bg-[#2d2d63]'>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
    </div>
    return (
        <div className='px-6 bg-[#2d2d63] profile-bg h-full min-h-[calc(100vh-4rem)]'>
            <HeaderProfile userId={user?._id} />
            {user.type ? <>
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