import { useEffect, useState } from "react"
import SearchInput from "../components/search-input/SearchInput"
import Table from "../components/table/Table"
import type { ShiftRecord } from "../types/entites-types"
import dat from "../assets/dummy-data/shift_records_40_randomized.json"
import { createColumnHelper } from "@tanstack/react-table"
import InfomationDrawer from "../components/drawers/InfomationDrawer"
import { usePageStore } from "../store/page-store"
import { useRecordStore } from "../store/shift-records-store"
import { dateRangeFilter } from "../helper-functions/dateRangeFilter"
import { toast } from "react-toastify"

const Record = () => {

    const {setCurrentPage} = usePageStore()
    const {setCurrentRecord} = useRecordStore()

    const [searchInput, setSearchInput] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [data, setData] = useState<ShiftRecord[]>([])
    const [informationComponentViewState, setInformationComponentViewState] = useState(false)

    

    useEffect(()=>{
        setCurrentPage("Records")
    }, [])


    useEffect(()=>{

        if(startDate && endDate){
            if(new Date(startDate) > new Date(endDate)){
                toast.error("Error! End Date Cannot be less than start Date")

                return
            }
        }

        const filteredData = dateRangeFilter(startDate, endDate, dat)
        setData(filteredData)
    }, [startDate, endDate])

    const columnHelper = createColumnHelper<ShiftRecord>()

    const columnDef = [
        columnHelper.accessor("id", {
            header: "ID"
        }),
        columnHelper.accessor("employee_id", {
            header: ({column}) => 
                <input 
                type="text" 
                placeholder="Employee ID"
                className={`
                    w-25 p-1 
                    focus:font-normal
                    placeholder:text-primary-text    
                `}
                value={(column.getFilterValue() as string) ?? ""}
                onChange={ e => 
                    column.setFilterValue(e.target.value)
                }
                onClick={ e => e.stopPropagation() }
                />
        }),
        columnHelper.accessor("date", {
            header: "Date"
        }),
        columnHelper.accessor("is_paid", {
            header: "Payment Status",
            cell:({row}) => 
            <span
            className={`
            ${row.original.is_paid === false ? "bg-rose-200" : "bg-green-300"} p-1 px-3 rounded-full text-[10px]
            `}
            >
                {row.original.is_paid === false ? "Unpaid" : "Paid"}
            </span> 
        }),
        columnHelper.display({
            header: "Action",
            id: "actions",
            cell: ({row}) => 
                <button
                className={`hover:underline cursor-pointer active:scale-94`}
                onClick={()=>{
                    setInformationComponentViewState(prev => !prev);
                    setCurrentRecord(row.original)
                }}
                >   
                    view
                </button>
        })
    ]



  return (
    <div
    className={`
      h-full max-h-full p-4 flex flex-col gap-4 overflow-y-scroll pb-4 relative 
    `}
    > 

        <div className={`h-fit bg-primary-comp-two rounded-lg shadow`}>
        
            <div
            className={`p-2 flex justify-between`}
            >

                <div className={`
                flex gap-6 flex-wrap
                max-sm:gap-4  
                `}>

                    <SearchInput value={searchInput} setValue={setSearchInput} placeHolder={"Search Shift Record ID..."}/>

                    <div className={`flex w-fit gap-1`}>
                        <form 
                        className={`flex gap-2 text-[10px] items-center
                            [&_span]:font-bold
                            `}
                        >
                            <label>
                            <span> Start Date:{` `} </span>
                            <input 
                            type="date" 
                            value={startDate}
                            onChange={(e)=>{setStartDate(e.currentTarget.value)}}
                            />
                            </label>

                            <label>
                            <span> End Date:{` `} </span>
                            <input 
                            type="date" 
                            value={endDate}
                            onChange={(e)=>{setEndDate(e.currentTarget.value)}}
                            />
                            </label>
                        </form>
                    </div>

                </div>

            </div>

            {/* TABLE CONTAINER */}
            <div
            className={`h-123 rounded`}
            >
                <Table<ShiftRecord> 
                Data={data as ShiftRecord[]} 
                columnDef={columnDef} 
                inputColumnFilterID={"id"} 
                inputColumnFilterValue={searchInput} allowCheckBox={false} 
                />
            </div>
        
        </div>
        <InfomationDrawer viewState={informationComponentViewState} setViewState={setInformationComponentViewState}/>
    </div>
  )
}

export default Record