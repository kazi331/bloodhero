'use client'
import { Spinner } from '@/components/spinner';
import { loginWith } from '@/lib/firebase';
import { Button } from '@components/ui/button';
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import Image from 'next/image';
import { useState } from 'react';

const SocialLogin = () => {
    const [loading, setLoading] = useState(false)


    return (
        <div className='flex gap-x-2'>
            <Button className="w-full text-gray-700  " variant="outline" disabled={loading} onClick={() => loginWith(new GoogleAuthProvider, setLoading)}>
                {/* <GoogleIcon className="h-5 w-5 mr-2" /> */}
                {!loading ? <Image width={20} height={24} src="/brand/google.svg" alt="google" className='h-auto w-auto' /> : <Spinner  />}
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" disabled={loading} onClick={() => loginWith(new FacebookAuthProvider, setLoading)}>
                {!loading ? <Image width={20} height={24} src="/brand/facebook.svg" alt="facebook" className='h-auto w-auto' /> : <Spinner  />}
                {/* <FacebookIcon className="h-5 w-5 mr-2 text-gray-500" /> */}
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" disabled={loading} onClick={() => loginWith(new OAuthProvider('apple.com'), setLoading)}>
                {/* <AppleIcon className="h-6 w-6 mr-2" /> */}
                {!loading ? <Image width={20} height={24} src="/brand/apple.svg" alt="apple" className='h-auto w-auto' /> : <Spinner  />}
            </Button>
        </div>
    )
}

export default SocialLogin




