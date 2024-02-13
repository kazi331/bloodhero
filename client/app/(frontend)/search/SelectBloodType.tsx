'use client'
import { coloredBlood, trasnparentBlood } from "@/public/icons/randomSvg";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from 'react';


const bloods: { value: string, name: string }[] = [
    { value: "a", name: "A Positive" },
    { value: "a-", name: "A Negative" },
    { value: "b", name: "B Positive" },
    { value: "b-", name: "B Negative" },
    { value: "ab", name: "AB Positive" },
    { value: "ab-", name: "AB Negative" },
    { value: "o", name: "O Positive" },
    { value: "o-", name: "O Negative" },
]

const SelectBloodType = () => {
    const [selected, setSelected] = useState('')
    const router = useRouter();
    const params = useSearchParams().toString();

    const startSearch = () => {
        // set new params in the url
        const newParams = new URLSearchParams(params);
        newParams.set("type", selected);
        router.push(`?${newParams.toString()}`, { scroll: false });
    }


    return (
        <>
            {/* gradient title */}
            <p className='text-center text-lg font-bold text-slate-700 mb-3'>
                <span >Select</span>
                <span className='text-[#FF78A9]'> Blood</span>
                <span > Type </span>
            </p>
            {/* blood types  */}
            <div className='flex flex-wrap items-center justify-center'>
                {bloods.map((blood) => <TypeItem key={blood.value} value={blood.value} name={blood.name} selected={selected} setSelected={setSelected} />)}
            </div>

            {/* search button  */}
            <div className='w-ful px-3 mt-3'>
                <button onClick={startSearch} className='w-full py-2 font-medium text-lg text-white bg-slate-800  rounded-lg'>Search</button>
            </div>
        </>
    )
}

const TypeItem = ({ selected, setSelected, value, name }: {
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    name: string
}) => {

    return (
        <div className="w-1/2 min-w-max">
            <div className='m-2 mx-3'>
                <button onClick={() => setSelected(value)} className='p-2 w-full bg-gray-100 flex flex-col items-center justify-center shadow text-center rounded-lg ' >
                    <div className='relative'>
                        {selected === value ? coloredBlood : trasnparentBlood}
                        <div className='absolute top-2 -right-1 flex items-center justify-center shadow  bg-gradient-to-tr from-[#FF78A9] to-[#DF1B49] text-white rounded-full  w-6 h-6 text-mono text-[10px] font-medium uppercase'>{value}</div>
                    </div>
                    <p className='text-slate-700 text-xs whitespace-nowrap w-full font-medium '>{name}</p>
                </button>
            </div>
        </div>
    )
}

export default SelectBloodType