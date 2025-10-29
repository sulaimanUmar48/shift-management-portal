import {create} from "zustand"

type PageStore = {
    currentPage: string
    setCurrentPage: (value: string) => void
}

export const usePageStore = create<PageStore>((set) => ({
    currentPage: "Dashboard",
    setCurrentPage: (page) => set({currentPage: page})
}))