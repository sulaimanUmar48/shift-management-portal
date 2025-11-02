import { useEffect, useState } from "react"
import { usePageStore } from "../store/page-store"
import SearchInput from "../components/search-input/SearchInput"


const Payroll = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()

    const [searchInput, setSearchInput] = useState("")


    useEffect(()=>{
        setCurrentPage("Payroll")
    },[])

  return (
    <div
    className={`
      h-full max-h-full p-4 flex flex-col gap-4 overflow-y-scroll pb-4 relative 
    `}
    >
      
    </div>
  )
}

export default Payroll