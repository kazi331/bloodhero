import { Hind_Siliguri, Inter, Tiro_Bangla } from 'next/font/google';
import '../styles/custom.css';
import '../styles/globals.css';


export const metadata = {
  title: 'Blood Hero',
  description: 'Donate blood, save lives and make a difference in the world. Find a blood donation center near you and schedule an appointment today!',
  url: 'https://bloodhero.vercel.app',
  image: 'https://bloodhero.vercel.app/images/og.png',
  // viewport: 'width=device-width, initial-scale=1',
  icon: '/favicon.ico',
  Heading: 'Join the life-saving community of blood donors',
  keywords: 'blood donation, blood, donate blood, save lives, blood donation app, blood donation website, blood donation center near me, blood donation website in bangladesh, blood donation website in bangladesh',
  author: 'Gopalnagar Roktimaloy Songothan',
  robots: 'index, follow',
  language: 'English, Bengali',
  googlebot: 'index, follow',
  google: 'nositelinkssearchbox',
  // og: {
  //   title: 'Blood Donation App',
  //   description: 'Donate blood, save lives',
  //   image: 'https://www.example.com/blood-donation.png',
  //   url: 'https://bloodhero.vercel.app',
  //   type: 'website',
  // },
  // twitter: {
  //   title: 'Blood Donation App',
  //   description: 'Donate blood, save lives',
  //   image: 'https://www.example.com/blood-donation.png',
  //   card: 'summary_large_image',
  // },
  developer: 'Kazi Shariful Islam',
  developerEmail: 'kazisharifulislam52@gmail.com',
  developerPhone: '+8801612178331',
  developerAddress: 'Dhaka, Bangladesh',
  developerWebsite: 'https://kazi331.vercel.app',
  developerGithub: 'https://github.com/kazi331',
  developerLinkedin: 'https://www.linkedin.com/in/kazi331/',
};


const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})


const tiro = Tiro_Bangla({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-tiro',
})


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <title>Donate blood, save lives</title>
        <meta name="description" content="Donate blood, Save lives" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />

        {/* meta info of this blood donation app */}
        <meta name="description" content="Donate blood, save lives" />
        <meta name="Heading" content="Join the life-saving community of blood donors" />
        <meta name="keywords" content="blood donation, blood, donate blood, save lives, blood donation app, blood donation website, blood donation website in bangladesh, blood donation website in bangladesh" />
        <meta name="author" content="Kazi Shariful Islam" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Bengali" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        {/* developer info  */}
        <meta name="developer" content="Kazi Shariful Islam" />
        <meta name="developer-email" content="kazisharifulislam52@gmail.com" />
        <meta name="developer-phone" content="+8801612178331" />
        <meta name="developer-address" content="Dhaka, Bangladesh" />
        <meta name="developer-website" content="https://kazi331.vercel.app" />
        <meta name="developer-github" content="https://github.com/kazi331" />
        <meta name="developer-linkedin" content="https://www.linkedin.com/in/kazi331/" />
      </head>
      <body>
        <main
          className={` ${tiro.variable}  ${inter.className} `}
        >{children}</main>
      </body>
    </html>
  )
}