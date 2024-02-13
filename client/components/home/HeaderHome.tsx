import Image from 'next/image';
import mapIcon from 'public/icons/home/map.svg';
import toggleIcon from 'public/icons/home/toggle.svg';


const HeaderHome = () => {
    return (
        <div className="topbar-h flex items-center justify-between px-4">
            <span className="flex items-center space-x-1">
                <Image src={mapIcon} alt="Map-icon" className='mr-1' />
                <p className='text-primary/70 text-sm font-siliguri'>গোপালনগর, ব্রাহ্মণপাড়া, কুমিল্লা </p>
            </span>
            <Image src={toggleIcon} alt="Toggle button" className='w-5 h-5' />
        </div>
    )
}

export default HeaderHome


