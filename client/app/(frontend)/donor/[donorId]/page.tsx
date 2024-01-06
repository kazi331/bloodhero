'use client'

import Donations from '@/components/common/Donations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { donorProfileType } from '@/lib/types';
import { Phone } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import toggleIcon from 'public/icons/home/toggle.svg';
import arrowLeft from 'public/icons/profile/arrow-left.svg';
import { useEffect, useState } from 'react';


const DonorProfile = () => {
    const [donor, setDonor] = useState<donorProfileType>({} as donorProfileType)
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
    console.log({ donor })

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
                <div className="w-full max-w-2xl mx-auto py-6 space-y-6 ">
                    <div className="flex flex-col items-center gap-8 ">
                        <Image
                            alt="Donor Avatar"
                            className="rounded-full ring-2 ring-sky-500 ring-offset-0  "
                            height="100"
                            src={donor?.image || "/images/avatars/avatar-1.jpg"}
                            style={{
                                aspectRatio: "100/100",
                                objectFit: "cover",
                            }}
                            width="100"
                        />
                        <div className="space-y-4 ">
                            <h1 className="text-2xl font-bold text-gray-200">{donor.name}</h1>
                            <div className='flex items-center space-x-2 mt-2 '>
                                <Badge className='capitalize rounded-md' >{donor.type} {donor.type?.split('')[1] === '-' ? 'Negative' : 'Positive'}</Badge>
                                <Badge variant={`${donor.isAvailable ? 'active_neon' : 'inactive_neon'}`} >
                                    {donor.isAvailable ? "Available" : "Unavailable"}
                                </Badge>
                                <a href={`tel:${donor.phone}`} ><Phone className={`ml-2 ${donor.isAvailable ? 'text-green-600' : 'text-yellow-500'}`} size={20} /></a>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border-t-2 border-gray-200/10'></div>
                    <div className="grid gap-4 grid-cols-1 xs:grid-cols-2">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Last Donation</p>
                            <p className="text-gray-200">{donor.lastDonation ? moment(donor.lastDonation).format('LL') : 'No record found!'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Village</p>
                            <p className="text-gray-200 capitalize">{donor.area || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Date of Birth</p>
                            <p className="text-gray-200">{String(donor.age || 'Not provided')}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Joined Date</p>
                            <p className="text-gray-200">{moment(donor.joined).format('LL')}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Phone Number</p>
                            <p className="text-gray-200">{String(donor.phone) || 'not provided'}</p>
                        </div>
                    </div>
                </div>

                <Donations donations={donor?.donations || []} />
            </div >
        </>

    )
}

export default DonorProfile
