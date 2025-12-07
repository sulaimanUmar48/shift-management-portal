import { collection } from "firebase/firestore"
import { db } from "./config"

export const employeesRef = collection(db, "Employees")
export const shiftsRef = collection(db, "Shifts")
export const overtimeRef = collection(db, "Overtime")
export const shiftsRecordRef = collection(db, "ShiftRecords")