import { useEffect, useState } from "react"
import { usePageStore } from "../store/page-store"
import StatsCard from "../components/cards/StatsCard"
import { MdAddCircle, MdAssignmentInd, MdBeachAccess, MdEdit, MdGroupOff, MdGroups } from "react-icons/md"
import Table from "../components/table/Table"
import type { Employee } from "../types/entites-types"
import { createColumnHelper } from "@tanstack/react-table"
import SearchInput from "../components/search-input/SearchInput"
import AddElement from "../components/add-entity/AddElement"
import AddButton from "../components/add-entity/AddButton"
import ConfirmationModal from "../components/modals/ConfirmationModal"
import { useEmployeesStore } from "../store/employees-store"
import EditEmployeeDetailsDrawer from "../components/drawers/EditEmployeeDetailsDrawer"


const Employees = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()
    const {employees, employeesListener, setSelectedEmployee} = useEmployeesStore()


    // const [data] = useState<Employee[]>(dat as Employee[])
    const [searchInput, setSearchInput] = useState("")
    const [currentFilter, setCurrentFilter] = useState<"all" | "active" | "on_leave" | "inactive">("all")
    const [addElementViewState, setAddElementViewState] = useState<boolean>(false)
    const [editEmployeeInfoDrawerState, setEditEmployeeInforDrawerState] = useState(false )

    useEffect(()=>{
      const unSubList = employeesListener()

      return unSubList
    },[])

    useEffect(()=>{
      console.log(employees)
    }, [employees])

    useEffect(()=>{console.log(addElementViewState)},[addElementViewState])

    const filters = ["all", "active", "inactive", "on_leave"]


    useEffect(()=>{
        setCurrentPage("Employees")
    },[])

    const columnHelper = createColumnHelper<Employee>()


    const columnDef = [
      columnHelper.display({
        header: "Name",
        id: "name",
        cell: ({row}) => 
        <span>
          {row.original.first_name} {row.original.last_name}
        </span>,
        filterFn: (row, _columnId, searchInput) => {
          const fullname = `${row.original.first_name} ${row.original.last_name}`.toLowerCase()
          return fullname.includes(searchInput.toLowerCase())
        }

      }),
      columnHelper.accessor("id", {
        header: "ID"
      }),
      columnHelper.accessor("email", {
        header: "Email"
      }),
      columnHelper.accessor("phone", {
        header: "Phone"
      }),
      columnHelper.accessor("role", {
        header: "Role"
      }),
      columnHelper.accessor("hourly_rate", {
        header: "Hourly Rate",
        cell: ({getValue}) => <span>${getValue()}</span>
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({getValue}) => 
        <span 
        className={`
          py-1 px-2 rounded-full
          text-[9px]
          ${getValue() === "active" ?
            "bg-green-400" :
            getValue() === "inactive" ?
            "bg-red-300" :
            getValue() === "on_leave" ?
            "bg-yellow-200" :
            ""
          }  
        `}
        >
          {getValue()}
        </span>
      }),

      columnHelper.display({
        header: "Action",
        id: "assign_shift",
        cell: ({row}) => 
        <div
        className={`
          space-x-1 
          [&>button]:cursor-pointer [&>button]:active:scale-90

        `}

        onClick={ e => e.stopPropagation() }
        >
          {
            currentFilter === "inactive" &&
            <button
            className={`text-accent-one`}
            >
              <MdAddCircle/>
            </button>
          }

          <button
          className={``}
          onClick={()=>{
            setEditEmployeeInforDrawerState(true)
            setSelectedEmployee(row.original)
          }}
          >
            <MdEdit/>
          </button>
          
        </div>
      })
    ]

    const filteredData = employees.filter( employee => {
      if (currentFilter === "all") return true
      return  employee.status === currentFilter
    })
    console.log(filteredData)

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

        <StatsCard title={"Total Employees"} count={employees.length} Icon={MdGroups} />
        <StatsCard title={"Active Employees"} count={employees.filter(x => x.status === "active").length} Icon={MdAssignmentInd} />
        <StatsCard title={"Inactive Employees"} count={employees.filter(x => x.status === "inactive").length} Icon={MdGroupOff } />
        <StatsCard title={"Employees On Leave"} count={employees.filter(x => x.status === "on_leave").length} Icon={MdBeachAccess} />
        
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
            <SearchInput value={searchInput} setValue={setSearchInput} placeHolder={"Search employee name..."}/>


            <div className={`flex w-fit gap-1`}
            >
              {filters.map( filter => 
                <button
                key={filter}
                className={`text-[9px] py-1 px-2 rounded-sm ${filter === currentFilter && "bg-secondary text-secondary-text"} cursor-pointer active:scale-95 transition-set capitalize font-semibold`}
                onClick={()=>{setCurrentFilter(filter as "all" | "active" | "inactive" | "on_leave")}}
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
          <Table<Employee> Data={filteredData} columnDef={columnDef} inputColumnFilterID={"name"} inputColumnFilterValue={searchInput} allowCheckBox={false} />
        </div>
      </div>

      <AddElement viewState={addElementViewState} setViewState={setAddElementViewState} />
      <ConfirmationModal/>
      <EditEmployeeDetailsDrawer viewState={editEmployeeInfoDrawerState} setViewState={setEditEmployeeInforDrawerState}/>
    </div>
  )
}

export default Employees