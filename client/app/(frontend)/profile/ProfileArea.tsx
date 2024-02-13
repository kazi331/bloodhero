
import { userProps } from '@/lib/types'
import moment from 'moment'
import Image from 'next/image'

import profileImage from 'public/images/user-round.png'
const ProfileArea = ({ user }: { user: userProps }) => {
    const age = moment().diff(moment(user.dob), 'years');



    return (
        <div className='grid grid-cols-1 xs:grid-cols-2 gap-4  text-white/90 pt-10'>
            <Image src={user.image || profileImage} alt="ProfileImage" width={400} height={400} className='rounded-xl object-cover object-center' />
            <div className='flex flex-col '>
                <h1 className='font-bold text-lg'>{user.name}</h1>
                <div className='text-xs mt-1 capitalize text-gray-300'>
                    <p className='info-item'>Location: {user.area}</p>
                    <p className='info-item'>DOB: {moment(user.dob).format("LL")} </p>
                    <p className='info-item'>Last Donated:  {user.lastDonation ? moment(user.lastDonation).format("ll") : 'No Records Found!'}  </p>
                    <div className="flex space-x-1">
                        <p className='info-item w-full'>Gender: {user?.gender}</p>
                        <p className='info-item w-full'>Age: {age}</p>
                    </div>
                    <p className='info-item'>Joined: {moment(user.joined).format("LL")}</p>
                    <p className='info-item'>Phone: 0{user.phone}</p>
                    <div className="flex gap-1">
                        <p className={`badge  ${user.isAvailable ? 'badge-green' : 'badge-yellow'}`}>
                            {user.isAvailable ? "Available" : "Unavailable"}
                        </p>
                        <p className="badge badge-green capitalize">
                            {user?.type?.includes("-") ? user.type.split("")[0] + ' Negative' : user.type + " Positive"}
                        </p>
                    </div>
                </div>

                {/* <Link href={`/profile/edit/${user._id}`} className='btn btn-gray mt-3'>
                    <Image src={penIcon} alt='pen icon' /> Edit
                </Link> */}
            </div>
        </div>
    )
}

export default ProfileArea