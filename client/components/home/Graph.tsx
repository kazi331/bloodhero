import Image from "next/image"

import graphIndicator from 'public/images/graph-indicator.svg'
import graphNumber from 'public/images/graph-number.png'

const Graph = () => {
    return (
        <div className='mt-20 -mb-32 sm:-mb-40 bg-gradient-to-b from-transparent to-slate-50'>
            <div className="relative ">
                <Image src={graphIndicator} alt="graph" className="w-2/3 -mb-20 sm:-mb-28 h-auto " width={300} height={218} />
                <div className="absolute -top-10 left-2/3 ">
                    <Image src={graphNumber} alt="graph" className="relative h-auto w-auto" width={60} height={40} />
                    <span className="text-white text-sm font-medium absolute top-1 left-3 ">14.2K</span>
                </div>
            </div>
            <Image src="/images/graph.svg" alt="graph" className="w-full" width={414} height={318} />
        </div>
    )
}



export default Graph