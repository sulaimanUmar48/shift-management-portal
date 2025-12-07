import { MdAdd, MdClose, MdEdit } from "react-icons/md"
import {toast} from "react-toastify"
import type { Shift } from "../../types/entites-types"
import { doc, setDoc } from "firebase/firestore"
import { useState, type FormEvent } from "react"
import { PulseLoader } from "react-spinners"
import { useShiftStore } from "../../store/shifts-store"
import { shiftsRef } from "../../firebase/collections"

type Props = {
  viewState: boolean
  setViewState: (value: false) => void
}

const EditShiftsDetailsDrawer = ({viewState, setViewState}: Props) => {

    const {currentSelectedShifts, editShiftValue} = useShiftStore()
    
    const [asyncCallLoadingState, setAsyncCallLoadingState] = useState(false) 

    const readOnlyFields = ["id", "created_at"]

    const updateShiftValues = async (e:FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(currentSelectedShifts === null) return null
        setAsyncCallLoadingState(true)

        try{
            await setDoc(doc(shiftsRef, currentSelectedShifts.id), {
                ...currentSelectedShifts
            })

            toast.success(`Shift ID: ${currentSelectedShifts.id} has successfully been updated`)
            setViewState(false)
        }
        catch(err: any){
             toast.error(err.message as string)
        }
        finally{
            setAsyncCallLoadingState(false)
        }
    }
    


    if (currentSelectedShifts === null) return null

  return (
    <div
    className={`
    h-[calc(100%-60px)] w-80 mt-[60px] bg-primary-comp-two shadow fixed right-0 top-0 p-4  ${viewState ? "translate-x-0" : "translate-x-80"} transition-set select-none
    max-sm:w-[calc(100%-44px)] ${viewState ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
    `}
    >
        <p className={`font-semibold text-xs flex gap-1 items-center text-accent-one `}> 
            Edit Shift Details
            <MdEdit/>
        </p>

        <form
        className={`w-full mt-10 flex flex-col items-center gap-4`}
        onSubmit={updateShiftValues}
        >

            <div
            className={`max-h-96 overflow-scroll flex flex-col gap-3 py-1`}
            >

                {Object.entries(currentSelectedShifts).map(([key]) => {

                    const shiftKey = key as keyof Shift

                    if(shiftKey === "currently_assigned_to") return null

                    return(
                        <label
                        key={key}
                        className={`w-fit flex flex-col gap-2 relative`}
                        >

                            <input 
                            type={
                                shiftKey === "start_time" ? "time" :
                                shiftKey === "end_time" ?
                                "time" :
                                "text"
                            } 
                            value={currentSelectedShifts[shiftKey] ?? ""}
                            className={`
                                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                                max-sm:w-75 read-only:bg-secondary/10
                            `}
                            onChange={ e => {

                                editShiftValue(shiftKey, e.currentTarget.value)

                            }}
                            readOnly={readOnlyFields.includes(key)}
                            />

                            <span className={`
                            absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2 transition-[top] 
                            peer-focus:top-0 peer-focus:text-[7px] ${currentSelectedShifts[shiftKey] !== "" ? "top-0 text-[7px]" : "top-1/2 text-[10px] rounded-2xl"}
                            `}>
                                {key}
                            </span>

                        </label>
                    ) 
                })}

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
                >
                    {
                        !asyncCallLoadingState ?
                        <>
                            <MdAdd/>
                            Submit
                        </> :
                        <PulseLoader
                        size={5} 
                        color={"#FFF"}
                        />
                    }
                </button>
            </div>


        </form>

    </div> 
  )
}

export default EditShiftsDetailsDrawer