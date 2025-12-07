import { create } from "zustand";


type ModalStore = {
    confirmationModal: boolean
    confirmationModalTwo: boolean
    confirmationMessage: string
    successModal: boolean
    successMessage: string
    errorModal: boolean
    errorMessage: string
    setConfirmation: (state: boolean, message: string) => void
    setConfirmationTwo: (state: boolean, message: string) => void
    setSuccess: (state: boolean, message: string) => void
    setError: (state: boolean, message: string) => void
    confirmationObject: any
    setConfirmationObject: (value: any) => void
}

export const useModalStore = create<ModalStore>((set) => ({
    confirmationModal: false,
    confirmationModalTwo: false,
    confirmationMessage: "",
    successModal: false,
    successMessage: "",
    errorModal: false,
    errorMessage: "",
    setConfirmation: (state, message) => set({
        confirmationModal: state,
        confirmationMessage: message
    }),
    setConfirmationTwo: (state, message) => set({
        confirmationModalTwo: state,
        confirmationMessage: message
    }),
    setSuccess: (state, message) => set({
        successModal: state,
        successMessage: message
    }),
    setError: (state, message) => set({
        errorModal: state,
        errorMessage: message
    }),
    
    confirmationObject: null,
    setConfirmationObject: (object) => set({
        confirmationObject: object
    })

}))