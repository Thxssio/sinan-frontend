"use client"

import type { CSSProperties } from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema"
import { getApiErrorMessage } from "@/services/api"

const MINISTRY_LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC7o_Dqdz-IHCH-nds0X9yfCLX-jjs3D7eAyN0LnODWkThIZ22M4qzGk-QYlqwt5Qg-mU2IfvwNG_ZjSZ_D_a9L6SCfaIV81xh9Y_WA5a7o3op9q9JwaIkLacvjoFH8DHYa20Okg3rwfDGeiKW7lNWOjvADbFOtOeVEJG2kSBDYynXaIQElqLdFPeHmMjaGV7Bm2GewO8ENrgPuFELD_MBmHspstNWJGb-pFx1AvXwckwzfzFcdVM7kN20xdi57MU4-lx_YaKBuZKI"
const SINAN_LOGO_URL = "/SINAN.png"

const pageStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, var(--login-gradient-from) 0%, var(--login-gradient-via) 28%, var(--background) 100%)",
}

const cardStyle: CSSProperties = {
  boxShadow: "0 24px 48px -32px var(--clinical-shadow)",
}

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@sissaude.local",
      password: "123456",
    },
  })

  async function handleSubmit(values: LoginSchema) {
    setErrorMessage(null)

    try {
      await login(values)
      router.replace(ROUTES.dashboard)
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
    }
  }

  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center bg-background px-6 py-10 text-foreground antialiased"
      style={pageStyle}
    >
      <main className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            className="mx-auto mb-4 h-16 w-auto object-contain"
            alt="SINAN"
            src={SINAN_LOGO_URL}
            width={947}
            height={305}
            priority
          />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            SINAN
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Acessar sistema
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Use suas credenciais institucionais para entrar no portal.
          </p>
        </div>

        <section
          className="rounded-3xl border border-border bg-card p-6 sm:p-8"
          style={cardStyle}
        >
          <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-2">
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
                required
              />
              {form.formState.errors.email ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <label
                  className="block text-sm font-medium text-foreground"
                  htmlFor="password"
                >
                  Senha
                </label>
                <a
                  className="text-xs font-medium text-brand transition-colors hover:text-brand-hover"
                  href="#"
                >
                  Esqueci minha senha
                </a>
              </div>

              <div className="relative">
                <input
                  {...form.register("password")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                  id="password"
                  placeholder="Digite sua senha"
                  type={showPassword ? "text" : "password"}
                  required
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

            {errorMessage ? (
              <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-danger-soft px-4 py-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            <div className="space-y-3 pt-1">
              <button
                className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Autenticando..." : "Entrar"}
              </button>

              <button
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
                type="button"
              >
                Entrar com gov.br
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Ainda não tem acesso?{" "}
              <Link
                className="font-semibold text-brand transition-colors hover:text-brand-hover"
                href={ROUTES.register}
              >
                Criar cadastro
              </Link>
            </p>
          </form>
        </section>

        <div className="mt-6 flex flex-col items-center gap-4 text-center">
          <Image
            className="h-6 w-auto object-contain opacity-50 grayscale"
            alt="Ministério da Saúde"
            src={MINISTRY_LOGO_URL}
            width={170}
            height={34}
          />

          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <a className="transition-colors hover:text-foreground" href="#">
              Termos de Uso
            </a>
            <a className="transition-colors hover:text-foreground" href="#">
              Privacidade
            </a>
            <a className="transition-colors hover:text-foreground" href="#">
              Suporte
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
