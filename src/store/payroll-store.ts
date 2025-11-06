import { create } from "zustand";
import type { PayrollRecord } from "../types/entites-types";


type PayrollStore = {
    currentPayRoll: PayrollRecord | null
    setCurrentPayroll: (value: PayrollRecord) => void 
    editCurrentPayroll: <K extends keyof PayrollRecord>(key: K, value: PayrollRecord[K]) =>     void
}


export const usePayrollStore = create<PayrollStore>((set) => ({
    currentPayRoll: null,
    setCurrentPayroll: (payroll) => {set({currentPayRoll: payroll})},
    editCurrentPayroll: (key, value) => set((prev) => ({
        currentPayRoll: prev.currentPayRoll ? {...prev.currentPayRoll, [key]:value} : null
    }))
}))