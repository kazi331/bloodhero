'use client'
import { loginWith } from '@/lib/firebase';
import { Button } from '@components/ui/button';
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SocialLogin = () => {
    const { push } = useRouter();
    const [loading, setLoading] = useState(false)


    return (
        <div className='flex gap-x-2'>
            <Button className="w-full text-gray-700  " variant="outline" onClick={() => loginWith(new GoogleAuthProvider, setLoading)}>
                {/* <GoogleIcon className="h-5 w-5 mr-2" /> */}
                <Image width={20} height={24} src="/brand/google.svg" alt="google" className='h-auto w-auto' />
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" onClick={() => loginWith(new FacebookAuthProvider, setLoading)}>
                <Image width={20} height={24} src="/brand/facebook.svg" alt="facebook" className='h-auto w-auto' />
                {/* <FacebookIcon className="h-5 w-5 mr-2 text-gray-500" /> */}
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" onClick={() => loginWith(new OAuthProvider('apple.com'), setLoading)}>
                {/* <AppleIcon className="h-6 w-6 mr-2" /> */}
                <Image width={20} height={24} src="/brand/apple.svg" alt="apple" className='h-auto w-auto' />
            </Button>
        </div>
    )
}

export default SocialLogin




