import PageLink from "./PageLink"
import { MdAccessTime, MdAlarm, MdAttachMoney, MdDashboard, MdGroups, MdRadioButtonChecked } from "react-icons/md"

const SideBar = () => {
  return (
    <div className={`
        bg-primary-comp min-w-40 h-full border-[#cecece53] border overflow-hidden
            max-sm:min-w-10.5 max-sm:w-10.5
    `}>

        {/* COMPANY LOGO */}
        <div className={`flex-center font-semibold bg-green-50 h-25 max-sm:opacity-0`}>
            <span>
                comp.logo
            </span>
        </div>

        {/* LINKS CONTAINER*/}
        <div className={`mt-4 flex flex-col gap-2`}>

            {/* LINKS */}
            <div>
                <PageLink  name={"Dashboard"} path={"/"} Icon={MdDashboard}/>
            </div>

            <div>
                <PageLink  name={"Shifts"} path={"/shifts"} Icon={MdAccessTime}/>
            </div>

            <div>
                <PageLink  name={"Records"} path={"/shift-records"} Icon={MdRadioButtonChecked}/>
            </div>

            <div>
                <PageLink  name={"Employees"} path={"/employees"} Icon={MdGroups}/>
            </div>

            <div>
                <PageLink  name={"Overtime"} path={"/overtime"} Icon={MdAlarm}/>
            </div>

            <div>
                <PageLink  name={"Payroll"} path={"/payroll"} Icon={MdAttachMoney}/>
            </div>


        </div>
    </div>
  )
}

export default SideBar
