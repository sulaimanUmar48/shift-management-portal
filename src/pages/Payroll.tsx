import { useEffect } from "react"
import { usePageStore } from "../store/page-store"


const Payroll = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()


    useEffect(()=>{
        setCurrentPage("Payroll")
    },[])

  return (
    <div
    className="h-full max-h-full flex justify-center items-center"
    >
        <h1 className="text-3xl">This is the Payroll</h1>
    </div>
  )
}

export default Payroll