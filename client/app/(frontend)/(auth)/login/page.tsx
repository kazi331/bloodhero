'use client'
import SocialLogin from '@/app/(frontend)/(auth)/SocialLogin';
import Link from 'next/link';
import LoginForm from './LoginForm';


function Login() {
    return (<>
        <h2 className="text-gray-600 text-lg font-bold title-font mb-6">Login to your Account</h2>
        <SocialLogin />
        <Separator />
        <LoginForm />
        <Footer />
    </>)
}

export default Login;

const Separator = () => <div className="flex items-center space-x-3 my-4">
    <div className='w-full h-0.5 rounded-full bg-gray-200 '></div>
    <span className='whitespace-nowrap text-gray-500 text-sm'>Or continue with</span>
    <div className='w-full h-0.5 rounded-full bg-gray-200 '></div>
</div>

const Footer = () => <p className="leading-relaxed text-sm text-end mb-5 text-gray-600 select-none mt-6">
    Don&apos;t have an account?
    <Link href="/signup" className='hover:text-rose-400'> Sign Up here</Link>
</p>
