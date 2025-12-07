import { create } from "zustand";
import type { Employee } from "../types/entites-types";
import { createUserWithEmailAndPassword, type Unsubscribe } from "firebase/auth";
import {doc, onSnapshot, setDoc} from "firebase/firestore"
import { employeesRef } from "../firebase/collections";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { generateCustomID } from "../helper-functions/generateID";

type EmployeesStore = { 
    employees: Employee[] 
    loading: boolean
    employeesListener: () => Unsubscribe
    addEmployees: (value: Employee) => Promise<void>
    currentSelectedEmployee: Employee | null
    setSelectedEmployee: (value: Employee) => void
    editEmployeeInformation: <K extends keyof Employee>(key: K, value: Employee[K]) => void
}

export const useEmployeesStore = create<EmployeesStore>((set) => ({
    employees: [],
    loading: false,
    employeesListener: () => {
        const unSub = onSnapshot(employeesRef, (snapshot) => {
            const employees = snapshot.docs.map( employee => ({
                id: employee.id,
                ...employee.data()
            })) as Employee[]

            set({employees})
        })

        return unSub
    },
    addEmployees: async (employeeDetails) => {
        set({loading: true})
        try{
            const {user} = await createUserWithEmailAndPassword(auth, employeeDetails.email, `${employeeDetails.last_name.toLowerCase()}1234`)

            await setDoc(doc(employeesRef, user.uid), {
                ...employeeDetails,
                firebase_id: user.uid
            })
            toast.success("Successfully Added Employee to database")
        }
        catch(err: any){
            toast.error(err.message as string)
        }
        finally{
            set({loading: false})
        }
    },
    currentSelectedEmployee: null,
    setSelectedEmployee: (employee) => {
        set({currentSelectedEmployee: employee})
    },
    editEmployeeInformation: (key, value) => {
        set((prev) => ({
            currentSelectedEmployee: prev.currentSelectedEmployee ? {...prev.currentSelectedEmployee, [key]: value} : null
        }))
    }
}))