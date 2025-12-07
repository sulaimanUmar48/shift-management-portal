import { create } from "zustand";
import type { ShiftRecord } from "../types/entites-types";
import { getDocs, query, where } from "firebase/firestore";
import { shiftsRecordRef } from "../firebase/collections";
import { toast } from "react-toastify";


type ShiftRecordsStore = {
    loadingRecord: boolean
    userShiftRecords: ShiftRecord[] | null
    currentRecord: ShiftRecord | null
    setCurrentRecord: (record: ShiftRecord) => void
    fetchShiftRecords: (employee_id: string) => Promise<void>
}


export const useRecordStore = create<ShiftRecordsStore>((set) => ({
    currentRecord: null,
    userShiftRecords: null,
    loadingRecord: false,
    setCurrentRecord: (record) => set({
        currentRecord: record
    }),
    fetchShiftRecords: async (employee_id) => {
        set({loadingRecord: true})
        const today = new Date()
        today.setDate(today.getDate() - 1)

        const yesterday = today.toISOString().split("T")[0]

        try{
            const snapshot = await getDocs(query(shiftsRecordRef, where("date", ">", yesterday), where("employee_id","==", employee_id)))

            const userShiftRecords = snapshot.docs.map(doc => ({...doc.data() as ShiftRecord}))

            set({userShiftRecords})
        }
        catch(err: any){
            toast.error(err.message as string)
        }
        finally{
            set({loadingRecord: false})
        }
    }
}))