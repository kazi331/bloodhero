'use client'
import { appleLogin, facebookLogin, googleLogin } from '@/lib/logins';
import { Button } from '@components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SocialLogin = () => {
    const { push } = useRouter();


    return (
        <div className='flex gap-x-2'>
            <Button className="w-full text-gray-700  " variant="outline" onClick={googleLogin}>
                {/* <GoogleIcon className="h-5 w-5 mr-2" /> */}
                <Image width={20} height={24} src="/brand/google.svg" alt="google" className='h-auto w-auto' />
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" onClick={facebookLogin}>
                <Image width={20} height={24} src="/brand/facebook.svg" alt="facebook" className='h-auto w-auto' />
                {/* <FacebookIcon className="h-5 w-5 mr-2 text-gray-500" /> */}
            </Button>
            <Button className="w-full text-gray-700  " variant="outline" onClick={appleLogin}>
                {/* <AppleIcon className="h-6 w-6 mr-2" /> */}
                <Image width={20} height={24} src="/brand/apple.svg" alt="apple" className='h-auto w-auto' />
            </Button>
        </div>
    )
}

export default SocialLogin




