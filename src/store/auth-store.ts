import { create } from "zustand";
import { auth } from "../firebase/config";

import { type User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,  type Unsubscribe } from "firebase/auth";
import { toast } from "react-toastify";
import type { Employee } from "../types/entites-types";
import { doc, onSnapshot } from "firebase/firestore";
import { employeesRef } from "../firebase/collections";

type AuthStore = {
    user: User | null
    userDetails: Employee | null 
    loading: boolean,
    fetchUserLoading: boolean,
    asyncLoading: boolean 
    signInUser: (email: string, password: string) => Promise<void>
    signOutUser: () => Promise<void>
    createUser: (email: string, password: string) => Promise<void>
    initAuthListener: () => void
    setUserDetails: () => Unsubscribe | undefined
}


export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    userDetails: null,
    loading: true,
    fetchUserLoading: false,
    asyncLoading: false,
    signInUser: async (email, password) => {
        set({asyncLoading: true})
        try{
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            set({user})
            toast.success("Succesfully Logged In")
        }
        catch(err: any){

            if(err.message === "Firebase: Error (auth/invalid-credential).") {
                toast.error("Invalid Login credential")
            }
            
        } 
        finally{
            set({asyncLoading: false, loading: false})
        }
    },
    createUser: async (email, password) => {
        set({asyncLoading: true})
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch(err: any){
            toast.error(err.message as string)
        }
        finally{    
            set({asyncLoading: false})
        }
    },
    signOutUser: async () => {
        try{
            await signOut(auth)
            set({user: null})
            toast.success("You have Signed Out")
        }
        catch(err: any){
            toast.error(err.message as string)
        }
    },
    initAuthListener: () => {
        onAuthStateChanged(auth, (user) => {
            set({user, loading: false})
        })      
    },
    setUserDetails: () => {

        const user = get().user

        if (!user) return

        const unsub = onSnapshot(doc(employeesRef, user?.uid), 
            (snapshot) => {
                set({userDetails: snapshot.data() as Employee})
            }
        )

        return unsub
    }
}))