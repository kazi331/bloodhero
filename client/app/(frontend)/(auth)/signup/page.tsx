'use client'
import Error from "@/components/common/Error"
import Captcha from "@/components/common/captcha"
import { emailRegister } from "@/lib/logins"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const phoneRegExp = /^(\+88)?(01[3-9]\d{8})$/ // 14 characters or 11 characters
const phoneRegExp2 = /^01[3-9]\d{8}$/; // 11 characters
const emailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // support only gmail.com

type RegisterData = {
    name: string,
    email: string,
    password: string
}

const validation = {
    name: {
        required: {
            value: true,
            message: 'Name is required.'
        }
    },
    email: {
        required: {
            value: true,
            message: 'Email is required.',
            lowercase: true,
        },
        pattern: {
            value: emailRegExp,
            message: 'Enter a valid email address; gmail only.'
        }
    },
    password: {
        required: {
            value: true,
            message: 'Password is required.'
        },
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long.'
        }
    }
}


const Register = () => {
    const { push } = useRouter();

    const [captchaVerified, setCaptchaVerified] = useState<boolean>(false)
    const [captchaText, setCaptchaText] = useState("");
    const [captchaInput, setCaptchaInput] = useState("")
    const [show, setShow] = useState<boolean>(false)
    const { register, formState: { errors, isSubmitting, isValid }, handleSubmit } = useForm<RegisterData>({});


    useEffect(() => {
        if (captchaInput === captchaText && captchaInput != "") {
            setCaptchaVerified(true);
        } else {
            setCaptchaVerified(false)
        }
    }, [captchaInput, captchaText])

    const onSubmit = async (fieldValues: RegisterData) => {
        if (!captchaVerified) {
            return toast.error('Please complete captcha verification')
        }
        emailRegister(fieldValues.email, fieldValues.password)
    }

    return (
        <>
            <h2 className="text-gray-600 text-lg font-medium title-font mb-6">Register Account</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" className="flex relative mt-2">
                    <Input
                        {...register('name', validation.name)}
                        type="text" id="name" name="name" placeholder="Mohammad Rizwan" className="pl-10 capitalize" />
                    <User className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                </label>
                {errors.name ? <Error > {errors.name.message} </Error> : null}
                <label htmlFor="email" className="flex relative mt-2">
                    <Input
                        {...register('email', validation.email)}
                        type="email" id="email" name="email" placeholder="rizwan2023@gmail.com" className="pl-10" />
                    <Mail className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                </label>
                {errors.email && <Error > {errors.email.message} </Error>}

                <label htmlFor="password" className="flex relative mt-2">
                    <Input
                        {...register('password', validation.password)}
                        type={show ? 'text' : 'password'} id="password" name="password" placeholder="***********"
                        className="pl-10 pr-10 "
                    />
                    <Lock className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                    <button tabIndex={-1} type="button" onClick={(e) => {
                        e.preventDefault();
                        setShow(prev => !prev)
                    }}
                        className="absolute h-full top-0 bottom-0 right-3 text-gray-400 hover:text-gray-500 cursor-pointer focus-visible:outline-none">
                        {show ? <Eye /> : <EyeOff />}
                    </button>
                </label>
                {errors.password && <Error > {errors.password.message} </Error>}

                {/* Captch */}
                <Captcha
                    captchaText={captchaText} setCaptchaText={setCaptchaText}
                    captchaInput={captchaInput} setCaptchaInput={setCaptchaInput}
                    captchaVerified={captchaVerified}
                />

                <Button type="submit" className="mt-4 w-full hover:shadow-lg active:animate-out transition-all disabled:cursor-not-allowed" disabled={isSubmitting || !captchaVerified}>
                    {isSubmitting ? <span className="animate-pulse">Processing...</span> : "Sign Up"}
                </Button>
            </form>
            <p className="leading-relaxed text-sm text-end mb-5 text-gray-600 select-none mt-6">Already have an account?
                <Link href="/login" className="hover:text-rose-400"> Login here</Link>
            </p >
        </>
    )
}

export default Register