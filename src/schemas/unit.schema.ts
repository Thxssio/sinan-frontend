import { z } from "zod"

export const unitSchema = z.object({
  name: z.string().min(3, "Nome da unidade obrigatorio"),
  city: z.string().min(2, "Cidade obrigatoria"),
  state: z.string().length(2, "UF obrigatoria"),
})

export type UnitSchema = z.infer<typeof unitSchema>
