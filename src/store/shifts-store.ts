import { create } from "zustand"
import type { Shift } from "../types/entites-types"
import type { Unsubscribe } from "firebase/auth"
import { deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
import { shiftsRef } from "../firebase/collections"
import { toast } from "react-toastify"


type ShiftStore = {
    shifts: Shift[],
    asyncLoading: boolean,
    shiftsListener: () => Unsubscribe
    addShifts: (value: Shift) => Promise<void>
    deleteShift: (value: string) => Promise<void>
    currentSelectedShifts: Shift | null
    setSelectedShift: (value: Shift) => void
    editShiftValue: <K extends keyof Shift>(key: K, value: Shift[K]) => void
}


export const useShiftStore = create<ShiftStore>((set) => ({
    shifts: [],
    asyncLoading: false,
    shiftsListener: () => {
        const unsub = onSnapshot(shiftsRef, (snapshot) => {
            const shifts = snapshot.docs.map( shift => ({
                id: shift.id,
                ...shift.data()
            })) as Shift[]

            set({shifts})
        })

        return unsub
    },
    addShifts: async (shiftDetails) => {
        set({asyncLoading:  true})
        try{
            await setDoc(doc(shiftsRef, shiftDetails.id), {
                ...shiftDetails
            })
            toast.success("Shift Successfully Created")
        }
        catch(err: any){
            toast.error(err.message as string)
        }
        finally{
            set({asyncLoading: false})
        }
    },
    deleteShift: async (id) => {
        try{
            await deleteDoc(doc(shiftsRef, id))
            toast.success("Shift successfully deleted")
        }
        catch(err: any){
            toast.error(err.message as string)
        }
    },
    currentSelectedShifts: null,
    setSelectedShift: (shift) => {
        set({currentSelectedShifts: shift})
    },
    editShiftValue: (key, value) => {
        set( prev => ({
            currentSelectedShifts: prev.currentSelectedShifts ? {
                ...prev.currentSelectedShifts, [key]: value
            } :
            null
        }) )
    }
}))