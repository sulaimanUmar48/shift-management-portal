import { useEffect, useState } from "react"
import { usePageStore } from "../store/page-store"
import StatsCard from "../components/cards/StatsCard"
import { MdBlock, MdCheckCircle, MdHourglassEmpty, MdMoreTime } from "react-icons/md"
import SearchInput from "../components/search-input/SearchInput"
import Table from "../components/table/Table"
import type { Overtime } from "../types/entites-types"
import { createColumnHelper } from "@tanstack/react-table"


const Overtimes = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()

    const [currentFilter, setCurrentFilter] = useState<"pending" | "approved" | "rejected">("pending")
    const [searchInput, setSearchInput] = useState("")
    const [data] = useState<Overtime[]>([])


    const filters = ["pending", "approved", "rejected"]

    useEffect(()=>{
        setCurrentPage("Overtime")
    },[])



    // COLUMN DEF
    const columnHelper = createColumnHelper<Overtime>()



    // COLUMN DEF FOR PENDING
    
    const pendingColumnDef = [
      columnHelper.display({
        header: "Action",
        id: "accept/reject",
        cell: ( ) => <div className={`flex gap-2`}>
          <button
          className={`
          text-green-600 cursor-pointer active:scale-90   
          `}
          >
            <MdCheckCircle className={`w-3.5 h-3.5`}/>
          </button>
          <button
          className={`
            text-red-600 cursor-pointer active:scale-90 
          `}
          >
            <MdBlock className={`w-3.5 h-3.5`}/>
          </button>
        </div>
      })
    ] 

    // REJECTED COLUMN DEF
    const rejectedColumnDef = [
      columnHelper.accessor("rejected_at", {
        header: "Rejected At"
      }),
      columnHelper.accessor("overseer_id", {
        header: "Overseer ID"
      }),
    ]

    // REJECTED COLUMN DEF
    const approvedColumnDef = [
      columnHelper.accessor("approved_at", {
        header: "Approved At"
      }),
      columnHelper.accessor("overseer_id", {
        header: "Overseer ID"
      }),
    ]

    // GENERAL COLUMN DEF
    const columnDef = [
      columnHelper.accessor("id", {
        header: "ID"
      }),
      columnHelper.accessor("shift_location", {
        header: "Shift Location"
      }),
      columnHelper.accessor("shift_id", {
        header: "Shift ID"
      }),
      columnHelper.accessor("employee_id", {
        header: "Employee ID"
      }),
      columnHelper.accessor("requested_at", {
        header: "Requested At"
      }),
      columnHelper.accessor("reason", {
        header: "Reason"
      }),
      columnHelper.accessor("status", {
        header: "Status"
      }),
      ...currentFilter === "pending" ?
      pendingColumnDef :
      currentFilter === "approved" ?
      approvedColumnDef :
      currentFilter === "rejected" ?
      rejectedColumnDef :
      []
    ]



    // DUMMY DATA 

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

        <StatsCard title={"Overtime Requests"} count={data.length} Icon={MdMoreTime} />
        <StatsCard title={"Requests Pending"} count={data.filter(x=>x.status === "pending").length} Icon={MdHourglassEmpty} />
        <StatsCard title={"Requests Approved"} count={data.filter(x=>x.status === "approved").length} Icon={MdCheckCircle} />
        <StatsCard title={"Requests Rejected"} count={data.filter(x=>x.status === "rejected").length} Icon={MdBlock} />
        
      </div>

      <div className={`h-fit bg-primary-comp-two rounded-lg shadow`}>
        <div
        className={`p-2 flex justify-between`}
        >

          <div className={`
            flex gap-6 flex-wrap
            max-sm:gap-4  
          `}>
            {/* SEARCH INPUT FOR TABLE */}
            <SearchInput value={searchInput} setValue={setSearchInput} placeHolder={"Search Overtime ID"}/>


            <div className={`flex w-fit gap-1`}
            >
              {filters.map( filter => 
                <button
                key={filter}
                className={`text-[9px] py-1 px-2 rounded-sm ${filter === currentFilter && "bg-secondary text-secondary-text"} cursor-pointer active:scale-95 transition-set capitalize font-semibold`}
                onClick={()=>{
                  setCurrentFilter(filter as "pending" | "approved" | "rejected");
                }}
                >
                  {filter}
                </button>
              )}
            </div>  
          </div>

          
          
        </div>

              {/* TABLE CONTAINER */}
        <div
        className={`h-123 rounded`}
        >
          <Table<Overtime> Data={data} columnDef={columnDef} inputColumnFilterID={"id"} inputColumnFilterValue={searchInput} allowCheckBox={false} />
        </div>
      </div>
    </div>
  )
}

export default Overtimes