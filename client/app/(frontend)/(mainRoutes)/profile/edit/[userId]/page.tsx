'use client'
import { Input } from "@/components/ui/input"
import axios from "@/lib/axios"
import { blood } from "@/lib/types"
import { Button } from "@components/ui/button"
import { ArrowLeftCircle, Calendar, Droplet, LocateIcon, Phone, User } from "lucide-react"
import moment from "moment"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import unions from 'public/data/villages.json'
import { PropsWithChildren, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const phoneRegExp = /^(\+88)?(01[3-9]\d{8})$/ // 14 characters or 11 characters
const phoneRegExp2 = /^0?1[3-9]\d{8}$/; // 11 characters
const emailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // support only gmail.com

type updateData = {
    name: string,
    phone: number,
    area: string,
    type: blood,
    isAvailable: boolean,
    gender: 'male' | 'female',
    dob: Date | string,
}



const validation = {
    name: {
        required: 'Name is required'
    },
    area: {
        required: 'Area is required.'
    },
    phone: {
        required: 'Phone is required.',
        pattern: {
            value: phoneRegExp2,
            message: 'Invalid phone number.'
        },
    },
    type: {
        required: 'Blood type is required.'
    },
    gender: {
        required: 'Please select your gender.'
    },
    dob: {
        required: 'Date of birth is required.'
    }
}


const UpdateUserData = () => {
    const [user, setUser] = useState<updateData>({} as updateData)

    const { push, back } = useRouter();
    const { userId } = useParams();

    // if (!user.name) return

    const { register, formState: { errors, isSubmitting, isValid }, reset, handleSubmit } = useForm<updateData>({
        defaultValues: user,
    });

    const onSubmit = async (fieldValues: updateData) => {
        console.log(fieldValues)
        try {
            const res = await axios.patch(`/auth/update/${userId}`, fieldValues)
            if (res.data?.success) {
                // console.log(res.data)
                toast.success(res.data.message, {
                    description: 'Profile updated successfully!'
                })
                window.location.href = "/profile"
            }
        } catch (err: any) {
            console.log(err.message)
            if (err.response?.data) {
                toast.error(err.response.data.message || err.message, {
                    description: 'Please try again later!'

                })
            } else {
                toast.error(err.message, {
                    description: 'Please try again later!'
                })
            }
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/${userId}`);
                setUser(res.data)
                reset({ ...res.data, dob: moment(res.data.dob).format("YYYY-MM-DD") });
            } catch (err: any) {
                console.log(err.message);
                toast.error(err.message)
            }
        }
        getUser()
    }, [userId, reset]);

    return (
        <>
            <div className="p-10 rounded-tr-3xl rounded-tl-3xl text-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 22px 0px' }}>
                <h2 className="flex items-center justify-between mb-8">
                    <Link className="text-sm text-primary  flex  items-center" href="/profile"><ArrowLeftCircle size={18} className="mr-1" /> Profile </Link>
                    <span className="text-gray-600 text-lg font-medium title-font">Update Your Profile</span>
                    <span></span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <label htmlFor="name" className="flex relative mt-2">
                        <Input
                            {...register('name', validation.name)}
                            type="text" id="name" placeholder="Mohammad Rizwan" className="pl-10 capitalize" />
                        <User className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    </label>
                    {errors.name && <Error>{errors.name.message}</Error>}

                    {/* Phone area */}
                    <label htmlFor="phone" className="relative ">
                        <Input
                            {...register('phone', validation.phone)}
                            type="tel" id="phone" placeholder="1612****31" className="pl-24 capitalize mt-2" />
                        <div className="flex items-center absolute top-0 bottom-0 left-2 border-r-2 pr-1">
                            <Phone className="text-gray-400" />
                            <div className=" text-gray-700 ml-2 " >+880</div>
                        </div>
                    </label>
                    {errors.phone && <Error>{errors.phone.message}</Error>}

                    {/* area */}
                    <label htmlFor="area" className="flex relative mt-2">
                        {/* AREA SELECTION */}
                        <select defaultValue={"Select Area"} aria-label='select'
                            {...register('area', validation.area)}
                            id="area"
                            className='rounded rounded-bl border w-full border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pr-10 pl-10'
                        >
                            <option value="" >এলাকা সিলেক্ট করুন </option>
                            {
                                unions.map(union => {
                                    return (
                                        <optgroup key={union.union} label={union.bangla}>
                                            {union?.villages?.map(villages => {
                                                return (<option key={villages.id} value={villages.name.toLocaleLowerCase()} >
                                                    {villages.bangla}
                                                </option>
                                                )
                                            })}
                                        </optgroup>
                                    )
                                })
                            }
                        </select>
                        <LocateIcon className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    </label>
                    {errors.area && <Error>{errors.area.message}</Error>}

                    {/* blood group */}
                    <label htmlFor="type" className="relative mt-2 flex">
                        {/* BLOOD TYPE SELECTION */}
                        <select aria-label='select'
                            {...register('type', validation.type)}
                            id="type"
                            className='rounded border w-full border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-10 '>
                            <option value="">Blood Type</option>
                            <option value="a">A Positive</option>
                            <option value="a-">A Negative</option>
                            <option value="b">B Positive</option>
                            <option value="b-">B Negative</option>
                            <option value="ab">AB Positive</option>
                            <option value="ab-">AB Negative</option>
                            <option value="o">O Positive</option>
                            <option value="o-">O Negative</option>
                        </select>
                        <Droplet className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    </label>
                    {errors.type && <Error>{errors.type.message}</Error>}

                    {/* isAvailable */}
                    <label htmlFor="isAvailable" className="flex w-full items-center justify-between pl-1 py-2 mt-2 text-base ">
                        <div className="flex items-center justify-between w-full select-none ">
                            <p className="cursor-pointer">Are you available?</p>
                            {/* AVAILABILITY SWITCH */}
                            {/* custom checkbox switch  */}
                            <div className="relative ">
                                <input className="hidden peer/check" type="checkbox" {...register('isAvailable')} id="isAvailable" />
                                <label htmlFor="isAvailable" className=" block w-11 h-6 rounded-full bg-slate-200 cursor-pointer peer-checked/check:bg-primary "></label>
                                <label htmlFor="isAvailable" className="block w-5 h-5 rounded-full bg-white cursor-pointer absolute top-0.5 left-0.5  peer-checked/check:translate-x-full transition-transform "></label>
                            </div>

                        </div>
                    </label>
                    {errors.isAvailable && <Error>{errors.isAvailable.message}</Error>}

                    {/* GENDER */}
                    <div className="flex w-full items-center justify-between pl-1 mt-2 text-base select-none ">
                        <label>You are</label>
                        <div className="flex shadow">
                            <input {...register('gender', validation.gender)} className="hidden peer/male " type="radio" id="male" value="male" />
                            <label className="flex items-center gap-1 peer-checked/male:bg-primary peer-checked/male:text-white p-2 py-1.5 bg-slate-100 hover:bg-primary/30 cursor-pointer rounded-l-lg" htmlFor="male">Male</label>
                            <input {...register('gender', validation.gender)} className="hidden peer/female " type="radio" id="female" value="female" />
                            <label className="flex items-center gap-1 peer-checked/female:bg-primary peer-checked/female:text-white p-2 py-1.5 bg-slate-100 hover:bg-primary/30 cursor-pointer rounded-r-lg" htmlFor="female">Female</label>
                        </div>
                    </div>
                    {errors.gender && <Error>{errors.gender.message}</Error>}

                    {/* Date of Birth - DOB */}
                    <label htmlFor="dob" className="flex relative mt-4">
                        <input type="date"  {...register('dob', validation.dob)} min={'1970-01-01'} max={new Date().toISOString().split('T')[0]} id="dob"
                            className="rounded border w-full border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-10" />
                        <Calendar className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    </label>
                    {errors.dob && <Error>{errors.dob.message}</Error>}



                    <Button disabled={isSubmitting} type="submit" className="mt-4 w-full hover:shadow-lg active:animate-out transition-all">Update Profile</Button>
                </form>
            </div>
        </>
    )
}

// error message component 
const Error = ({ children }: PropsWithChildren) => <p className="text-red-500 text-left text-xs mt-1"> {children} </p>



export default UpdateUserData;