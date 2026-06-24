import { z } from "zod"

import { patientSchema } from "@/schemas/patient.schema"
import {
  notificationStatuses,
  notificationTypeSlugs,
  type NotificationTypeSlug,
} from "@/types/notification"

const optionalTextSchema = z.string().optional()
const formDataSchema = z.record(z.string(), z.unknown())
const notificationTypeSlugSchema = z.custom<NotificationTypeSlug>(
  (value) =>
    typeof value === "string" &&
    notificationTypeSlugs.includes(value as NotificationTypeSlug),
  "Tipo de notificacao invalido"
)

const notificationBaseSchema = z.object({
  patient_id: z.coerce.number().int().positive("Paciente obrigatorio"),
  unit_id: z.coerce.number().int().positive("Unidade obrigatoria"),
  status: z.enum(notificationStatuses),
  notification_date: z.string().min(1, "Data da notificacao obrigatoria"),
  occurrence_date: optionalTextSchema,
  notes: optionalTextSchema,
})

const notificationDraftPatientSchema = patientSchema.extend({
  name: z.string().optional(),
})

const notificationFormBaseSchema = notificationBaseSchema.extend({
  patient_id: z.coerce.number().int().positive("Paciente obrigatorio").optional(),
  patient_mode: z.enum(["existing", "new"]),
  new_patient: notificationDraftPatientSchema,
})

export const notificationSchema = notificationBaseSchema.extend({
  notification_type_slug: notificationTypeSlugSchema,
  form_data: formDataSchema,
})

export const notificationFormSchema = notificationFormBaseSchema
  .extend({
    notification_type_slug: notificationTypeSlugSchema,
    form_data: formDataSchema,
  })
  .superRefine((values, ctx) => {
    if (values.patient_mode === "existing") {
      if (!values.patient_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["patient_id"],
          message: "Selecione um paciente para continuar",
        })
      }

      return
    }

    const parsedPatient = patientSchema.safeParse(values.new_patient)

    if (parsedPatient.success) {
      return
    }

    parsedPatient.error.issues.forEach((issue) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["new_patient", ...issue.path],
        message: issue.message,
      })
    })
  })

export type NotificationSchema = z.infer<typeof notificationSchema>
export type NotificationFormSchema = z.infer<typeof notificationFormSchema>
