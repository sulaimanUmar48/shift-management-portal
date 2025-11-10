export const dateRangeFilter = <T extends {date: string} >(startDate: string, endDate: string, data: T[]) : T[] => {

   
    if(!startDate && !endDate){
        return data
    }

    if(!startDate){
        startDate = String(new Date().toISOString())
    }

    if(!endDate){
        endDate = new Date().toISOString()
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
   

    return data.filter( obj => {
        const objDate = new Date(obj.date)
        return objDate >= start && objDate <= end
    } )

}