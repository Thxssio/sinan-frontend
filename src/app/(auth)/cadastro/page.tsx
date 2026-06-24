"use client"

import type { CSSProperties } from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"

import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { registerSchema, type RegisterSchema } from "@/schemas/auth.schema"
import { getApiErrorMessage } from "@/services/api"

const SINAN_LOGO_URL = "/SINAN.png"

const pageStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, var(--login-gradient-from) 0%, var(--login-gradient-via) 34%, var(--background) 100%)",
}

const cardStyle: CSSProperties = {
  boxShadow: "0 24px 48px -32px var(--clinical-shadow)",
}

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  async function handleSubmit(values: RegisterSchema) {
    setErrorMessage(null)

    try {
      await register(values)
      router.replace(ROUTES.dashboard)
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
    }
  }

  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-8 text-foreground antialiased sm:px-6 lg:px-8"
      style={pageStyle}
    >
      <main className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="text-center lg:text-left">
          <Image
            className="mx-auto mb-4 h-14 w-auto object-contain lg:mx-0 lg:h-16"
            alt="SINAN"
            src={SINAN_LOGO_URL}
            width={947}
            height={305}
            priority
          />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            SINAN
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Criar cadastro
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground lg:mx-0">
            Solicite acesso institucional para registrar pacientes,
            notificacoes e unidades de saude em uma area segura.
          </p>

          <div className="mt-6 grid gap-3 text-left sm:grid-cols-3 lg:grid-cols-1">
            {[
              "Acesso protegido por e-mail institucional",
              "Cadastro integrado ao painel de notificacoes",
              "Experiencia otimizada para celular e computador",
            ].map((item) => (
              <div
                className="flex items-start gap-3 rounded-2xl border border-border bg-card/80 p-4"
                key={item}
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-3xl border border-border bg-card p-5 sm:p-8"
          style={cardStyle}
        >
          <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label
                  className="block text-sm font-medium text-foreground"
                  htmlFor="name"
                >
                  Nome completo
                </label>
                <input
                  {...form.register("name")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                  id="name"
                  placeholder="Nome do profissional"
                  autoComplete="name"
                />
                {form.formState.errors.name ? (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  className="block text-sm font-medium text-foreground"
                  htmlFor="email"
                >
                  E-mail institucional
                </label>
                <input
                  {...form.register("email")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                  id="email"
                  placeholder="nome@instituicao.gov.br"
                  type="email"
                  autoComplete="email"
                />
                {form.formState.errors.email ? (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-foreground"
                  htmlFor="password"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    {...form.register("password")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                    id="password"
                    placeholder="Minimo 6 caracteres"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password ? (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-foreground"
                  htmlFor="password_confirmation"
                >
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    {...form.register("password_confirmation")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                    id="password_confirmation"
                    placeholder="Repita a senha"
                    type={showPasswordConfirmation ? "text" : "password"}
                    autoComplete="new-password"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                    type="button"
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    aria-label={
                      showPasswordConfirmation
                        ? "Ocultar confirmacao de senha"
                        : "Mostrar confirmacao de senha"
                    }
                  >
                    {showPasswordConfirmation ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password_confirmation ? (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.password_confirmation.message}
                  </p>
                ) : null}
              </div>
            </div>

            {errorMessage ? (
              <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-danger-soft px-4 py-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            <button
              className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Criando cadastro..." : "Criar cadastro"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Ja possui acesso?{" "}
              <Link
                className="font-semibold text-brand transition-colors hover:text-brand-hover"
                href={ROUTES.login}
              >
                Entrar no sistema
              </Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  )
}
