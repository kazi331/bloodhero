'use client'

import { useDash } from "@/context/dashboardContext";

const page = () => {
    const { donors, loading } = useDash();
    console.log(donors, loading)
    return (
        <>
            <title>Donors | Blood Hero</title>
            <div className="">

                {/* <div className=""></div> */}
                donors
            </div>
        </>
    )
}

export default page