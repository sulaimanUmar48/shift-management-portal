import { ClockLoader } from "react-spinners"
import { BarChart } from "../components/charts/BarChart"
import {  LuClock3, LuClock8 } from "react-icons/lu"
import NotificationTwo from "../components/notification/NotificationTwo"
import Table from "../components/table/Table"
import {  createColumnHelper } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { useAuthStore } from "../store/auth-store"
import OvertimeRequestDrawer from "../components/drawers/OvertimeRequestDrawer"
import type { ShiftRecord } from "../types/entites-types"
import { useRecordStore } from "../store/shift-records-store"


const StaffDashboard = () => {

  const {userDetails} = useAuthStore()
  const {fetchShiftRecords, userShiftRecords, loadingRecord} = useRecordStore()

  const [drawerViewState, setDrawerViewState] = useState(false)

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date().toISOString().split("T")[0]
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const testtomorrow = tomorrow.toISOString().split("T")[0]

  if (!userDetails) return


  useEffect(()=>{
    fetchShiftRecords(userDetails.id)
  }, [])

  const columnHelper = createColumnHelper<ShiftRecord>()


  const columnDef = [
    columnHelper.accessor("date", {
      header: "Date",
      cell: ({row}) => {
        
        const date = new Date(row.original.date)
        
        return(
          <span>
            {months[date.getMonth()]} {date.getDate()}
          </span>
        )
      }
    }),
    columnHelper.accessor((row) => `${row.start_time} - ${row.end_time}`, {
      id: "Time",
      header: "Time",
      // cell: ({row}) => {

      //   let time;

      //   if(Number(row.original.start_time.split(":")[0]) < 12){
      //     time = `${row.original.start_time} am`
      //   } else{
      //     time = `${Number(row.original.start_time.split(":")[0]) - 12}:${row.original.start_time.split(":")[1]} pm`
      //   }

      //   return(
      //     <p>
      //       {time}
      //     </p>
      //   )
      // }
    }),
    columnHelper.accessor("location", {
      header: "Location"
    })
  ]


  const sortedData = useMemo(() =>

      userShiftRecords && !loadingRecord ? userShiftRecords.sort((a, b) => a.date.localeCompare(b.date)) : []

    , [userShiftRecords])

    console.log(sortedData)

  const todayShift = userShiftRecords ? userShiftRecords.filter( rec => rec.date === testtomorrow) : []


  return (
    <div
    className={`
      h-full max-h-full p-2 flex gap-2 overflow-y-scroll  
    `}
    >

        <div    
        className={`rounded p-6 text-lg bg-primary-comp-two shadow h-full flex-1 min-w-110`}
        >
            <div>
              <p
              className={`
              font-semibold text-xl  
              `}
              >
                Welcome Back, {userDetails?.first_name}
              </p>

              <p
              className={`text-sm mt-1 opacity-90 font-light`}
              >
                Here's an overview of your dashboard.
              </p>

              <div
              className={`flex justify-between items-center font-semibold border-b pb-8 border-black/15`}
              >
                <div
                className={`mt-4 flex gap-4`}
                >  
                  <figure
                  className={`
                    bg-black h-15 w-15 rounded-full overflow-hidden
                  `}
                  >
                    <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="User Profile Image"
                    />
                  </figure>

                  <div
                  className={`flex flex-col justify-center`}
                  >
                    <p>{userDetails?.first_name} {userDetails?.last_name}</p>
                    <p
                    className={`text-xs opacity-80`}
                    >
                      {userDetails?.role }
                    </p>
                  </div>  
                </div>
                
                <p
                className={`text-2xl text-accent-one`}
                >
                  32h 40m
                </p>

              </div>

              <div
              className={`py-4`}
              >
                <p
                className={`text-lg font-semibold`}
                >
                  Attendance
                </p>
                <div
                className={`h-60`}
                >
                  <BarChart/>
                </div>
              </div>

            </div>
        </div>

        <div
        className={`
          rounded p-3 text-lg bg-primary-comp-two shadow h-full flex-1 
        `}
        >
          <div
          className={`
          w-140 shadow h-30 rounded p-6 
          `}
          >
            <p
            className={`
              text-sm font-semibold mb-3 border-b pb-3 border-secondary/10
            `}
            >
              Current Shift :  
              <span
              className={`ml-1 text-sm text-accent-one `}
              >
                {
                  todayShift.length === 1 ? todayShift[0].location : "No Shift assigned for today"
                }
              </span>
            </p>
            <div
            className={`flex justify-between`}
            >
              <div
              className={`
              flex
              `}
              >
                <div
                className={`
                flex items-center gap-1 text-[12px] w-34 border-r border-secondary/20 mr-3
                `}
                >
                  <LuClock3 />
                  Clock-In :
                  <span
                  className={`ml-1 text-[11px] font-normal`}
                  >
                    {
                      todayShift.length === 1 ? todayShift[0].clock_in_time : "--/--"
                    }
                  </span>
                </div>
                <div
                className={`
                flex items-center gap-1 text-[12px]
                `}
                >
                  <LuClock8/>
                  Clock-Out :
                  <span
                  className={`ml-1 text-[11px] font-normal`}
                  >
                    {
                      todayShift.length === 1 ? todayShift[0].clock_out_time :
                      todayShift.length === 1 && todayShift[0].clock_in_time != "" ? <ClockLoader
                      size={13}
                      />
                      : "--/--" 
                    }
                  </span>
                  
                </div>
              </div>
              <div
              className={`space-x-1`}
              >
                <button
                className={`
                  text-[10px] w-18 bg-accent-one h-7 rounded text-white active:scale-95 cursor-pointer transition duration-200 ease-out 
                `}
                >
                  Clock-IN
                </button>
                <button
                className={`
                  text-[10px] w-18 bg-accent-one/80  h-7 rounded text-white active:scale-95 cursor-pointer transition duration-200 ease-out 
                `}
                onClick={()=>{
                  setDrawerViewState(true)
                }}
                >
                  Overtime   
                </button>
              </div>
            </div>      
          </div>

          <div
          className={`h-70 mt-4 flex gap-3`}
          >
            <div
            className={`shadow h-full max-h-full flex-1 rounded p-4 max-w-80 min-w-80`}
            >
              <p
              className={`
                text-sm font-semibold border-b pb-3 border-secondary/14
              `}
              >
                Your Shifts
              </p>
              <div
              className="max-w-full max-h-54 w-full overflow-scroll"
              >
                <div>
                  <Table 
                  Data={userShiftRecords ? userShiftRecords : []} 
                  columnDef={columnDef} 
                  inputColumnFilterID=""
                  inputColumnFilterValue=""
                  allowCheckBox={false}
                  />
                </div>
              </div>
            </div>
            
            <div
            className={`shadow h-full max-h-full flex-1 rounded p-4`}
            >
              <p
              className={`
                text-sm font-semibold mb-3
              `}
              >
                Notification
              </p>
              <div
              className={`
              h-55 max-h-55 overflow-y-scroll rounded space-y-2
              `}
              >
                <NotificationTwo/>
                <NotificationTwo/>
                <NotificationTwo/>
                <NotificationTwo/>
                <NotificationTwo/>
              </div>
            </div>
          </div>

        </div>
        <OvertimeRequestDrawer viewState={drawerViewState} setViewState={setDrawerViewState}/>
    </div>
  )
}

export default StaffDashboard