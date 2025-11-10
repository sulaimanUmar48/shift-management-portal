import { create } from "zustand";
import type { ShiftRecord } from "../types/entites-types";


type ShiftRecordsStore = {
    currentRecord: ShiftRecord | null
    setCurrentRecord: (record: ShiftRecord) => void
}


export const useRecordStore = create<ShiftRecordsStore>((set) => ({
    currentRecord: null,
    setCurrentRecord: (record) => set({
        currentRecord: record
    })
}))