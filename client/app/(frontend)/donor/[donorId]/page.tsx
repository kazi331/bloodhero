'use client'

import Donations from '@/components/common/Donations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { donorProfileType } from '@/lib/types';
import moment from 'moment';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import toggleIcon from 'public/icons/home/toggle.svg';
import bloodIcon from 'public/icons/nav/blood.svg';
import arrowLeft from 'public/icons/profile/arrow-left.svg';
import absendProfileImage from 'public/images/user.jpg';
import { useEffect, useState } from 'react';


const DonorProfile = () => {
    const [donor, setDonor] = useState<donorProfileType>({
        _id: "",
        name: "",
        joined: "",
        phone: 0,
        gender: "male",
        isAvailable: false,
        image: null,
        donations: [],
        age: 0,
        type: "a",
        area: "",
        lastDonation: null,
    })
    const { back } = useRouter();
    const { donorId } = useParams();

    useEffect(() => {
        const fetchDonorProfile = async () => {
            try {
                const res = await axios.get(`/donors/${donorId}`)
                const donor = await res.data;
                setDonor(donor)
            } catch (err: any) {
                console.log(err.message)
            }
        }
        fetchDonorProfile()
    }, [donorId])
    // log(donor)

    return (
        <>
            <div className='px-6 bg-[#2d2d63] profile-bg h-full min-h-[calc(100vh-4rem)]'>
                {/* profile header  */}
                <div className="topbar-h flex items-center justify-between ">
                    <Button variant={'link'} onClick={() => back()}>
                        <Image src={arrowLeft} alt="Map-icon" className='mr-1 cursor-pointer' />
                    </Button>
                    <p className='text-white font-semibold'>Donor Profile</p>
                    <Image src={toggleIcon} alt="Toggle button" className='w-5 h-5' />
                </div>
                {/* profile area  */}
                <div className='relative rounded-xl h-60'>
                    <Image src={donor.image || absendProfileImage} alt="ProfileImage" className=' h-full object-cover object-center rounded-2xl absolute top-0 left-0 w-full' width={300} height={300} />
                    {/* overlay */}
                    <div className='relative'>
                        <div className={`rounded-xl w-full h-60  text-gray-200 overflow-hidden`}
                        // style={{ backgroundImage: `url(${profileImage.src})` }}
                        >
                            <div className='flex flex-col bg-gradient-to-b from-black/20 to-black/90 p-5 w-full h-full'>
                                <div className='flex-1'></div>
                                <div className='flex flex-col items-start'>
                                    <h1 className='font-bold text-lg'>{donor?.name}</h1>
                                    <p className='text-xs my-1'>Last Donated: {donor.lastDonation ? moment(donor.lastDonation).format('DD MMM, YYYY') : 'No donations found!'}</p>
                                    <p className='text-xs capitalize'>Blood: {donor.type.split('')[0]} {donor.type.includes('-') ? 'Negative' : 'Positive'}</p>
                                    <Badge variant={`${donor.isAvailable ? 'active_neon' : 'inactive_neon'}`} className='mt-2'>
                                        {donor.isAvailable ? 'Available' : 'Not Available'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <Image
                            alt="profile"
                            src={bloodIcon}
                            className='rounded-2xl object-contain bg-gradient-to-br from-[#ff78a9] to-[#df1b49] p-2 w-12 h-12 absolute bottom-0 right-4 transform  translate-y-1/2' />
                    </div>
                </div>

                <Donations donations={donor?.donations || []} />
            </div >
        </>

    )
}

export default DonorProfile