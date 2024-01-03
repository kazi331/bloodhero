import DonorsGrid from "./c/DonorsGrid"
import FilterBarNative from "./c/FilterBarNative"
import HeaderSearch from "./c/HeaderSearch"

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