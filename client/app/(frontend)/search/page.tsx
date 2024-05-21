import DonorsGrid from "./DonorsGrid";
import FilterBarNative from "./FilterBarNative";
import HeaderSearch from "./HeaderSearch";

const Page = () => {
    return (
        <div className="pb-5">
            <HeaderSearch />
            <FilterBarNative />
            {/* <FilterBarRadix /> */}
            <DonorsGrid />
            {/* <SelectBloodType /> */}

        </div>
    )
}

export default Page