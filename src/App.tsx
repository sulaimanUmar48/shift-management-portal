import './tailwind.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"

// Layouts
import RootLayout from './layout/RootLayout'

// Components
import Employees from './pages/Employees'
import Overtimes from './pages/Overtimes'
import Payroll from './pages/Payroll'
import SignIn from './pages/SignIn'
import Record from './pages/Record'
import DashboardLayout from './layout/DashboardLayout'
import ShiftsLayout from './layout/ShiftsLayout'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<DashboardLayout />} />
        <Route path='shifts' element={<ShiftsLayout />}/>
        <Route path='shift-records' element={<Record />}/>
        <Route path='employees' element={<Employees />}/>
        <Route path='overtime' element={<Overtimes />}/>
        <Route path='payroll' element={<Payroll />}/>
        <Route path='sign-in' element={<SignIn/>}/>
      </Route>
    )
  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App
