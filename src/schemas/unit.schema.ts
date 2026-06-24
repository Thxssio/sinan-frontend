import { z } from "zod"

export const unitSchema = z.object({
  name: z.string().min(3, "Nome da unidade obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().length(2, "UF obrigatória"),
})

export type UnitSchema = z.infer<typeof unitSchema>
