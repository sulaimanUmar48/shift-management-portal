import { useState } from "react"
import { MdAddAlarm, MdClose, MdMoreTime } from "react-icons/md"


type Props = {
    viewState: boolean
    setViewState: (value: boolean) => void
}


const OvertimeRequestDrawer = ({viewState, setViewState}: Props) => {


    const [hours, setHours] = useState(0)
    const [reason, setReason] = useState("")


  return (
    <div
    className={`
        h-[calc(100%-60px)] w-80 mt-[60px] bg-primary-comp-two shadow fixed right-0 top-0 p-4  ${viewState ? "translate-x-0" : "translate-x-80"} transition-set select-none
        max-sm:w-[calc(100%-44px)] ${viewState ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
    `}
    >
        <p className={`font-semibold text-xs flex gap-1 items-center text-accent-one `}> 
            Request Overtime
            <MdMoreTime/>
        </p>


        <form 
        className={`w-full mt-10 flex flex-col items-center gap-4`}
        >
            <label
                className={`w-fit flex flex-col gap-2 relative`}
            >

                <input 
                type="number" 
                value={hours}
                onChange={(e)=>{
                    setHours(Number(e.currentTarget.value))
                }}
                className={`
                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                max-sm:w-75  
                `}
                />
                <span className={`
                absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2   transition-[top] 
                peer-focus:top-0 peer-focus:text-[7px] ${hours !== 0 ? "top-0 text-[7px]" :     "top-1/2 text-[10px]"}
                `}>
                    hours
                </span>
            </label>

            <label
                className={`w-fit flex flex-col gap-2 relative`}
            >

                <input 
                type="text" 
                value={reason}
                onChange={(e)=>{
                    setReason(e.currentTarget.value)
                }}
                className={`
                outline-0 border border-set w-60 rounded text-[12px] px-4 py-2 mx-auto text-xs peer 
                max-sm:w-75  
                `}
                />
                <span className={`
                absolute -translate-y-1/2 left-2  pointer-events-none bg-primary-comp-two px-2   transition-[top] 
                peer-focus:top-0 peer-focus:text-[7px] ${reason !== "" ? "top-0 text-[7px]" : "top-1/2 text-[10px]"}
                `}>
                    reason
                </span>
            </label>


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
                    <MdAddAlarm/>
                    Submit
                </button>
            </div>
            
        </form>

    </div>
  )
}

export default OvertimeRequestDrawer