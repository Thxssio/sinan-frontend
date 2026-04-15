"use client"

import { useParams } from "next/navigation"

import { PageTitle } from "@/components/layout/page-title"
import { Card, CardContent } from "@/components/ui/card"

export default function UnitDetailsPage() {
  const params = useParams<{ id: string }>()

  return (
    <>
      <PageTitle title={`Unidade #${params.id}`} />
      <Card>
        <CardContent>Detalhe da unidade.</CardContent>
      </Card>
    </>
  )
}
