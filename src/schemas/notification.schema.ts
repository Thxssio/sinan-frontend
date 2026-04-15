import { z } from "zod"

export const notificationSchema = z.object({
  patient_id: z.number().int().positive("Paciente obrigatorio"),
  unit_id: z.number().int().positive("Unidade obrigatoria"),
  notification_type_id: z
    .number()
    .int()
    .positive("Tipo de notificacao obrigatorio"),
  notification_date: z.string().min(1, "Data da notificacao obrigatoria"),
  occurrence_date: z.string().optional(),
  notes: z.string().optional(),
})

export type NotificationSchema = z.infer<typeof notificationSchema>
