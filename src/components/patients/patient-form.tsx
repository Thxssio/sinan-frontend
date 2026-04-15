"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"

import { DateField } from "@/components/forms/date-field"
import { InputField } from "@/components/forms/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { patientSchema, type PatientSchema } from "@/schemas/patient.schema"

type PatientFormProps = {
  onSubmit: (values: PatientSchema) => void | Promise<void>
  isSubmitting?: boolean
}

export function PatientForm({ onSubmit, isSubmitting }: PatientFormProps) {
  const form = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      document: "",
      birth_date: "",
      phone: "",
    },
  })

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputField control={form.control} name="name" label="Nome" />
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField control={form.control} name="document" label="CPF" />
          <DateField
            control={form.control}
            name="birth_date"
            label="Nascimento"
          />
          <InputField control={form.control} name="phone" label="Telefone" />
        </div>
        <Button type="submit" className="w-fit" disabled={isSubmitting}>
          <Save data-icon="inline-start" />
          Salvar
        </Button>
      </form>
    </Form>
  )
}
