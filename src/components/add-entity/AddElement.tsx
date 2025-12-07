import { useEffect, useState, type FormEvent } from "react"
import { usePageStore } from "../../store/page-store"
import type { Employee, Shift } from "../../types/entites-types"
import { typedKeys } from "../../helper-functions/typedKeys"
import { MdAdd, MdClose } from "react-icons/md"
import { useModalStore } from "../../store/modal-store"
import { useEmployeesStore } from "../../store/employees-store"
import { useShiftStore } from "../../store/shifts-store"
import { generateCustomID } from "../../helper-functions/generateID"

type Props = {
  viewState: boolean
  setViewState: (value: false) => void
}

type EmployeeInput = Omit<Employee, "id" | "role" | "status" | "total_hours_worked" >

type ShiftInput = Omit<Shift, "id" | "currently_assigned_to" | "created_at">



const AddElement = ({viewState, setViewState}: Props) => {

  const {currentPage} = usePageStore()
  const {setConfirmation, setConfirmationObject} = useModalStore()


  const inputEmployeesValue: EmployeeInput = {
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    email: "",
    hourly_rate: 0,
    firebase_id: ""
  }

  const inputShiftsValue: ShiftInput = {
    start_time: "",
    end_time: "",
    location: "",
  }

  console.log(currentPage)



  const [pageValue, setPageValue] = useState<EmployeeInput | ShiftInput | null>(
    currentPage === "Employees" ? 
    inputEmployeesValue :
    inputShiftsValue
  )

  useEffect(()=>{
    setPageValue(
      currentPage === "Employees" ? 
      inputEmployeesValue :
      inputShiftsValue
    )
  }, [currentPage])

  if(pageValue === null) return

  function renderInputs(){
      if(pageValue !== null){
        const inputsToRender = typedKeys(pageValue).map( key =>  
          <label
          key={key}
          className={`w-fit flex flex-col gap-2 relative`}
          >
            <input 
            className={`
              outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
              max-sm:w-75  
              `}
            type={
              key === "email" ? "email" :
              key === "hourly_rate" ? "number" :
              key === "duration" ? "number" :
              key === "start_time" ? "time" :
              key === "end_time" ? "time" 
              : "text"
            } 
            value={pageValue[key]}
            name={key}
            onChange={ e =>{

              const value = e.currentTarget.value
              setPageValue(prev => (
                prev ? 
                {...prev, [key]: value} :
                null
              ))
            }}
            required
            />
            <span className={`
               absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2 transition-[top] 
              peer-focus:top-0 peer-focus:text-[7px] ${pageValue[key] !== "" ? "top-0 text-[7px]" : "top-1/2 text-[10px]"}
            `}>
              {key}
            </span>
          </label>
        ) 
        return inputsToRender
      }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()    
    let message =  ""
    if (pageValue === null) return 

    if ("first_name" in pageValue){
      
      message = `${String(pageValue.first_name)} ${String(pageValue.last_name)} ${String(pageValue.middle_name)}\n ${String(pageValue.phone)}\n ${String(pageValue.email)} \n ${String(pageValue.hourly_rate)}`
    } else{

      message = `Location: ${String(pageValue.location)} \n 
      Duration: ${String(pageValue.duration)} \n
      Start Time: ${String(pageValue.start_time)} \n
      End Time: ${String(pageValue.end_time)} \n
      `

    }


    setConfirmation(true, message)

    if(currentPage === "Employees"){
      setConfirmationObject({
        ...pageValue,
        id: generateCustomID("EMP"),
        role: "staff",
        status: "inactive",
      })
    } else{

      const timeStamp = new Date().toISOString()

      setConfirmationObject({
        ...pageValue,
        id: generateCustomID("SHF"),
        created_at: timeStamp,
        currently_assigned_to: []
      })
    }


  }


  return (
    <div
    className={`
      h-[calc(100%-60px)] w-80 mt-[60px] bg-primary-comp-two shadow fixed right-0 top-0 p-4  ${viewState ? "translate-x-0" : "translate-x-80"} transition-set select-none
      max-sm:w-[calc(100%-44px)] ${viewState ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
    `}
    >
        <p className={`font-semibold text-xs`}>
            Add {
              currentPage === "Employees" ? 
              "Employee" : null
            }
        </p>
        <form 
        className={`w-full mt-10 flex flex-col items-center gap-4`}
        onSubmit={handleSubmit}
        >
          <div
          className={`max-h-96 overflow-scroll flex flex-col gap-3 py-1`}
          >
            {renderInputs()}
          </div>
          <div className="flex justify-end w-full pr-6 mt-8 gap-2 ">
            <button
            className={`
              text-[11px] py-1.5 px-3 bg-primary rounded text-secondary shadow cursor-pointer active:scale-90 select-none transition-set flex items-center gap-1
              
            `}
            onClick={()=>{
              setViewState(false)
              setPageValue(
                currentPage === "Employees" ? 
                inputEmployeesValue :
                inputShiftsValue
              )
            }}
            type="button"
            >
              <MdClose/>
              Close
            </button>
            <button
            className={`
              text-[11px] py-1.5 px-3 bg-accent-one rounded text-white cursor-pointer active:scale-90 select-none transition-set flex items-center gap-1 shadow
              
            `}
            onClick={()=>{}}
            >
              <MdAdd/>
              Add
            </button>
          </div>

        </form>


    </div>
  )
}

export default AddElement