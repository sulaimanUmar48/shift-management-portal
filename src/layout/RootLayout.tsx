import { Outlet } from "react-router-dom"
import SideBar from "../components/sidebar/SideBar"
import Header from "../components/header/Header"

const RootLayout = () => {
  return (
    <div className="bg-primary h-dvh w-dvw max-h-dvh max-w-dvw text-primary-text">
        <main className="flex h-full max-h-full">
            <SideBar />
            <div className="h-full max-h-full flex-1">
                <Header/>
                <div 
                className="h-[calc(100%-60px)] max-h-[calc(100%-60px)]]">
                    <Outlet />
                </div>
            </div>
        </main>
    </div>
  )
}

export default RootLayout