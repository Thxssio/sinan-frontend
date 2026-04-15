"use client"

import { useRouter } from "next/navigation"

import { PageTitle } from "@/components/layout/page-title"
import { PatientForm } from "@/components/patients/patient-form"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"
import { useCreatePatient } from "@/hooks/use-patients"
import type { PatientSchema } from "@/schemas/patient.schema"

export default function NewPatientPage() {
  const router = useRouter()
  const createPatient = useCreatePatient()

  async function handleSubmit(values: PatientSchema) {
    await createPatient.mutateAsync(values)
    router.push(ROUTES.patients)
  }

  return (
    <>
      <PageTitle title="Novo paciente" />
      <Card>
        <CardContent>
          <PatientForm
            onSubmit={handleSubmit}
            isSubmitting={createPatient.isPending}
          />
        </CardContent>
      </Card>
    </>
  )
}
