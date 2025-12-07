import Dashboard from "../pages/Dashboard"
import StaffDashboard from "../pages/StaffDashboard"
import { useAuthStore } from "../store/auth-store"

const DashboardLayout = () => {

    const {userDetails} = useAuthStore()

    if (!userDetails) return

  return (
    <>
        {userDetails.role === "admin" ? <Dashboard/> : <StaffDashboard/>}
    </>
  )
}

export default DashboardLayout