'use client'
import BearCarousel, { TBearSlideItemDataList } from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';
import Image from 'next/image';
import Link from 'next/link';
import image1 from "@/public/images/banner/banner1.jpg";
import image2 from "@/public/images/banner/banner2.jpg";
import image3 from "@/public/images/banner/banner3.jpg";
import image5 from "@/public/images/banner/banner5.jpg";




const slides = [
    { id: 1, img: image1, link: "/" },
    { id: 3, img: image2, link: "/search" },
    { id: 4, img: image3, link: "/requests" },
    { id: 5, img: image5, link: "/" }
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
        children: <Link href={row.link}><Image src={row.img.src} loading="lazy" width={600} height={80} alt='title' blurDataURL={row.img.blurDataURL} /></Link>

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