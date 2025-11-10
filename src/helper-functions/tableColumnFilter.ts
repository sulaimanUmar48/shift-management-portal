import type { FilterFn } from "@tanstack/react-table";


export const filterIncludesCaseInsensitive: FilterFn<any> = (row, columnID, value) => {
    const cellValue = String(row.getValue(columnID))
    return cellValue.toLowerCase().includes(String(value).toLowerCase())
}