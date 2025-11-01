import {useReactTable, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, createColumnHelper} from "@tanstack/react-table"
import type {ColumnDef, PaginationState, RowSelectionState} from "@tanstack/react-table"
import { useEffect, useMemo, useState} from "react"
import { LuCheck } from "react-icons/lu"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

type Props<TData extends object> = {
    Data: TData[],
    columnDef: ColumnDef<TData, any>[]
    inputColumnFilterID: string
    inputColumnFilterValue: string
}

const Table = <TData extends object>({Data, columnDef, inputColumnFilterID, inputColumnFilterValue}:Props<TData>) => {

    const data = useMemo(()=> Data ?? [], [Data])

    const columnHelper = createColumnHelper<TData>(

    )
    const columns = useMemo(()=> {
        const checkColumn = [
            columnHelper.display({
            header: () => 
                <div className="relative w-3.5 h-3.5 ">
                <input 
                type="checkbox" 
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
                className={`appearance-none border-[1.5px] border-secondary/70 w-3.5 h-3.5 rounded checked:bg-secondary peer`}
                />
                <LuCheck 
                size={9}
                className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-secondary peer-checked:text-primary pointer-events-none stroke-4 cursor`}/>
                </div>,
            id: "select-all",
            cell: ({row}) => 
                <div className="relative w-3.5 h-3.5">
                <input 
                type="checkbox" 
                onChange={()=>{row.getToggleSelectedHandler()}}
                checked={row.getIsSelected()}
                className={`appearance-none border-[1.5px] border-secondary/70 w-3.5 h-3.5 rounded checked:bg-secondary peer`}
                />
                <LuCheck 
                size={9}
                className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-secondary peer-checked:text-primary pointer-events-none stroke-4 cursor`}/>
                </div>
            })
        ]

        return [...checkColumn, ...columnDef]
    }
    , [columnDef])

    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 20,
        pageIndex: 0    
    })
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})



    const table = useReactTable({
        data,
        columns,

        state: {
            pagination,
            rowSelection
        },

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,

        getRowId: row => (row as any).id,
        
        autoResetPageIndex: false,
        enableRowSelection: true,

    })

    useEffect(()=>{
        table.getColumn(inputColumnFilterID)?.setFilterValue(inputColumnFilterValue)
    }, [inputColumnFilterValue])


    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize
    const total = data.length

    const entryStart = total === 0 ? 0 : pageSize * pageIndex + 1
    const entryEnd = Math.min((pageIndex + 1) * pageSize, total)


  return (
    <div className={`w-full max-h-full`}>
        <div className={`w-full max-h-115 min-h-115 overflow-x-scroll overflow-y-scroll`}>
            <table 
            className={`w-full h-full border-collapse table-auto min-w-[550px] text-[11px] whitespace-nowrap`}
            >
                <thead className={`bg-secondary/10 text-left`}>
                    {table.getHeaderGroups().map(headerGroup =>
                        <tr
                        key={headerGroup.id}
                        >
                            {headerGroup.headers.map( header => 
                                <th
                                key={header.id}
                                className={`p-2 px-3`}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            )}
                        </tr>
                    )}
                </thead>
                <tbody
                className=""
                >
                    {table.getRowModel().rows.map( row => 
                        <tr
                        key={row.id}
                        className={`border-set border-l-0`}
                        >
                            {row.getVisibleCells().map( cell => 
                                <td
                                key={cell.id}
                                className={`p-2 px-3`}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <div
        className={`flex items-center justify-between px-3 h-8`}
        >
            <span
            className={`text-[9px] [&>span]:font-semibold`}
            >
                Showing <span>{table.getState().pagination.pageIndex === 0 && "0"}{entryStart}</span> - <span>{entryEnd}</span> out 0f <span>{data.length}</span> enteries
            </span>

            <div 
            className={` 
                flex items-center space-x-3
                [&>button]:p-1 [&>button]:bg-accent-one [&>button]:rounded-full [&>button]:text-white [&>button]:disabled:opacity-30 [&>button]:cursor-pointer [&>button]:disabled:cursor-auto
            `}
            >
                <button
                disabled={!table.getCanPreviousPage()}
                onClick={()=>{table.previousPage()}}
                >
                    <MdChevronLeft/>
                </button>
                <button
                disabled={!table.getCanNextPage()}
                onClick={()=>{table.nextPage()}}
                >
                    <MdChevronRight/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Table