import { MdCheck, MdClose,  MdQuestionMark } from "react-icons/md"
import { useModalStore } from "../../store/modal-store"
import { useEmployeesStore } from "../../store/employees-store"
import { usePageStore } from "../../store/page-store"
import type { Employee, Shift } from "../../types/entites-types"
import {PulseLoader} from "react-spinners"
import { useShiftStore } from "../../store/shifts-store"


const ConfirmationModal = () => {

    const {confirmationModal, setConfirmation, confirmationMessage, confirmationObject} = useModalStore()
    const {addEmployees, loading} = useEmployeesStore()
    const {addShifts} = useShiftStore()
    const {currentPage} = usePageStore()


  return (
    <div className={`
        w-[calc(100%-40px)] h-[calc(100%-60px)] left-40 fixed bg-secondary/40 top-15 flex-center
        ${!confirmationModal && "opacity-0 pointer-events-none"} transition-set
        max-sm:w-[calc(100%-40px)] max-sm:left-10
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
            <div
            className={`
                flex justify-end gap-2
                [&>button]:px-2 [&>button]:py-1 [&>button]:rounded [&>button]:flex [&>button]:gap-1 [&>button]:items-center [&>button]:active:scale-90 [&>button]:transition-set [&>button]:cursor-pointer
            `}
            >
                <button
                className={`bg-accent-one text-white`}
                onClick={ async () => {
                    try{
                        if(currentPage === "Employees"){
                            await addEmployees(confirmationObject as Employee)
                            setConfirmation(false, "")
                        } else{
                            await addShifts(confirmationObject as Shift)
                            setConfirmation(false, "")
                        }
                    }
                    catch(err: any){
                        console.log(err)
                        setConfirmation(false, "")
                    }
                }}
                >
                    
                    {loading ? <PulseLoader size={5} color={"#fff"}/> : <MdCheck/>}
                </button>
                <button
                className={`bg-primary-comp-two shadow `}
                onClick={()=>{setConfirmation(false, "")}}
                >
                    <MdClose/>
                    No
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal