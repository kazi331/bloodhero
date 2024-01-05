'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Component({ error, reset, }: { error: Error & { digest?: string }, reset: () => void }) {
    const { push } = useRouter();
    return (
        <section className="w-full h-screen flex flex-col items-center justify-center gap-8 bg-red-50 dark:bg-red-900">
            <h1 className="text-4xl font-bold text-red-600 dark:text-red-300">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md text-center">
                We&apos;re sorry for the inconvenience. Your contribution is very important to us as every blood donation can save
                lives. Please try again or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => reset()} className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-300 dark:text-red-900 dark:hover:bg-red-200">
                    Try Again
                </Button>

                <Button onClick={() => push('/')} className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    Home
                </Button>

                <Button className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-300 dark:text-green-900 dark:hover:bg-green-200">
                    Contact Developer
                </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md text-center mt-4">
                If you continue to experience issues, please click the &quot;Contact Developer&quot; button to send us a detailed report.
                We appreciate your patience and understanding.
            </p>
        </section>
    )
}

