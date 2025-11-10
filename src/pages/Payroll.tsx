import { useEffect, useState } from "react"
import { usePageStore } from "../store/page-store"
import SearchInput from "../components/search-input/SearchInput"
import AddButton from "../components/add-entity/AddButton"
import type { PayrollRecord } from "../types/entites-types"
import Table from "../components/table/Table"
import dat from "../assets/dummy-data/Payroll.json"
import { createColumnHelper } from "@tanstack/react-table"
import InfomationDrawer from "../components/drawers/InfomationDrawer"
import { usePayrollStore } from "../store/payroll-store"
import EditPayrollDrawer from "../components/drawers/EditPayrollDrawer"
import CreatePayrollDrawer from "../components/drawers/CreatePayrollDrawer"


const Payroll = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()
    const { setCurrentPayroll} = usePayrollStore()


    const [searchInput, setSearchInput] = useState("")
    const [currentFilter, setCurrentFilter] = useState("all")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [drawerViewState, setDrawerViewState] = useState(false)
    const [editPayrollDrawerViewState, setEditPayrollDrawerViewState] = useState(false)
    const [createPayrollDrawerState, setCreatePayrollDrawerState] = useState(false)
    const [data] = useState(dat)


    const filters = ["all", "paid", "not_paid"]


    useEffect(()=>{
        setCurrentPage("Payroll")
    },[])

    const columnHelper = createColumnHelper<PayrollRecord>()

    const columnDef = [
      columnHelper.accessor("id", {
        header: "Payroll ID"
      }),
      columnHelper.accessor("employee_name", {
        header: "Employee Name"
      }),
      columnHelper.accessor("employee_id", {
        header: "Employee ID"
      }),
      columnHelper.accessor("gross_pay", {
        header: "Gross Pay",
        cell: ({getValue}) => <span>${getValue()}</span>
      }),   
      columnHelper.accessor("net_pay", {
        header: "Net Pay",
        cell: ({getValue}) => <span>${getValue()}</span>
      }),
      columnHelper.accessor("payment_status", {
        header: "Status",
        cell: ({getValue}) => 
        <span className={`${getValue() === "paid" ? "bg-green-400" : "bg-yellow-300"} px-3 py-1 rounded-full capitalize`}>
          {getValue()}
        </span>
      }),
      columnHelper.display({
        header: "Status",
        cell: ({row}) => 
        <div
        className={`
          flex gap-1
          [&>button]:opacity-70 [&>button]:hover:opacity-100 [&>button]:cursor-pointer [&>button]:active:scale-95
          [&>span]:opacity-50 
        `}
        >
          <button 
          onClick={()=>{setCurrentPayroll(row.original); setDrawerViewState(true)}}
          >
            view
          </button>
          
          {row.original.payment_status === "paid" ? "" : 
          <>
            <span>/</span>
            <button
            onClick={()=>{setCurrentPayroll(row.original); setEditPayrollDrawerViewState(true)}}
            >
              edit
            </button>
          </>  
          }
        </div>
      }),
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

            <SearchInput value={searchInput} setValue={setSearchInput} placeHolder={"Search Employee ID..."}/>

            <div className={`flex w-fit gap-1`}
            >
              {filters.map( filter => 
                <button
                key={filter}
                className={`text-[9px] py-1 px-2 rounded-sm ${filter === currentFilter && "bg-secondary text-secondary-text"} cursor-pointer active:scale-95 transition-set capitalize font-semibold`}
                onClick={()=>{setCurrentFilter(filter as "all" | "paid" | "not_paid")}}
                >
                  {filter}
                </button>
              )}
            </div>

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

          <div className="flex gap-2 ">
              
              <AddButton setAddElementViewState={setCreatePayrollDrawerState}/>
          </div>

        </div>

        {/* TABLE CONTAINER */}
        <div
        className={`h-123 rounded`}
        >
          <Table<PayrollRecord> Data={data as PayrollRecord[]} columnDef={columnDef} inputColumnFilterID={"id"} inputColumnFilterValue={searchInput} allowCheckBox={false} />
        </div>
      
      </div>
      <CreatePayrollDrawer viewState={createPayrollDrawerState} setViewState={setCreatePayrollDrawerState}/>
      <EditPayrollDrawer viewState={editPayrollDrawerViewState} setViewState={setEditPayrollDrawerViewState}/>
      <InfomationDrawer viewState={drawerViewState} setViewState={setDrawerViewState}/>
    </div>
  )
}

export default Payroll