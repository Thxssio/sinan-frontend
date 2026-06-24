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
    <>
      <div className="grid gap-3 md:hidden">
        {data.length ? (
          data.map((row) => (
            <article
              className="grid gap-3 rounded-xl border border-border bg-card p-4"
              key={getRowKey(row)}
            >
              {columns.map((column) => (
                <div
                  className="grid gap-1 border-b border-border/70 pb-3 last:border-0 last:pb-0"
                  key={column.key}
                >
                  {column.header ? (
                    <div className="text-xs font-medium uppercase text-muted-foreground">
                      {column.header}
                    </div>
                  ) : null}
                  <div className="text-sm text-foreground">
                    {column.cell(row)}
                  </div>
                </div>
              ))}
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>

      <div className="hidden md:block">
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
      </div>
    </>
  )
}
