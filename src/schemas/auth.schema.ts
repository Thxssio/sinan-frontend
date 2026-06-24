import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha obrigatória"),
})

export const registerSchema = z
  .object({
    name: z.string().min(3, "Informe seu nome completo"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    password_confirmation: z.string().min(6, "Confirme sua senha"),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: "As senhas não conferem",
    path: ["password_confirmation"],
  })

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
