"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"

import { InputField } from "@/components/forms/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { unitSchema, type UnitSchema } from "@/schemas/unit.schema"

type UnitFormProps = {
  onSubmit: (values: UnitSchema) => void | Promise<void>
  isSubmitting?: boolean
}

export function UnitForm({ onSubmit, isSubmitting }: UnitFormProps) {
  const form = useForm<UnitSchema>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: "",
      city: "",
      state: "SP",
    },
  })

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputField control={form.control} name="name" label="Nome" />
        <div className="grid gap-4 sm:grid-cols-[1fr_96px]">
          <InputField control={form.control} name="city" label="Cidade" />
          <InputField control={form.control} name="state" label="UF" />
        </div>
        <Button type="submit" className="w-fit" disabled={isSubmitting}>
          <Save data-icon="inline-start" />
          Salvar
        </Button>
      </form>
    </Form>
  )
}
