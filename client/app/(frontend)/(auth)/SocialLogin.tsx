'use client'
import { GoogleIcon } from '@/components/ui/icons';
import { serverURI } from '@/lib/utils';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';

console.log(serverURI, process.env.NEXT_PUBLIC_SERVER_URL_PROD)

const SocialLogin = () => {
    const { push } = useRouter();


    const loginWith = (provider: string) => {
        window.open(`${serverURI}/api/auth/${provider}`, '_self')
    }

    return (
        <div className='flex flex-col gap-y-2'>
            {/*  <Button onClick={() => loginWith('facebook')} className="w-full text-gray-700" variant="outline">
                <Facebook className="h-5 w-5 mr-2" />
                Login with Facebook
            </Button> */}
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




