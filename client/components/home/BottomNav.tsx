'use client'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Url } from 'next/dist/shared/lib/router/router';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import notificationsIcon from 'public/icons/nav/bell.svg';
import searchIcon from 'public/icons/nav/blood.svg';
import settingsIcon from 'public/icons/nav/gear.svg';
import homeIcon from 'public/icons/nav/home.svg';
import profileIcon from 'public/icons/nav/profile.svg';


const BottomNav = () => {
    const pathname = usePathname();
    return (
        <div className="h-16 flex items-center justify-between w-full px-4 sticky left-0 bottom-0 bg-white  drop-shadow ">
            <NavLink url="/" >
                <NavImg src={homeIcon} alt="home icon" url="/" pathname={pathname} />
                <Dot pathname={pathname} url="/" />
            </NavLink>
            <NavLink url="/profile" >
                <NavImg src={profileIcon} alt="home icon" url="/profile" pathname={pathname} />
                <Dot pathname={pathname} url="/profile" />
            </NavLink>
            <Link href="/search" className={`bottom-link bg-gradient-to-br from-[#ff78a9] to-[#df1b49]  rounded-xl pb-1 px-2.5 pt-3  -translate-y-6 shadow-primary ${pathname == "/search" ? "shadow-lg" : "shadow"} `}>
                <Image src={searchIcon}
                    className="transition-all hover:saturate-100 saturate-100 -translate-y-1 w-7 h-7"
                    alt="search icon" />
                <Dot pathname={pathname} url="/search" />
            </Link>
            <NavLink url="/settings">
                <NavImg src={settingsIcon} alt="home icon" url="/settings" pathname={pathname} />
                <Dot pathname={pathname} url="/settings" />
            </NavLink>
            <NavLink url="/notifications">
                <NavImg src={notificationsIcon} alt="home icon" url="/notifications" pathname={pathname} />
                <Dot pathname={pathname} url="/notifications" />
            </NavLink>

        </div>
    )
}

type NavImgProps = { src: string | StaticImport, alt: string, url: String, pathname: String }

const NavLink = ({ children, url }: { children: React.ReactNode, url: Url }) => {
    return <Link href={url} className={`bottom-link flex flex-col items-center justify-center p-2 active-transparent-bg`}>
        {children}
    </Link>
}

const NavImg = ({ src, alt, url, pathname }: NavImgProps) => {
    return <Image src={src}
        className={`transition-all hover:saturate-100 h-7 w-7 ${pathname === url ? "saturate-100 -translate-y-1" : "saturate-0"} `}
        alt={alt}
    />
}

const Dot = ({ pathname, url }: { pathname: string, url: String }) => {
    return <div className={` w-1 h-1 rounded-full bg-primary/60 shadow ${pathname === url ? "opacity-100" : "opacity-0"} `}></div>
}

export default BottomNav