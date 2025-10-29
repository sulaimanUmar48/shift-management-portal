import { useEffect } from "react"
import { usePageStore } from "../store/page-store"


const Employees = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()


    useEffect(()=>{
        setCurrentPage("Employees")
    },[])

  return (
    <div
    className="h-full max-h-full flex justify-center items-center"
    >
        <h1 className="text-3xl">This is the Employees</h1>
    </div>
  )
}

export default Employees