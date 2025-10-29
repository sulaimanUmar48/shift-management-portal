import { useEffect } from "react"
import { usePageStore } from "../store/page-store"


const Overtime = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()


    useEffect(()=>{
        setCurrentPage("Overtime")
    },[])

  return (
    <div
    className="h-full max-h-full flex justify-center items-center"
    >
        <h1 className="text-3xl">This is the Overtime</h1>
    </div>
  )
}

export default Overtime