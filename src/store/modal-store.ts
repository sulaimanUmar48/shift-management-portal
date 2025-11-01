import { create } from "zustand";


type ModalStore = {
    confirmationModal: boolean,
    confirmationMessage: string,
    successModal: boolean,
    successMessage: string,
    errorModal: boolean,
    errorMessage: string,
    setConfirmation: (state: boolean, message: string) => void
    setSuccess: (state: boolean, message: string) => void
    setError: (state: boolean, message: string) => void
}

export const useModalStore = create<ModalStore>((set) => ({
    confirmationModal: false,
    confirmationMessage: "",
    successModal: false,
    successMessage: "",
    errorModal: false,
    errorMessage: "",
    setConfirmation: (state, message) => set({
        confirmationModal: state,
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
    
}))