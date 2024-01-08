import Error from '@/components/common/Error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from '@/lib/axios';

import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';


const emailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // support only gmail.com

type loginData = { email: string, password: string }
const LoginForm = () => {

    const { push } = useRouter();
    const [show, setShow] = useState<boolean>(false)
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch, reset, } = useForm<loginData>({
    });
    const passwordToggle = (e: FormEvent) => {
        e.preventDefault();
        setShow(prev => !prev)
    }
    const onSubmit = async (fieldValues: loginData) => {
        try {
            const res = await axios.post('/auth/login', { ...fieldValues, email: fieldValues.email.toLowerCase() })
            if (res.data.success) {
                // push('/profile')
                localStorage.setItem('user', JSON.stringify(res.data?.user));
                toast.success(res.data.message, {
                    description: "You are being redirected to your profile..."
                })
                setTimeout(() => {
                    window.location.href = '/profile' // this is a hack to reload the page and get new data from server
                }, 1000);
            }
        } catch (err: any) {
            console.log(err.message)
            toast.error(err.response?.data.message, {
                description: "Check your email and password"
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="flex relative mt-2">
                <Input
                    {...register('email', { required: true, pattern: emailRegExp })}
                    type="email" id="email" name="email" placeholder="rizwan2023@gmail.com" className="pl-10 " />
                <Mail className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
            </label>
            {errors.email ? <Error>Enter a valid email address.</Error> : null}
            <label htmlFor="password" className="flex relative mt-2">
                <Input
                    {...register('password', { required: true })}
                    type={show ? 'text' : 'password'} id="password" name="password" placeholder="***********" className="pl-10 pr-10 " autoComplete="off" />
                <Lock className="absolute h-full top-0 bottom-0 left-2 text-gray-400" />
                <button tabIndex={-1} type="button" onClick={passwordToggle} className="absolute h-full top-0 bottom-0 right-3 text-gray-400 hover:text-gray-500 cursor-pointer focus-visible:outline-none">
                    {show ? <Eye /> : <EyeOff />}
                </button>
            </label>

            {errors.password ? <Error>Enter your password.</Error> : null}
            <Button disabled={isSubmitting} className="mt-4 w-full">{isSubmitting ? 'Signing in...' : 'Sign in'}</Button>
        </form>

    )
}

export default LoginForm
