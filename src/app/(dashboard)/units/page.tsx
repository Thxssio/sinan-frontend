"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { PageTitle } from "@/components/layout/page-title"
import { DataTable, type DataTableColumn } from "@/components/tables/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ROUTES } from "@/lib/constants"
import { useUnits } from "@/hooks/use-units"
import type { Unit } from "@/types/unit"

const columns: DataTableColumn<Unit>[] = [
  {
    key: "name",
    header: "Nome",
    cell: (row) => row.name,
  },
  {
    key: "city",
    header: "Cidade",
    cell: (row) => row.city,
  },
  {
    key: "state",
    header: "UF",
    cell: (row) => row.state,
  },
]

export default function UnitsPage() {
  const unitsQuery = useUnits()

  return (
    <>
      <PageTitle
        title="Unidades"
        action={
          <Button asChild>
            <Link href={`${ROUTES.units}/new`}>
              <Plus data-icon="inline-start" />
              Nova
            </Link>
          </Button>
        }
      />
      <Card>
        <CardContent>
          {unitsQuery.isPending ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <DataTable
              data={unitsQuery.data?.data ?? []}
              columns={columns}
              getRowKey={(row) => row.id}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}
