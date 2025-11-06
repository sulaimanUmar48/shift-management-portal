import { Outlet } from "react-router-dom"
import SideBar from "../components/sidebar/SideBar"
import Header from "../components/header/Header"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const RootLayout = () => {
  return (
    <div className={`bg-primary h-dvh w-dvw max-h-dvh max-w-dvw text-primary-text`}>
        <main className={`flex h-full max-h-full`}>
            <SideBar />
            <div className={`
              h-full max-h-full w-[calc(100%-160px)] max-w-[calc(100%-160px)]
              max-sm:w-[calc(100%-42px)] max-sm:max-w-[calc(100%-42px)]
            `}>
                <Header/>
                <div 
                className={`h-[calc(100%-60px)] max-h-[calc(100%-60px)]]`}>
                    <Outlet />
                </div>
            </div>
        </main>
        <ToastContainer position="top-right" autoClose={4000} pauseOnHover/>
    </div>
  )
}

export default RootLayout