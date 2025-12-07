import { create } from "zustand";
import type { Overtime, Shift } from "../types/entites-types";
import type { Unsubscribe } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { overtimeRef } from "../firebase/collections";
import { toast } from "react-toastify";

type OvertimeStore = {
    overtime: Overtime[]
    loading: boolean
    addOvertime: (value: Overtime) => Promise<void>
    overtimeListener: () => Unsubscribe
    currentSelectedShift: Shift | null
    setCurrentSelectedShift: (value: Shift) => void
}


export const useOvertimeStore = create<OvertimeStore>((set) => ({
    overtime: [],
    currentSelectedShift: null,
    loading: false,
    addOvertime: async (overtime) => {

        set({loading: true})

        try{
            await setDoc(doc(overtimeRef, overtime.id), {
                ...overtime
            })
        }
        catch(err: any){
            toast.error(err.message as string)
        }
        finally{
            set({loading: false})
        }
    },
    overtimeListener: () => {

        const unsub = onSnapshot(overtimeRef, 
            (snapshot) => {
                const overtime = snapshot.docs.map(doc => ({
                    ...doc.data() as Overtime
                }))

                set({overtime})
            }
        )

        return unsub
    },
    setCurrentSelectedShift: (shift) => {
        set({currentSelectedShift: shift})
    }
}))