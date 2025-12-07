import { MdCalendarToday, MdVisibility, MdVisibilityOff } from "react-icons/md"
import StatsCard from "../components/cards/StatsCard"
import SearchInput from "../components/search-input/SearchInput"
import { useState } from "react"


const StaffShifts = () => {

    const [searchInput, setSearchInput] = useState("")
    const [currentFilter, setCurrentFilter] = useState<"all" | "pending" | "observed" | "missed">("all")
    const filters = ["all", "pedning", "observed", "missed"]

  return (
    <div
    className={`
      h-full max-h-full p-4 flex flex-col gap-4 overflow-y-scroll pb-4 relative 
    `}
    >
        <div 
      className={`
        h-fit flex gap-4 flex-wrap
      `}
      >

        <StatsCard title={"Total Shifts"} count={10} Icon={MdCalendarToday}/>
        <StatsCard title={"Shifts Observed"} count={10} Icon={MdVisibility}/>
        <StatsCard title={"Shifts Pending"} count={10} Icon={MdVisibility}/>
        <StatsCard title={"Shifts Missed"} count={10} Icon={MdVisibilityOff}/>

      </div>

      <div className={`h-fit bg-primary-comp-two rounded-lg shadow`}> 

        <div
        className={`p-2 flex justify-between relative`}
        >

            <div className={`
            flex gap-6 flex-wrap relative 
            max-sm:gap-4  
            `}>

                <SearchInput value={searchInput} setValue={setSearchInput} placeHolder={"Search Shift Name"}/>

                <div className={`flex w-fit gap-1`}
                >
                {filters.map( filter => 
                    <button
                    key={filter}
                    className={`text-[9px] py-1 px-2 rounded-sm ${filter === currentFilter && "bg-secondary text-secondary-text"} cursor-pointer active:scale-95 transition-set capitalize font-semibold`}
                    onClick={()=>{setCurrentFilter(filter as "all" | "pending" | "missed" | "observed")}}
                    >
                    {filter}
                    </button>
                )}
                </div>

            </div>

        </div>

      </div>
    </div>
  )
}

export default StaffShifts