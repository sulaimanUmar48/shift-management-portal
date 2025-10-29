import { useEffect } from "react"
import { usePageStore } from "../store/page-store"


const Dashboard = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()


    useEffect(()=>{
        setCurrentPage("Dashboard")
    },[])

  return (
    <div
    className="h-full max-h-full flex justify-center items-center"
    >
        <h1 className="text-3xl">This is the Dashboard</h1>
    </div>
  )
}

export default Dashboard