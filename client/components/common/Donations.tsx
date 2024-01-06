import { donationType } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import dayjs from 'dayjs'
import Image from 'next/image'
import bloodIcon from 'public/icons/home/blood.svg'


const Donations = ({ donations }: { donations: donationType[] | null }) => {
    return (
        <Tabs defaultValue="donations" className="mt-10 text-white/80">
            <TabsList className="w-full rounded-lg shadow bg-transparent mb-4">
                <TabsTrigger className='flex-1 rounded-lg data-[state=active]:bg-primary/20 text-gray-300 data-[state=active]:text-primary' value="donations">Donations</TabsTrigger>
                <TabsTrigger className='flex-1 rounded-lg data-[state=active]:bg-primary/20 text-gray-300 data-[state=active]:text-primary' value="requests"  >Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="donations" className='pb-4'>

                {
                    donations?.length === 0 ?
                        <div className='flex flex-col items-center justify-center mt-10'>
                            <p className='capitalize'>No donations found!</p>
                        </div> :
                        donations?.map(donation => <Donation key={donation?._id} donation={donation} />)
                }


            </TabsContent>
            <TabsContent value="requests">
                <div className='flex flex-col items-center justify-center mt-10'>
                    <p className='capitalize'>No request found!</p>
                </div>
            </TabsContent>
        </Tabs>
    )
}

const Donation = ({ donation }: { donation: donationType }) => {
    return (<div className='flex mt-4'>
        <div className='flex flex-col items-center justify-center'>
            <Image src={bloodIcon} alt='blood icon' className='w-7 h-7 object-contain' />
            <span className='h-5 mt-1 border-r border-dashed border-r-green-500/90'></span>
        </div>
        <div className='ml-4'>
            <p className='text-xs'>{dayjs('8-18-2012').format('MMMM DD, YYYY')}</p>
            <p className='font-medium'>{donation.hospital}</p>
            <p className='text-xs'>{donation.patient}</p>
        </div>
    </div>)
}

export default Donations