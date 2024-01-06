import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { donorType } from '@/lib/types'
import { coloredBlood } from '@/public/icons/randomSvg'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import donorImg from 'public/images/user-round.png'

const Donor = ({ donor }: { donor: donorType }) => {
    console.log(donor)
    return (
        <Card className='mt-5 shadow donor-card'>
            <CardContent className="flex items-center space-x-4 p-2">
                <div className='flex items-center justify-center flex-col w-1/4'>
                    <Link href={`/donor/${donor._id}`} >
                        <Image src={donor.image || donorImg} alt="Profile Image" className='w-18 h-18 rounded-full ring-2 object-cover aspect-square ' width={80} height={80} />
                    </Link>
                </div>

                <div className='text-sm text-slate-200 flex-auto py-3 flex flex-col items-start space-y-'>
                    <Link href={`/donor/${donor._id}`} className='text-lg text-white font-medium'>{donor.name}</Link>
                    <h2 className='capitalize' >{donor.area}</h2>
                    <div className='flex items-center space-x-2 mt-2 '>
                        <Badge className='capitalize rounded-md' >{donor.type.split('')[0]} {donor.type?.split('')[1] === '-' ? 'Negative' : 'Positive'}</Badge>
                        <Badge variant={`${donor.isAvailable ? 'active_neon' : 'inactive_neon'}`} >
                            {donor.isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                        <a href={`tel:${donor.phone}`} ><Phone className={`ml-2 ${donor.isAvailable ? 'text-green-600' : 'text-yellow-500'}`} size={20} /></a>
                    </div>
                </div>

                <div className='p-2 flex flex-col items-center justify-center ' >
                    <div className='relative'>
                        {coloredBlood}
                        <div className='absolute top-2 -right-1 flex items-center justify-center shadow  bg-gradient-to-tr from-[#FF78A9] to-[#DF1B49] text-white rounded-full  w-6 h-6 text-mono text-[10px] font-medium uppercase'>
                            {donor.type}
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default Donor