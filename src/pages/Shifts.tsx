import { useEffect, useState } from "react"
import { usePageStore } from "../store/page-store"
import StatsCard from "../components/cards/StatsCard"
import { MdAddCircle, MdAssignmentTurnedIn, MdCalendarToday , MdDelete, MdEdit, MdPendingActions, MdSearch } from "react-icons/md"
import SearchInput from "../components/search-input/SearchInput"
import AddButton from "../components/add-entity/AddButton"
import AddElement from "../components/add-entity/AddElement"
import ConfirmationModal from "../components/modals/ConfirmationModal"
import Table from "../components/table/Table"
import type { Shift } from "../types/entites-types"
import { createColumnHelper } from "@tanstack/react-table"
import { useShiftStore } from "../store/shifts-store"
import EditShiftsDetailsDrawer from "../components/drawers/EditShiftsDetailsDrawer"
import { useEmployeesStore } from "../store/employees-store"
import ConfirmationModalTwo from "../components/modals/ConfirmationModalTwo"
import { useModalStore } from "../store/modal-store"

const Shifts = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()
    const {shiftsListener, shifts, setSelectedShift, deleteShift} = useShiftStore()
    const {employeesListener, employees} = useEmployeesStore()
    const {setConfirmationTwo, setConfirmationObject} = useModalStore()


    const [searchInput, setSearchInput] = useState("")
    const [currentFilter, setCurrentFilter] = useState<"all" | "assigned" | "unassigned" >("all")
    const [addElementViewState, setAddElementViewState] = useState<boolean>(false)
    const [editShiftsDetailsDrawerState, setEditShiftsDetailsDrawerState] = useState(false)
    const [assignShiftEmployeeSearch, setAssignShiftEmployeeSearch] = useState("")
    const [currentSelectedAssignmentShift, setCurrentSelectedAssignmentShift] = useState<Omit<Shift, "created_at"> | null>(null)
    const [selectedEmployeeID, setSelectedEmployeeID] = useState("")

    useEffect(()=>{
      console.log(assignShiftEmployeeSearch)
    },[assignShiftEmployeeSearch])


    const filters = ["all", "assigned", "unassigned"]


    useEffect(()=>{
        setCurrentPage("Shifts")
        const unsub = shiftsListener()
        const unsubEmp = employeesListener()


        return () => {
          unsub()
          unsubEmp()
        }
    },[])


    const columnHelper = createColumnHelper<Shift>()

    const columnDef = [
      columnHelper.accessor("id", {
        header: "ID"
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
                onClick={ e => e.stopPropagation()}
                className={`
                  space-x-1 
                  flex
                  [&>button]:cursor-pointer [&>button]:active:scale-90
        
                `}
                >
                  
                  <button
                  className={`text-accent-one`}
                  onClick={()=>{
                    setCurrentSelectedAssignmentShift(row.original)
                  }}
                  >
                    <MdAddCircle/>
                  </button>
        
                  <button
                  onClick={() => {
                    setEditShiftsDetailsDrawerState(true)
                    console.log("Hey there")  
                    setSelectedShift(row.original)
                  }
                  }
                  >
                    <MdEdit/>
                  </button>
                  
                  <button
                  className={`text-rose-400`}
                  onClick={() => {
                    deleteShift(row.original.id)
                  }}
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
        
        <StatsCard title={"Total Shifts"} count={shifts.length} Icon={MdCalendarToday} />
        <StatsCard title={"Shifts Assigned"} count={shifts.filter(x=>x.currently_assigned_to.length > 0).length} Icon={MdAssignmentTurnedIn} />
        <StatsCard title={"Shifts Unassigned"} count={shifts.filter(x=>x.currently_assigned_to.length === 0).length} Icon={MdPendingActions} />

        <div 
        className={`flex-1 h-40 bg-primary-comp-two rounded-lg shadow p-2 gap-6`}
        >   
          <div className="relative flex items-center gap-2">
            <input 
              type="text"
              value={assignShiftEmployeeSearch}
              onChange={(e)=> setAssignShiftEmployeeSearch(e.target.value)}
              className="w-32 h-6 border border-secondary/10 rounded px-6 focus:outline focus:outline-secondary/40 text-[10px]"
            />
            <span
            className={`w-18 max-w-18 text-[10px] text-ellipsis whitespace-nowrap line-clamp-1`}
            >
              ID: {currentSelectedAssignmentShift?.id}
            </span>
            <MdSearch className="top-1/2 -translate-y-1/2 absolute left-1" />
          </div>
          {
            currentSelectedAssignmentShift === null ?
            <p
            className={`text-[10px] p-2 italic`}
            >
              No Shift Selected...
            </p> :
            <div
            className={`bg-gray-300 h-28 max-h-28 rounded mt-2 p-1 text-[10px] overflow-y-scroll space-y-1`}
            >
              {
                employees.filter(employee => `${employee.last_name} ${employee.first_name} ${employee.middle_name}`.includes(assignShiftEmployeeSearch) && !["on_leave"].includes(employee.status))
                .map(employee => 
                  <button
                  className={`p-1 bg-primary rounded flex justify-between w-full active:scale-95 transition-set cursor-pointer`}
                  onClick={()=>{
                    setSelectedEmployeeID(employee.firebase_id)
                    setConfirmationTwo(true, `Assign ${employee.first_name} ${employee.last_name} ${employee.middle_name} to \n Shift Location: ${currentSelectedAssignmentShift.location} \n Shift ID: ${currentSelectedAssignmentShift.id}`)

                    setConfirmationObject({
                      ...currentSelectedAssignmentShift,
                      currently_assigned_to: [...currentSelectedAssignmentShift.currently_assigned_to, employee.id]
                    })

                    setCurrentSelectedAssignmentShift(null)
                  }}
                  >
                    <p>{`${employee.last_name} ${employee.first_name} ${employee.middle_name}`}</p>
                    <p
                    className={`text-[8px]`}
                    >
                      {employee.id}
                    </p>
                  </button>
                )
              }
            </div>
          }
        </div>
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
          <Table<Shift> Data={shifts} columnDef={columnDef} inputColumnFilterID={"location"} inputColumnFilterValue={searchInput} allowCheckBox />
        </div>

      </div>
      <AddElement viewState={addElementViewState} setViewState={setAddElementViewState} />
      <ConfirmationModal/>
      <EditShiftsDetailsDrawer viewState={editShiftsDetailsDrawerState} setViewState={setEditShiftsDetailsDrawerState}/>
      <ConfirmationModalTwo employeeID={selectedEmployeeID}/>
    </div>
  )
}

export default Shifts