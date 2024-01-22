import Image from 'next/image';
import toggleIcon from 'public/icons/home/toggle.svg';
import arrowLeft from 'public/icons/profile/arrow-left.svg';

const HeaderSearch = () => {
    return (
        <div className="topbar-h flex items-center justify-between mx-6">
            <Image src={arrowLeft} alt="Map-icon" className='mr-1' />
            <p className='text-slate-600 font-semibold'>Search Blood</p>
            <Image src={toggleIcon} alt="Toggle button" className='w-5 h-5' />
        </div>
    )
}

export default HeaderSearch