'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import unions from 'public/data/villages.json';

const FilterBarNative = () => {
    const router = useRouter();
    const params = useSearchParams().toString();
    const area = useSearchParams().get('area')
    const type = useSearchParams().get('type')
    // console.log(area, type)


    const handleChange = (e: any, query: string) => {
        // set new params in the url
        const newParams = new URLSearchParams(params);
        if (e.target.value === "") {
            newParams.delete(query);
            return router.push(`?${newParams.toString()}`, { scroll: false });
        }
        newParams.set(query, e.target.value);
        router.push(`?${newParams.toString()}`, { scroll: false });

    }

    return (
        <>
            <div className='mx-4'>
                <div className='flex space-x-0.5 w-full '>
                    {/* area */}
                    <select defaultValue={area || ''} aria-label='select'
                        onChange={(e) => handleChange(e, 'area')} name="area" id="area"
                        className='rounded-tl rounded-bl border w-3/5 border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10'
                    >
                        <option value="" > সিলেক্ট এরিয়া </option>
                        {
                            unions.map(union => {
                                return (
                                    <optgroup key={union.union} label={union.bangla}>
                                        {union?.villages?.map(villages => {
                                            return (<option key={villages.id} value={villages.name.toLocaleLowerCase()} >
                                                {villages.bangla}
                                            </option>
                                            )
                                        })}
                                    </optgroup>
                                )
                            })
                        }
                    </select>
                    {/* blood type */}
                    <select defaultValue={type || ''} aria-label='select'
                        onChange={(e) => handleChange(e, 'type')} name="type" id="type"
                        className='rounded-tr rounded-br border w-2/5 border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10'>
                        <option value="">Blood Type</option>
                        <option value="a">A Positive</option>
                        <option value="a-">A Negative</option>
                        <option value="b">B Positive</option>
                        <option value="b-">B Negative</option>
                        <option value="ab">AB Positive</option>
                        <option value="ab-">AB Negative</option>
                        <option value="o">O Positive</option>
                        <option value="o-">O Negative</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default FilterBarNative