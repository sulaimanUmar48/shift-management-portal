import { useEffect } from "react"
import { usePageStore } from "../store/page-store"


const Shifts = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()


    useEffect(()=>{
        setCurrentPage("Shifts")
    },[])

  return (
    <div
    className="h-full max-h-full flex justify-center items-center"
    >
        <h1 className="text-3xl">This is the Shifts</h1>
    </div>
  )
}

export default Shifts