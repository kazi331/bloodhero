'use client'
import Link from 'next/link';

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <h1 className="text-9xl font-bold text-white mb-8">{statusCode}</h1>
            {statusCode === 404 ? (
                <p className="text-2xl font-medium text-white mb-16">Page not found</p>
            ) : (
                <p className="text-2xl font-medium text-white mb-16">An error occurred</p>
            )}
            <Link href="/" className="bg-white text-pink-500 px-6 py-3 rounded-lg font-medium hover:bg-pink-500 hover:text-white hover:shadow-lg transition duration-300 ease-in-out">
                Go back home

            </Link>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }: { res: any, err: any }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;