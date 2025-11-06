import { create } from "zustand";
import type { Payroll } from "../types/entites-types";


type PayrollStore = {
    currentPayRoll: Payroll | null
    setCurrentPayroll: (value: Payroll) => void 
    editCurrentPayroll: <K extends keyof Payroll>(key: K, value: Payroll[K]) =>     void
}


export const usePayrollStore = create<PayrollStore>((set) => ({
    currentPayRoll: null,
    setCurrentPayroll: (payroll) => {set({currentPayRoll: payroll})},
    editCurrentPayroll: (key, value) => set((prev) => ({
        currentPayRoll: prev.currentPayRoll ? {...prev.currentPayRoll, [key]:value} : null
    }))
}))