import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })
export default function FrontLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div className={inter.className}>
            <div className="container">
                <div>Backend layout</div>
                {children}
                <div>Backend footer</div>
            </div>
        </div>
    )
}