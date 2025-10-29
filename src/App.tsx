import './tailwind.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"

// Layouts
import RootLayout from './layout/RootLayout'

// Components
import Dashboard from './pages/Dashboard'
import Shifts from './pages/Shifts'
import Employees from './pages/Employees'
import Overtime from './pages/Overtime'
import Payroll from './pages/Payroll'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Dashboard />}/>
        <Route path='shifts' element={<Shifts />}/>
        <Route path='employees' element={<Employees />}/>
        <Route path='overtime' element={<Overtime />}/>
        <Route path='payroll' element={<Payroll />}/>
      </Route>
    )
  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App
