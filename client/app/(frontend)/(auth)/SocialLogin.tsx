'use client'
import { GoogleIcon } from '@/components/ui/icons';
import { Facebook, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
const SocialLogin = () => {
    const { push } = useRouter();
    const server = 'http://localhost:5000';
    const loginWith = (provider: string) => {
        window.open(`${server}/api/auth/${provider}`, '_self')
    }

    return (
        <div className='flex flex-col gap-y-2'>
            <Button onClick={() => loginWith('facebook')} className="w-full text-gray-700" variant="outline">
                <Facebook className="h-5 w-5 mr-2" />
                Login with Facebook
            </Button>
            <Button onClick={() => loginWith('google')} className="w-full text-gray-700 " variant="outline">
                <GoogleIcon className="h-5 w-5 mr-2" />
                Login with Google
            </Button>
            <Button onClick={() => loginWith('github')} className="w-full text-gray-700 " variant="outline">
                <Github className="h-5 w-5 mr-2" />
                Login with Github
            </Button>

        </div>
    )
}

export default SocialLogin




