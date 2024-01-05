'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import image from 'public/images/illustration/undraw_page_not_found.svg';

const NotFound = () => {
    const { refresh } = useRouter();
    return (
        <div className="flex flex-col space-y- items-center justify-center h-[100dvh] ">
            <Image src={image} alt="404" width={500} height={500} />
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button className='active:scale-95' onClick={() => refresh()}>
                    Try Again
                </Button>
                <Link href="/">
                    <Button className="bg-pink-100 text-pink-500 hover:bg-pink-200 active:scale-95">
                        Home
                    </Button>
                </Link>

            </div>

        </div>
    );
};

export default NotFound;