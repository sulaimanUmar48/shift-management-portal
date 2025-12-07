import { MdCheck, MdClose, MdQuestionMark } from "react-icons/md"
import { useModalStore } from "../../store/modal-store"
import { PulseLoader } from "react-spinners"
import { useState } from "react"
import { doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { employeesRef, shiftsRecordRef, shiftsRef } from "../../firebase/collections"
import { toast } from "react-toastify"
import type { Shift, ShiftRecord } from "../../types/entites-types"
import { generateCustomID } from "../../helper-functions/generateID"
import { useEmployeesStore } from "../../store/employees-store"

const ConfirmationModalTwo = ({employeeID} : {employeeID: string}) => {

    const {confirmationModalTwo, setConfirmationTwo, confirmationMessage, confirmationObject} = useModalStore()
    const {employees} =  useEmployeesStore()
    

    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState("")

  return (
    <div className={`
        absolute w-full h-full bg-secondary/40 left-0 top-0 flex-center
        ${!confirmationModalTwo && "opacity-0 pointer-events-none"} transition-set
    `}> 
        <div className={`w-[300px] h-fit bg-primary shadow rounded-lg p-4 text-[10px] flex flex-col gap-6`}>
            <p className={`text-sm font-semibold mb-2 flex items-center`}>
                Confirm Details
                <MdQuestionMark size={20} className={`text-accent-one/80`} />
            </p>
            <p
            className={`leading-4 whitespace-pre-line`}
            >
                {confirmationMessage}
            </p>
            <label
            className={`space-x-2`}
            >
                <span>Date</span>
                <input 
                type="date"
                value={date}
                onChange={(e)=>{

                    const today = new Date()
                    if( today > new Date(e.target.value)){
                        toast.error("Cannot select dates before today")
                        return
                    }

                    setDate(e.currentTarget.value) 

                }}
                />
            </label>
            <div
            className={`
                flex justify-end gap-2
                [&>button]:px-2 [&>button]:py-1 [&>button]:rounded [&>button]:flex [&>button]:gap-1 [&>button]:items-center [&>button]:active:scale-90 [&>button]:transition-set [&>button]:cursor-pointer
            `}
            >
                <button
                className={`bg-accent-one text-white`}
                onClick={ async () => {

                    if(date === ""){
                        toast.error("Select Date")
                        return
                    }

                    setLoading(true)

                    const shift = confirmationObject as Shift
                    const id = generateCustomID("SHR")


                    const employee_ID = employees.filter(emp => emp.firebase_id === employeeID)[0].id 
                    

                    const shiftRecord: ShiftRecord = {
                        id,
                        shift_id: shift.id,
                        employee_id: employee_ID, 
                        start_time: shift.start_time,
                        end_time: shift.end_time,
                        location: shift.location,
                        date,
                        tardiness_count: 0,
                        overtime_hours: 0,
                        is_paid: false,
                        clock_in_time: "",
                        clock_out_time: "",
                        status: "pending"
                    }

                    const today = new Date()
                    today.setDate(today.getDate() - 1)
                    
                    const yesterday = today.toISOString().split("T")[0]

                    try{

                        const snapshot = await getDocs(query(shiftsRecordRef, where("employee_id", "==", `${employee_ID}`), where("date", ">" , yesterday)))

                        const userShiftRecord: ShiftRecord[] = snapshot.docs.map( doc => ({
                            ...doc.data() as ShiftRecord
                        }))


                        for (const userRecord of userShiftRecord) {
                            if(userRecord.date === date){
                                toast.error("Shift has already been assigned on this Day")

                                return;
                            }
                            
                        }
                    
                        await setDoc(doc(shiftsRef, confirmationObject.id), {
                            ...confirmationObject
                        })

                        await setDoc(doc(employeesRef, employeeID), {
                            status: "active"
                        }, {merge: true})
                        toast.success("Employee Assigned Shift")

                        await setDoc(doc(shiftsRecordRef, id), {
                            ...shiftRecord
                        } )
                    }
                    catch(err: any){
                        console.log(err)
                        toast.error(err.message as string)
                    }
                    finally{
                        setConfirmationTwo(false, "")
                        setLoading(false)
                        setDate("")
                    }
                }}
                >
                    
                    {loading ? <PulseLoader size={5} color={"#fff"}/> : <MdCheck/>}
                </button>
                <button
                className={`bg-primary-comp-two shadow `}
                onClick={()=>{setConfirmationTwo(false, ""); setDate("")}}
                >
                    <MdClose/>
                    No
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModalTwo