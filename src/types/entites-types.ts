export type Employee = {
    id: string
    first_name: string
    last_name: string
    phone: string
    role: string
    status: string
    total_hours_worked: number
}


export type Shift = {
    id: string
    duration: number
    start_time: string
    end_time: string
    location: string
}


export type Overtime = {
    id: string
    employee_id: string
    shift_id: string
    shift_name: string
    hours: number
    reason: string
    requested_at: string
    status: "pending" | "approved" | "rejected"
    approved_at: null | string
    rejected_at: null | string
    overseer_id: null | string
}

export type LateCheckIn = {
    id: string
    user_id: string
    hours_missed: number 
}


export type Absence = {
    id: string
    user_id: string
    date: string
    reason: null | string
}


export type Notification = {
    id: string
    title: string
    content: string
    timestamp: string
}