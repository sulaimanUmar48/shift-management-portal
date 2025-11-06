import { MdAddCircle } from "react-icons/md";
import { usePageStore } from "../../store/page-store";


type Props = {
    setAddElementViewState: (value: boolean) => void
}


const AddButton = ({setAddElementViewState}: Props) => {

  const {currentPage} = usePageStore()

  return (
    <div className={`max-sm:absolute right-0`}>
        <button
        onClick={()=>{setAddElementViewState(true)}}
        className={`
            text-[9px] py-2 px-2 bg-accent-one rounded text-white flex items-center gap-1 cursor-pointer transition-set active:scale-95 font-semibold transition-set hover:bg-accent-one/80
            max-sm:text-[8px]
        `}
        >
            <MdAddCircle />
            
            {currentPage === "Payroll" ? "Generate Payroll" : `Add ${currentPage.slice(0, currentPage.length -1 )}`}
        </button>
    </div>
  )
}

export default AddButton