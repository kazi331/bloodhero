import Cards from "@/components/home/Cards"
import Graph from "@/components/home/Graph"
import HeaderHome from "@/components/home/HeaderHome"
import { HomeCarousel } from "@/components/home/HomeCarousel"
import TextContent from "@/components/home/TextContent"
import { Inter } from "next/font/google"


export const metadata = {
    title: 'Home - Blood Hero',
    description: 'Home page',
    keywords: 'Home, page',
    robots: 'index, follow'
}
const poppins = Inter({
    subsets: ['latin'],
    display: 'swap',
})
const Page = () => {
    return (
        <div className={poppins.className}>
            <HeaderHome />
            <HomeCarousel />
            <TextContent />
            <Graph />
            <Cards />
        </div>
    )
}

export default Page