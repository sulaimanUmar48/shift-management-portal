export type Employee = {
    id: string
    first_name: string
    middle_name: string
    last_name: string
    phone: string
    email: string
    role: string
    status: "active" | "inactive" | "on_leave"
    hourly_rate: number
}


export type Shift = {
    id: string
    duration: number
    start_time: string
    end_time: string
    location: string
    currently_assigned_to: string[]
    created_at: string
}

export type ShiftRecord = {
    id: string
    string_id: string
    employee_id: string
    date_id: string
    start_time: string
    end_time: string
    duration: number
    tardiness_count: number
    overtime_hours: number
    is_paid: boolean    
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

export type PayrollRecord = {
    id: string
    employee_id: string
    employee_name: string
    pay_period_start: string
    pay_period_end: string
    total_shifts: number
    total_hours_worked: number
    gross_pay: number
    overtime_pay: number
    deductions: number
    bonuses: number
    net_pay: number
    payment_status: "pending" | "paid"
    generated_at: string
}