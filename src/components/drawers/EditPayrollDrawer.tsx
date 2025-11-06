import { MdAdd, MdClose, MdEdit } from "react-icons/md"
import { usePayrollStore } from "../../store/payroll-store"
import type { PayrollRecord } from "../../types/entites-types"
import { toast } from "react-toastify"

type Props = {
  viewState: boolean
  setViewState: (value: false) => void
}


const EditPayrollDrawer = ({viewState, setViewState}:Props) => {

    const {currentPayRoll, editCurrentPayroll} = usePayrollStore()
    
    if(currentPayRoll === null) return

    const readOnlyInputs = ["id", "employee_id", "employee_name", "total_shifts", "total_hours_worked", "gross_pay", "overtime_pay", "deductions", "net_pay", "generated_at" ]

  return (

    <div
    className={`
        h-[calc(100%-60px)] w-80 mt-[60px] bg-primary-comp-two shadow fixed right-0 top-0 p-4  ${viewState ? "translate-x-0" : "translate-x-80"} transition-set select-none
        max-sm:w-[calc(100%-44px)] ${viewState ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
    `}
    >
        <p className={`font-semibold text-xs flex gap-1 items-center text-accent-one `}> 
            Edit Payroll
            <MdEdit/>
        </p>
        <form
        className={`w-full mt-10 flex flex-col items-center gap-4`}
        >
            {/* Inputs */}
            <div
            className={`max-h-96 overflow-scroll flex flex-col gap-3 py-1`}
            >
                {Object.entries(currentPayRoll).map(([key]) => {

                    const payrollkey = key as keyof PayrollRecord

                    return(
                        <label
                        key={key}
                        className={`w-fit flex flex-col gap-2 relative`}
                        >

                        

                            {
                                payrollkey === "payment_status" ? 

                                <select 
                                name={payrollkey} 
                                value={currentPayRoll[payrollkey]}
                                onChange={(e) => editCurrentPayroll(payrollkey, e.currentTarget.value as PayrollRecord[typeof payrollkey])}
                                className={`
                                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                                max-sm:w-75
                                `}
                                >
                                    <option value="pending" >pending</option>
                                    <option value="paid">paid</option>
                                </select> :

                                <input 
                                type={ payrollkey.toLowerCase().includes("period") ? "date" : "text"} 
                                value={currentPayRoll[payrollkey]}
                                onChange={(e) => {

                                    if(key === "pay_period_end" && e.target.value <= currentPayRoll["pay_period_start"] ){
                                        toast.error("End Date cannot be less than nor equal to start Date")
                                        return
                                    }

                                    
                                    editCurrentPayroll(payrollkey, e.currentTarget.value as PayrollRecord[typeof payrollkey])
                                
                                }}
                                className={`
                                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                                max-sm:w-75 read-only:bg-secondary/10
                                `}
                                readOnly={readOnlyInputs.includes(key)}
                                />
                            }

                            <span className={`
                            absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2 transition-[top] 
                            peer-focus:top-0 peer-focus:text-[7px] ${currentPayRoll[payrollkey] !== "" ? "top-0 text-[7px]" : "top-1/2 text-[10px] rounded-2xl"}
                            `}>
                            {key}
                            </span>
                        </label>
                        )}
                    )
                }
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
                    <MdAdd/>
                    Submit
                </button>
            </div>
        </form>
    </div>

  )
}

export default EditPayrollDrawer