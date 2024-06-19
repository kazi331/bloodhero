'use client'
import { Spinner } from '@/components/spinner'
import axios from '@/lib/axios'
import { donorType } from '@/lib/types'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import notfoundImg from 'public/images/illustration/undraw_feeling.svg'
import { useEffect, useState } from 'react'
import Donor from './Donor'
import { useDonors } from '@/context/donorContext'


const DonorsGrid = () => {
    const { donors, loading} = useDonors();

  

    return (
        <div className='mx-3 my-3 mt-6'>
            {
                loading ? <div className='h-full min-h-[60vh] flex items-center justify-center'>
                    <Spinner />
                </div> :
                    donors.length === 0 && !loading ? <div className='h-full min-h-[60vh] flex flex-col items-center justify-center space-y-3'>
                        <Image src={notfoundImg} loading='lazy' alt="not found image" className='w-1/2' />
                        <h1 className='text-center text-xl font-semibold text-slate-600'>No Matched Donor Found!</h1>
                    </div> : donors.map((donor: donorType) => <Donor key={donor._id} donor={donor} />)
            }
        </div>
    )
}



export default DonorsGrid






