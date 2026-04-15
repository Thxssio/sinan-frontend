"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"

import { DateField } from "@/components/forms/date-field"
import { InputField } from "@/components/forms/input-field"
import { TextareaField } from "@/components/forms/textarea-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  notificationSchema,
  type NotificationSchema,
} from "@/schemas/notification.schema"

type NotificationFormProps = {
  onSubmit: (values: NotificationSchema) => void | Promise<void>
  isSubmitting?: boolean
}

export function NotificationForm({
  onSubmit,
  isSubmitting,
}: NotificationFormProps) {
  const form = useForm<NotificationSchema>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      patient_id: 1,
      unit_id: 1,
      notification_type_id: 1,
      notification_date: new Date().toISOString().slice(0, 10),
      occurrence_date: "",
      notes: "",
    },
  })

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField
            control={form.control}
            name="patient_id"
            label="Paciente"
            type="number"
          />
          <InputField
            control={form.control}
            name="unit_id"
            label="Unidade"
            type="number"
          />
          <InputField
            control={form.control}
            name="notification_type_id"
            label="Tipo"
            type="number"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <DateField
            control={form.control}
            name="notification_date"
            label="Data da notificacao"
          />
          <DateField
            control={form.control}
            name="occurrence_date"
            label="Data da ocorrencia"
          />
        </div>
        <TextareaField
          control={form.control}
          name="notes"
          label="Observacoes"
        />
        <Button type="submit" className="w-fit" disabled={isSubmitting}>
          <Save data-icon="inline-start" />
          Salvar
        </Button>
      </form>
    </Form>
  )
}
