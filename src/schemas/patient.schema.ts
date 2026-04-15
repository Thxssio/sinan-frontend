import { z } from "zod"

export const patientSchema = z.object({
  name: z.string().min(3, "Nome obrigatorio"),
  document: z.string().optional(),
  birth_date: z.string().optional(),
  phone: z.string().optional(),
})

export type PatientSchema = z.infer<typeof patientSchema>
