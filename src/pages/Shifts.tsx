import { useEffect, useState } from "react"
import { usePageStore } from "../store/page-store"
import StatsCard from "../components/cards/StatsCard"
import { MdAddCircle, MdAssignmentTurnedIn, MdCalendarToday , MdDelete, MdEdit, MdPendingActions } from "react-icons/md"
import SearchInput from "../components/search-input/SearchInput"
import AddButton from "../components/add-entity/AddButton"
import AddElement from "../components/add-entity/AddElement"
import ConfirmationModal from "../components/modals/ConfirmationModal"
import Table from "../components/table/Table"
import type { Shift } from "../types/entites-types"
import { createColumnHelper } from "@tanstack/react-table"
import dat from "../assets/dummy-data/bar_shifts_updated.json"

const Shifts = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()


    const [data, setData] = useState<Shift[]>(dat)
    const [searchInput, setSearchInput] = useState("")
    const [currentFilter, setCurrentFilter] = useState<"all" | "assigned" | "unassigned" >("all")
    const [addElementViewState, setAddElementViewState] = useState<boolean>(false)


    const filters = ["all", "assigned", "unassigned"]


    useEffect(()=>{
        setCurrentPage("Shifts")
    },[])


    const columnHelper = createColumnHelper<Shift>()

    const columnDef = [
      columnHelper.accessor("id", {
        header: "ID"
      }),
      columnHelper.accessor("duration", {
        header: "Duration"
      }),
      columnHelper.accessor("start_time", {
        header: "Start Time"
      }),
      columnHelper.accessor("end_time", {
        header: "End Time"
      }),
      columnHelper.accessor("location", {
        header: "Location"
      }),
      columnHelper.display({
        header: "Action",
        id: "action",
        cell: ({row}) => 
                <div
                className={`
                  space-x-1 
                  [&>button]:cursor-pointer [&>button]:active:scale-90
        
                `}
                >
                  <button
                  className={`text-accent-one`}
                  >
                    <MdAddCircle/>
                  </button>
        
                  <button
                  className={``}
                  >
                    <MdEdit/>
                  </button>
                  
                  <button
                  className={`text-rose-400`}
                  >
                    <MdDelete/>
                  </button>
                </div>
      }),
    ]

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
        <StatsCard title={"Total Shifts"} count={data.length} Icon={MdCalendarToday} />
        <StatsCard title={"Shifts Assigned"} count={data.filter(x=>x.currently_assigned_to.length>0).length} Icon={MdAssignmentTurnedIn} />
        <StatsCard title={"Shifts Unassigned"} count={data.filter(x=>x.currently_assigned_to.length===0).length} Icon={MdPendingActions} />
      </div>

      <div className={`h-fit bg-primary-comp-two rounded-lg shadow`}> 
        <div
        className={`p-2 flex justify-between relative`}
        >
          <div className={`
            flex gap-6 flex-wrap relative 
            max-sm:gap-4  
          `}>
            {/* SEARCH INPUT FOR TABLE */}
            <SearchInput value={searchInput} setValue={setSearchInput} placeHolder={"Search Shift Name"}/>


            <div className={`flex w-fit gap-1`}
            >
              {filters.map( filter => 
                <button
                key={filter}
                className={`text-[9px] py-1 px-2 rounded-sm ${filter === currentFilter && "bg-secondary text-secondary-text"} cursor-pointer active:scale-95 transition-set capitalize font-semibold`}
                onClick={()=>{setCurrentFilter(filter as "all" | "assigned" | "unassigned")}}
                >
                  {filter}
                </button>
              )}
            </div>  
          </div>
          <AddButton setAddElementViewState={setAddElementViewState} />
        </div>

        {/* TABLE CONTAINER */}
        <div
        className={`h-123 rounded`}
        >
          <Table<Shift> Data={data} columnDef={columnDef} inputColumnFilterID={"location"} inputColumnFilterValue={searchInput} />
        </div>

      </div>
      <AddElement viewState={addElementViewState} setViewState={setAddElementViewState} />
      <ConfirmationModal/>
    </div>
  )
}

export default Shifts