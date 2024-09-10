import { Suspense } from "react";
import DonorsGrid from "./DonorsGrid";
import FilterBarNative from "./FilterBarNative";
import HeaderSearch from "./HeaderSearch";

const Page = () => {
    return (
        <div className="pb-5">
            <HeaderSearch />
            <FilterBarNative />
            {/* <FilterBarRadix /> */}
            <Suspense>
                <DonorsGrid />
            </Suspense>
            {/* <SelectBloodType /> */}

        </div>
    )
}

export default Page