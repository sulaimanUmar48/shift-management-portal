import { MdAdd, MdClose } from "react-icons/md"
import { usePageStore } from "../../store/page-store"
import dat from "../../assets/dummy-data/Payroll.json"
import { usePayrollStore } from "../../store/payroll-store"
import { useEffect, useState } from "react"
import type { Payroll } from "../../types/entites-types"

type Props = {
  viewState: boolean
  setViewState: (value: false) => void
}

const InfomationDrawer = ({viewState, setViewState}: Props) => {

    const {currentPage} = usePageStore()
    const {currentPayRoll} = usePayrollStore()

    const payrollFilter = ["pay", "bonus", "deduct"]  

    const [pageData, setPageData] = useState<Payroll | null>(null) 

    useEffect(()=>{

        if(currentPage === "Payroll"){
            setPageData(currentPayRoll)
        }

    },[currentPayRoll])

    if(pageData === null) return

  return (
    <div
    className={`
      h-[calc(100%-60px)] w-80 mt-[60px] bg-primary-comp-two shadow fixed right-0 top-0 p-4  ${viewState ? "translate-x-0" : "translate-x-80"} transition-set select-none
      max-sm:w-[calc(100%-44px)] ${viewState ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
    `}
    >
        <p className={`font-semibold text-xs`}>
            {currentPage === "Payroll" ? "View Payroll Details" : ""}
        </p>

        <div 
        className={`text-[12px] mt-6 space-y-2`}
        >
            {Object.entries(pageData).map(([key, value]) => (
                <div 
                key={key}
                className={``}
                >
                    <span className={`font-bold capitalize`}>
                        {key}:&nbsp;&nbsp;
                    </span>
                    <span>
                        {
                            typeof(value)  === "number" &&  payrollFilter.some(word => key.toLowerCase().includes(word)) && "$"
                        }
                        {value}
                    </span>
                </div>
            ))}
        </div>

        <div className="flex justify-end w-full pr-6 mt-8 gap-2">
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
        </div>
    </div>
  )
}

export default InfomationDrawer