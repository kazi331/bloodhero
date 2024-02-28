import Image from "next/image"
import logo from 'public/images/logo.svg'

const Header = () => {
    return (
        <div className='flex flex-col items-center justify-center py-4 flex-grow'>
            <Image src={logo} alt="logo" property="true" className="w-14" />
            <h1 className="text-primary/70 font-bold text-2xl mt-2 ">Blood Hero</h1>
        </div>
    )
}

export default Header