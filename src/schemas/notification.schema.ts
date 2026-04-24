import { z } from "zod"

import { notificationTypeDefinitions } from "@/features/notifications/definitions"
import { patientSchema } from "@/schemas/patient.schema"
import { notificationStatuses } from "@/types/notification"

const optionalTextSchema = z.string().optional()

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

export const notificationSchema = z.discriminatedUnion(
  "notification_type_slug",
  [
    notificationBaseSchema.extend({
      notification_type_slug: z.literal("aids"),
      form_data: notificationTypeDefinitions.aids.formSchema,
    }),
    notificationBaseSchema.extend({
      notification_type_slug: z.literal("venomous_animal"),
      form_data: notificationTypeDefinitions.venomous_animal.formSchema,
    }),
  ]
)

export const notificationFormSchema = z
  .discriminatedUnion("notification_type_slug", [
    notificationFormBaseSchema.extend({
      notification_type_slug: z.literal("aids"),
      form_data: notificationTypeDefinitions.aids.draftFormSchema,
    }),
    notificationFormBaseSchema.extend({
      notification_type_slug: z.literal("venomous_animal"),
      form_data: notificationTypeDefinitions.venomous_animal.draftFormSchema,
    }),
  ])
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
