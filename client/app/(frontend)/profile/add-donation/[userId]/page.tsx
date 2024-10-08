'use client'
import Error from '@/components/common/Error'
import FullPageLoading from '@/components/common/FullPageLoading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/authContext'
import axios from '@/lib/axios'
import { bloodType } from '@/lib/types'
import { ArrowLeftCircle, Building, Calendar, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'




const phoneRegExp2 = /^0?1[3-9]\d{8}$/; // 11 characters

type donationData = {
    patient: string,
    phone: number,
    hospital: string,
    type: bloodType,
    date: Date | string,
}

const validation = {
    patient: {
        required: 'Patient is required'
    },
    hospital: {
        required: 'hospital name is required.'
    },
    phone: {
        required: 'Phone is required.',
        pattern: {
            value: phoneRegExp2,
            message: 'Invalid phone number.'
        },
    },
    date: {
        required: 'Date is required.'
    },
    type: {
        required: 'Blood group is required.'

    }

}

const AddDonation = () => {
    const { register, formState: { errors, isSubmitting, isValid }, reset, handleSubmit } = useForm<donationData>({
        // defaultValues: user,
    });
    const { user, loading } = useAuth();
    // console.log(user)

    const onSubmit = async (fieldValues: donationData) => {
        try {
            const res = await axios.post(`/donations`, fieldValues, { headers: { Authorization: `Bearer ${user.token}` } })
            if (res.data?.success) {
                // console.log(res.data)
                toast.success(res.data.message, {
                    description: 'Your donation has been added successfully!'
                })
                window.location.href = "/profile"
            }
        } catch (err: any) {
            console.log(err.message)
            if (err.response?.data) {
                toast.error(err.response.data.message || err.message, {
                    description: err.response?.data?.error

                })
            } else {
                toast.error(err.message, {
                    description: 'Please try again later!'
                })
            }
        }
    }

    if (loading) return <FullPageLoading />

    return (
        <div>
            <div className="p-10  text-center" >
                <div className="flex items-center justify-between mb-8">
                    <Link className="text-sm text-primary  flex  items-center" href="/profile"><ArrowLeftCircle size={18} className="mr-1" /> Profile </Link>
                    <span className="text-gray-600 text-lg font-medium title-font">Add new donation</span>
                    <span></span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('type')} value={user.type} />
                    {/* Name */}
                    <label htmlFor='name' className='text-left block mt-2 mb-1 text-gray-500 '>Patient Name</label>
                    <label htmlFor="name" className="flex relative mt-2">
                        <Input
                            {...register('patient', validation.patient)}
                            type="text" id="name" placeholder="Patient Name" className="pl-10 capitalize" />
                        <User className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    </label>
                    {errors.patient && <Error>{errors.patient.message}</Error>}
                    {/* hospital name */}
                    <label htmlFor='hospital' className='text-left block mt-2 mb-1 text-gray-500 '>Hospital</label>
                    <label htmlFor="hospital" className="flex relative mt-2">
                        <Input
                            {...register('hospital', validation.hospital)}
                            type="text" id="hospital" placeholder="Hospital Name" className="pl-10 capitalize" />
                        <Building className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    </label>
                    {errors.hospital && <Error>{errors.hospital.message}</Error>}

                    {/* Phone area */}
                    <label htmlFor='phone' className='text-left block mt-2 mb-1 text-gray-500 '>Patient Phone</label>
                    <label htmlFor="phone" className="relative ">
                        <Input
                            {...register('phone', validation.phone)}
                            type="tel" id="phone" placeholder="Patient phone " className="pl-24 capitalize mt-2" />
                        <div className="flex items-center absolute top-0 bottom-0 left-2 border-r-2 pr-1">
                            <Phone className="text-gray-400" />
                            <div className=" text-gray-700 ml-2 " >+880</div>
                        </div>
                    </label>
                    {errors.phone && <Error>{errors.phone.message}</Error>}

                    <label htmlFor='date' className='text-left block mt-2 mb-1 text-gray-500 '>Donation date</label>
                    <label htmlFor="date" className="flex relative">
                        <input type="date"  {...register('date', validation.date)} min={'1970-01-01'} max={new Date().toISOString().split('T')[0]} id="date"
                            className="rounded border w-full border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-10" />
                        <Calendar className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    </label>
                    {errors.date && <Error>{errors.date.message}</Error>}

                    <Button disabled={isSubmitting} type="submit" className="mt-4 w-full hover:shadow-lg active:animate-out transition-all">Submit Donation</Button>

                </form>
            </div>
        </div>
    )
}

export default AddDonation