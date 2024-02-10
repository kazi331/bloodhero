'use client'
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/ui/icons';
import { appleLogin, facebookLogin, githubLogin, googleLogin } from '@/lib/SocialLogin';
import { Button } from '@components/ui/button';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SocialLogin = () => {
    const { push } = useRouter();


    return (
        <div className='flex flex-col gap-y-2'>
            <Button onClick={googleLogin} className="w-full text-gray-700 " variant="outline">
                <GoogleIcon className="h-5 w-5 mr-2" />Login with Google</Button>
            <Button onClick={githubLogin} className="w-full text-gray-700 " variant="outline">
                <Github className="h-5 w-5 mr-2" />Login with Github</Button>
            <Button onClick={facebookLogin} className="w-full text-gray-700 " variant="outline">
                <FacebookIcon className="h-5 w-5 mr-2 text-gray-500" />Login with Facebook</Button>
            <Button onClick={appleLogin} className="w-full text-gray-700 " variant="outline">
                <AppleIcon className="h-6 w-6 mr-2" />Login with Apple</Button>
        </div>
    )
}

export default SocialLogin




