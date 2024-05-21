'use client'
import { GoogleIcon } from '@/components/ui/icons';
import { serverURI } from '@/lib/utils';
import { Button } from '@components/ui/button';
import { Github } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SocialLogin = () => {
    const { push } = useRouter();
    const loginWith = async (provider: string) => {
        const authWindow = window.open(`${serverURI}/api/auth/${provider}`, '_self')
    }

    return (
        <div className='flex gap-x-2'>
            <Button className="w-full text-gray-700  " variant="outline" onClick={() => loginWith("google")}>
                {/* <GoogleIcon className="h-5 w-5 mr-2" /> */}
                <Image width={20} height={24} src="/brand/google.svg" alt="google" className='h-auto w-auto' />
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" onClick={() => loginWith("facebook")}>
                <Image width={20} height={24} src="/brand/facebook.svg" alt="facebook" className='h-auto w-auto' />
                {/* <FacebookIcon className="h-5 w-5 mr-2 text-gray-500" /> */}
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" onClick={() => loginWith("apple")}>
                {/* <AppleIcon className="h-6 w-6 mr-2" /> */}
                <Image width={20} height={24} src="/brand/apple.svg" alt="apple" className='h-auto w-auto' />
            </Button>
        </div>
    )
}

export default SocialLogin




