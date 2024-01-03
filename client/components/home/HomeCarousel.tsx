'use client'
import BearCarousel, { TBearSlideItemDataList } from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';
import Image from 'next/image';
import Link from 'next/link';



const slides = [
    { id: 1, src: "/images/banner/banner1.jpg", link: "/" },
    { id: 3, src: "/images/banner/banner2.jpg", link: "/search" },
    { id: 4, src: "/images/banner/banner3.jpg", link: "/requests" },
    { id: 5, src: "/images/banner/banner5.jpg", link: "/" }
];

const breakpoints = {
    768: {
        height: { widthRatio: 16, heightRatio: 9 },
        isEnablePagination: false,
        isEnableNavButton: false,
    },
    1200: {
        height: { widthRatio: 32, heightRatio: 9 },
        isEnablePagination: true,
        isEnableNavButton: true,
    }
}




const data: TBearSlideItemDataList = slides.map(row => {
    return {
        key: row.id,
        // children: <Link href={row.link}><BearSlideImage src={row.src} alt='title' /></Link>
        children: <Link href={row.link}><Image src={row.src} loading="lazy" width={600} height={80} alt='title' /></Link>

    };
});

export const HomeCarousel = () => {
    return <BearCarousel
        data={data}
        className='bg-primary'
        isEnableNavButton
        isEnablePagination
        isEnableAutoPlay
    />

}