'use client'

import { useDash } from "@/context/dashboardContext";

const Page = () => {
    const { donors, loading } = useDash();
    console.log(donors, loading)
    return (
        <>
            <title>Donors | Blood Hero</title>
            <div className="">
                donors
            </div>
        </>
    )
}

export default Page