"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { PageTitle } from "@/components/layout/page-title"
import { DataTable, type DataTableColumn } from "@/components/tables/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ROUTES } from "@/lib/constants"
import { usePatients } from "@/hooks/use-patients"
import type { Patient } from "@/types/patient"

const columns: DataTableColumn<Patient>[] = [
  {
    key: "name",
    header: "Nome",
    cell: (row) => (
      <Link
        className="font-medium text-brand transition-colors hover:text-brand-hover"
        href={`${ROUTES.patients}/${row.id}`}
      >
        {row.name}
      </Link>
    ),
  },
  {
    key: "actions",
    header: "",
    cell: (row) => (
      <Button variant="outline" size="sm" asChild>
        <Link href={`${ROUTES.patients}/${row.id}`}>Ver cronologia</Link>
      </Button>
    ),
    className: "text-right",
  },
  {
    key: "document",
    header: "Documento",
    cell: (row) => row.document ?? "-",
  },
  {
    key: "phone",
    header: "Telefone",
    cell: (row) => row.phone ?? "-",
  },
]

export default function PatientsPage() {
  const patientsQuery = usePatients()

  return (
    <>
      <PageTitle
        title="Pacientes"
        action={
          <Button asChild>
            <Link href={`${ROUTES.patients}/new`}>
              <Plus data-icon="inline-start" />
              Novo
            </Link>
          </Button>
        }
      />
      <Card>
        <CardContent>
          {patientsQuery.isPending ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <DataTable
              data={patientsQuery.data?.data ?? []}
              columns={columns}
              getRowKey={(row) => row.id}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}
