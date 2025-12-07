import { useEffect, useState } from "react"
import { MdClose,  MdCreateNewFolder, MdSearch, MdSettings } from "react-icons/md"
import { toast } from "react-toastify"
import dat from "../../assets/dummy-data/employees.json"
import dat_2 from "../../assets/dummy-data/shift_records_40_randomized.json"
import type { Employee, ShiftRecord } from "../../types/entites-types"
import { calculateTotalNetPay } from "../../helper-functions/calculateTotalNetPay"

type Props = {
  viewState: boolean
  setViewState: (value: boolean) => void
}


const CreatePayrollDrawer = ({viewState, setViewState}:Props) => {

    
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [bonus, setBonus] = useState(0)
    const [name, setName] = useState("")
    const [employee_ID, setEmployee_ID] = useState("")

    const [hourlyPay, setHourlyPay] = useState(0)
    
    const [totalHours, setTotalHours] = useState(0)
    const [grossPay, setGrossPay] = useState(0)
    const [overtimePay, setOvertimePay] = useState(0)
    const [tardinessDeduction, setTardinessDediction] = useState(0)
    const [netPay, setNetPay] = useState(0)

    const [filteredEmployees, setFilteredEmployees] = useState<Employee[] | null>(null)

    const [searchEmployeesValue, setSearchEmployeesValue] = useState("")
    const [employeeListDropDownState, setEmployeeListDropDownState] = useState(false)



    useEffect(()=>{
        filterEmployees(dat as Employee[])
    },[dat, searchEmployeesValue])

    useEffect(()=>{
        if(searchEmployeesValue !== ""){
            setEmployeeListDropDownState(true)
        } else{
            setEmployeeListDropDownState(false)
        }
    },[searchEmployeesValue])



    useEffect(()=>{
        if(!employee_ID || (!startDate && !endDate)){
            return
        }

        if(startDate && endDate){
            if(new Date(startDate) > new Date(endDate)){
                toast.error("Error! End Date Cannot be less than start Date")

                return
            }
        }

        const {totalHours, grossPay, overtime, tardinessDeduction, netPay} = calculateTotalNetPay(dat_2 as ShiftRecord[], employee_ID, startDate, endDate, hourlyPay)
        setTotalHours(totalHours)
        setGrossPay(grossPay)
        setOvertimePay(overtime)
        setTardinessDediction(tardinessDeduction)
        setNetPay(netPay)

    },[employee_ID, startDate, endDate, bonus, hourlyPay])
   

    function filterEmployees(employees: Employee[]){
        const employeesFilter = employees.filter( employee => 
            `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchEmployeesValue.toLowerCase())
        )

        setFilteredEmployees(employeesFilter)
    }

    if(filteredEmployees === null) return


  return (
    <div
    className={`
        h-[calc(100%-60px)] w-80 mt-[60px] bg-primary-comp-two shadow fixed right-0 top-0 p-4  ${viewState ? "translate-x-0" : "translate-x-80"} transition-set select-none
        max-sm:w-[calc(100%-44px)] ${viewState ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
    `}
    > 
        <p className={`font-semibold text-xs flex gap-1 items-center text-accent-one `}> 
            Generate Payroll
            <MdCreateNewFolder/>
        </p>

        <label className={`flex mt-5 relative w-60 mx-auto text-[10px] flex-col gap-1 z-1000`}>
            Search Employees
            <div className="relative">
                <input 
                value={searchEmployeesValue}
                onChange={(e)=>{setSearchEmployeesValue(e.currentTarget.value)}}
                type="text" 
                className={`
                    outline-0 border border-set w-60 rounded text-[10px] px-4 py-2 mx-auto text-xs peer pl-7 relative z-10000 bg-primary-comp-two 
                    max-sm:w-75  
                `}
                />
                <MdSearch 
                className={`absolute top-1/2 -translate-y-1/2 left-2 text-[15px] z-20000`}
                />
                {
                    !employeeListDropDownState ? null :
                    <div className={`bg-primary w-60 h-43.5 absolute top-[95%] rounded-b border border-secondary/10 p-1 max-h-45 overflow-scroll space-y-1`}>
                    
                        {filteredEmployees.map( employee => 
                        <button
                        key={employee.id}
                        className={`p-2 px-4 w-full flex justify-between text-[9px] cursor-pointer bg-primary-comp-two rounded active:scale-95 transition-set
                        hover:bg-accent-one hover:text-white    
                        `}
                        onClick={()=>{
                            setName(`${employee.first_name + ` ` + employee.last_name}`)
                            setSearchEmployeesValue(`${employee.first_name + ` ` + employee.last_name}`)
                            setEmployee_ID(employee.id)
                            setHourlyPay(employee.hourly_rate)
                            setTimeout(()=>{
                                setEmployeeListDropDownState(false)
                            },100)
                            
                        }}
                        >
                            <span>{employee.first_name} {employee.last_name}</span>
                            <span
                            className={`italic`}
                            >
                                {employee.id}
                            </span>
                        </button>)}
                
                    </div>
                }
            </div>
        </label>

        <form 
        className={`w-full mt-10 flex flex-col items-center gap-4`}

        >
            
            <label
                className={`w-fit flex flex-col gap-2 relative`}
            >
                <input 
                type="date" 
                value={startDate}
                onChange={(e)=>{
                
                    if(name === ""){
                        toast.error("Select Employee first")
                        return
                    }

                    setStartDate(e.currentTarget.value)
                }}
                className={`
                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                max-sm:w-75  
                `}
                />
                <span className={`
                absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2   transition-[top] pr-10
                peer-focus:top-0 peer-focus:text-[7px] ${startDate !== "" ? "top-0 text-[7px]" :     "top-1/2 text-[10px]"}
                `}>
                    start_date
                </span>
            </label>

            <label
                className={`w-fit flex flex-col gap-2 relative`}
            >
                <input 
                type="date" 
                value={endDate}
                onChange={(e)=>{

                    if(name === ""){
                        toast.error("Select Employee first")
                        return
                    }

                    if( e.target.value <= startDate ){
                        toast.error("End Date cannot be less than nor equal to start Date")
                        return
                    }
                    setEndDate(e.currentTarget.value)
                }}
                className={`
                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                max-sm:w-75  
                `}
                />
                <span className={`
                absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2   transition-[top] pr-10
                peer-focus:top-0 peer-focus:text-[7px] ${endDate !== "" ? "top-0 text-[7px]" :     "top-1/2 text-[10px]"}
                `}>
                    end_date
                </span>
            </label>
            
            <label
                className={`w-fit flex flex-col gap-2 relative`}
            >
                <input 
                type="number" 
                value={bonus}
                onChange={(e)=>{
                    if(name === ""){
                        toast.error("Select Employee first")
                        return
                    }
                    setBonus(Number(e.currentTarget.value))
                }}
                className={`
                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                max-sm:w-75  
                `}
                />
                <span className={`
                absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2   transition-[top] pr-10
                peer-focus:top-0 peer-focus:text-[7px] ${bonus !== 0 ? "top-0 text-[7px]" :     "top-1/2 text-[10px]"}
                `}>
                    $ bonus
                </span>
            </label>

            {/* Detailsss */}

            <div
            className={`text-[11px] w-60 space-y-2
            [&>div]:flex [&>div]:gap-1.5 
            [&_span]:font-semibold
                
            `}
            >
                {/* Name */}
                <div>
                    <span>
                        Employee Name: 
                    </span>
                    <p>
                        {name}
                    </p>
                </div>

                {/* Total Hours */}
                <div>
                    <span>
                        Total Hours: 
                    </span>
                    <p>
                        {totalHours}
                    </p>
                </div>
                
                {/* Gross Pay */}
                <div>
                    <span>
                        Gross Pay: 
                    </span>
                    <p>
                        ${grossPay}
                    </p>
                </div>


                {/* Overtime Pay */}
                <div>
                    <span>
                        Overtime Pay: 
                    </span>
                    <p>
                        ${overtimePay}
                    </p>
                </div>

                {/* Deduction */}
                <div>
                    <span>
                        Deduction: 
                    </span>
                    <p>
                        ${tardinessDeduction}
                    </p>
                </div>

                {/* Net Pay */}
                <div>
                    <span>
                        Net Pay: 
                    </span>
                    <p>
                        ${netPay + bonus}
                    </p>
                </div>


            </div>


            <div className="flex justify-end w-full pr-6 mt-8 gap-2 ">
                <button
                className={`
                    text-[11px] py-1.5 px-3 bg-primary rounded text-secondary shadow cursor-pointer active:scale-90 select-none transition-set flex items-center gap-1
                    
                `}
                onClick={()=>{setViewState(false)}}
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
                    <MdSettings/>
                    Generate
                </button>
                </div>

        </form>
    </div>
  )
}

export default CreatePayrollDrawer