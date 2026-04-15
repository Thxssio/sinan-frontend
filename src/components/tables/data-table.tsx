import type { ReactNode } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type DataTableColumn<TData> = {
  key: string
  header: ReactNode
  cell: (row: TData) => ReactNode
  className?: string
}

type DataTableProps<TData> = {
  data: TData[]
  columns: DataTableColumn<TData>[]
  getRowKey: (row: TData) => string | number
  emptyMessage?: string
}

export function DataTable<TData>({
  data,
  columns,
  getRowKey,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableProps<TData>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length ? (
          data.map((row) => (
            <TableRow key={getRowKey(row)}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
