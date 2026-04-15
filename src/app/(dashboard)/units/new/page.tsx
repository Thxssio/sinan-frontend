"use client"

import { useRouter } from "next/navigation"

import { PageTitle } from "@/components/layout/page-title"
import { UnitForm } from "@/components/units/unit-form"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"
import { useCreateUnit } from "@/hooks/use-units"
import type { UnitSchema } from "@/schemas/unit.schema"

export default function NewUnitPage() {
  const router = useRouter()
  const createUnit = useCreateUnit()

  async function handleSubmit(values: UnitSchema) {
    await createUnit.mutateAsync(values)
    router.push(ROUTES.units)
  }

  return (
    <>
      <PageTitle title="Nova unidade" />
      <Card>
        <CardContent>
          <UnitForm onSubmit={handleSubmit} isSubmitting={createUnit.isPending} />
        </CardContent>
      </Card>
    </>
  )
}
