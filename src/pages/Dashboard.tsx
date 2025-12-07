import { useEffect } from "react"
import { usePageStore } from "../store/page-store"
import StatsCard from "../components/cards/StatsCard"
import { MdAccessTimeFilled, MdGroups, MdInsights, MdNotifications, MdSchedule } from "react-icons/md"
import Notification from "../components/notification/Notification"
import DoughnutChart from "../components/charts/DoughnutChart"
import LineChart from "../components/charts/LineChart"
import { useEmployeesStore } from "../store/employees-store"


const Dashboard = () => {

    // Store Values
    const {setCurrentPage} = usePageStore()
    const {employees, employeesListener} = useEmployeesStore()

    // functions to run at and only at initial render
    useEffect(()=>{
        setCurrentPage("Dashboard")
        const unSubList = employeesListener()

        return unSubList 
    },[])

  return (
    <div
    className={`
      h-full max-h-full p-4 flex flex-col gap-4 overflow-y-scroll pb-4 
    `}
    >
        {/* TOP CARDS FOR GENERAL STATISTICS */}
      <div 
      className={`
        h-fit flex gap-4 flex-wrap
      `}
      >

        <StatsCard title={"Total Employees"} count={employees.length} Icon={MdGroups} />
        <StatsCard title={"Shifts Assigned(Week)"} count={10} Icon={MdSchedule} />
        <StatsCard title={"Average Attendance"} count={15} Icon={MdInsights} />
        <StatsCard title={"Total Hours Worked"} count={20} Icon={MdAccessTimeFilled} />
        
      </div>

      <div
      className={`
        h-fit flex gap-4 flex-wrap
      `}
      >

        {/* ATTENDANCE SHEET */}
        <div
        className={`
          h-84 min-h-84 bg-primary-comp-two flex-1 rounded shadow  min-w-[300px]
        `}
        >
          <p className={`text-sm font-semibold p-5`}>
            Attendance Overview
          </p>
          
          <div className={`
            mt-4 flex justify-center gap-10
            max-sm:gap-6
            `}>

            {/* CHART  */}
            <div className={`flex flex-col items-center w-fit gap-3`}>
              <span
              className={`text-xs w-fit`}
              >
                Attendance Rate
              </span>
              <div className={`w-40 h-40 rounded-full`}>
                <DoughnutChart/>
              </div>
            </div>

            {/* COUNT */}
            <div className={`flex flex-col justify-center gap-5`}>


              {/* TARDINESS/LATENESS */}
              <div className="flex flex-col gap-2">
                <p
                className={`
                  max-sm:text-[10px]  
                `}
                >
                  Tardiness Count
                </p>
                <div 
                className={`w-12 h-12 bg-secondary/5 flex-center rounded-full`}>

                  <span
                  className={`text-xl font-semibold`}
                  >
                    12
                  </span>
                </div>
              </div>

              {/* ABSENCES(WEEKLY) */}
              <div className="flex flex-col gap-2">
                <p
                className={`
                  max-sm:text-[10px]  
                `}
                >
                  Abscences{`(weekly)`}
                </p>
                <div 
                className={`w-12 h-12 bg-secondary/5 flex-center rounded-full`}>

                  <span
                  className={`text-xl font-semibold`}
                  >
                    10
                  </span>
                </div>
              </div>
            </div>


          </div>

        </div>





        <div
        className={`
          h-84 min-h-84 flex-1 rounded flex gap-2 flex-wrap
        `}
        >
          {/* CHARTS */}
          <div className={`flex flex-col gap-2 flex-1 min-w-[200px]`}>

            {/* SHIFTS */}
            <div className={`h-40 min-h-40 flex-1 bg-primary-comp-two rounded-lg shadow`}>
                <LineChart />
            </div>



            {/* OVERTIME */}
            <div className={`h-40 min-h-40 flex-1 bg-primary-comp-two rounded-lg shadow`}>
              CHART
            </div>

          </div>

          {/* NOTIFICATION CONTAINER*/}
          <div className={`h-84 min-h-84 flex-1  rounded-lg shadow min-w-[200px] bg-secondary/80`}>
            <p 
            className={`text-secondary-text p-3 text-xs flex items-center gap-1`}>
              Notification
              <MdNotifications/>
            </p>
            {/* NOTIFICATIONS */}
            <div
            className={`w-[92%] mx-auto h-71.5 max-h-71.5 bg-secondary/30 rounded p-1 overflow-y-scroll flex flex-col gap-1`}
            >
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard