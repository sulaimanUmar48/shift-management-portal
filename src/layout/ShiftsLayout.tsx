import Shifts from "../pages/Shifts"
import StaffShifts from "../pages/StaffShifts"
import { useAuthStore } from "../store/auth-store"


const ShiftsLayout = () => {

    const {userDetails} = useAuthStore()

    if (!userDetails) return

  return (
    <>
        {userDetails.role === "admin" ? <Shifts/> : <StaffShifts/>}
    </>
  )
}

export default ShiftsLayout