import Image from 'next/image';
import Link from 'next/link';
import image from 'public/images/illustration/undraw_page_not_found.svg';

const NotFound = () => {
    return (
        <div className="flex flex-col space-y-4 items-center justify-center h-[100dvh] bg-slate-400">
            {/* <h1 className="text-9xl font-bold text-white mb-8">404</h1>
                        <p className="text-2xl font-medium text-white mb-16">Page not found</p> */}
            <Image src={image} alt="404" width={500} height={500} />
            <Link href="/" className="bg-white text-pink-500 px-6 py-3 rounded-lg font-medium hover:bg-primary/40 hover:text-white hover:shadow-xl border border-transparent hover:border-gray-200 transition duration-300 ease-in-out">
                Go back home
            </Link>
        </div>
    );
};

export default NotFound;