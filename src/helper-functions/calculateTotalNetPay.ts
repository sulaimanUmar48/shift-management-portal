import type { ShiftRecord } from "../types/entites-types"
import { dateRangeFilter } from "./dateRangeFilter"

export const calculateTotalNetPay = (data: ShiftRecord[], employeeID:string, startDate: string, endDate: string, hourlyRate: number) => 
{

    const dateFilteredData = dateRangeFilter(startDate, endDate, data)
    const employeeIDFilteredData = dateFilteredData.filter(obj => employeeID === obj.employee_id )

    console.log(employeeIDFilteredData)



    // Calculate Total Hours

    let totalHours = 0;
    for(let i = 0; i < employeeIDFilteredData.length; i++){
        const [startHour, startMin] = employeeIDFilteredData[i].start_time.split(":").map(Number);

        const [endHour, endMin] = employeeIDFilteredData[i].end_time.split(":").map(Number);

        const startTotal = startHour * 60 + startMin;
        const endTotal = endHour * 60 + endMin

        const timeDifference = (endTotal - startTotal) / 60 
        totalHours += timeDifference
    } 

    console.log(totalHours)

    // Calculate Gross Pay

    let grossPay = 0
    
    // for(let i = 0; i < employeeIDFilteredData.length; i++){
    //     const grossPayDaily = employeeIDFilteredData[i].duration * hourlyRate

    //     grossPay += grossPayDaily
    // }

    console.log(grossPay)



    // Calculate Overtime 

    let overtime = 0

    for(let i = 0; i < employeeIDFilteredData.length; i++){
        const overtimeDaily = employeeIDFilteredData[i].overtime_hours

        overtime += (overtimeDaily * hourlyRate)
    } 

    console.log(overtime)

    // Calculate Tardiness (Deductions)

    let tardinessDeduction = 0

    employeeIDFilteredData.forEach( shift => {
        const tardinessCount = shift.tardiness_count
        tardinessDeduction += (tardinessCount * hourlyRate)
    } )

    console.log(tardinessDeduction)


    // Calculate net Pay 

    const netPay = grossPay - tardinessDeduction

    return {totalHours, grossPay, overtime, tardinessDeduction, netPay}
    
}