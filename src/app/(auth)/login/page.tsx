"use client"

import type { CSSProperties, HTMLAttributes } from "react"
import { createElement, useState } from "react"
import Image from "next/image"
import Script from "next/script"
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Server,
  ShieldCheck,
  Stethoscope,
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema"
import { getApiErrorMessage } from "@/services/api"

const MINISTRY_LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC7o_Dqdz-IHCH-nds0X9yfCLX-jjs3D7eAyN0LnODWkThIZ22M4qzGk-QYlqwt5Qg-mU2IfvwNG_ZjSZ_D_a9L6SCfaIV81xh9Y_WA5a7o3op9q9JwaIkLacvjoFH8DHYa20Okg3rwfDGeiKW7lNWOjvADbFOtOeVEJG2kSBDYynXaIQElqLdFPeHmMjaGV7Bm2GewO8ENrgPuFELD_MBmHspstNWJGb-pFx1AvXwckwzfzFcdVM7kN20xdi57MU4-lx_YaKBuZKI"

const loginPanelStyle: CSSProperties = {
  background:
    "radial-gradient(ellipse at top left, var(--login-gradient-from), var(--login-gradient-via), var(--login-gradient-to))",
}

const logoStyle: CSSProperties = {
  background: "linear-gradient(135deg, var(--brand), var(--brand-hover))",
  borderColor: "var(--brand-logo-border)",
  boxShadow: "0 8px 16px -6px var(--brand-shadow-strong)",
}

const fieldStyle: CSSProperties = {
  boxShadow: "0 1px 2px 0 var(--field-shadow)",
}

const brandButtonStyle: CSSProperties = {
  background: "linear-gradient(90deg, var(--brand), var(--brand-hover))",
  boxShadow: "0 8px 16px -6px var(--brand-shadow)",
}

const heroStyle: CSSProperties = {
  backgroundColor: "var(--brand-hero-canvas)",
  backgroundImage:
    "linear-gradient(to right, var(--brand-hero-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-hero-grid-line) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
}

const statusCardStyle: CSSProperties = {
  background: "var(--brand-hero-panel)",
  boxShadow: "0 8px 32px 0 var(--brand-hero-shadow)",
}

const statusSurfaceStyle: CSSProperties = {
  background: "var(--status-online-soft)",
  borderColor: "var(--status-online-border)",
  color: "var(--status-online)",
}

const heroMutedTextStyle: CSSProperties = {
  color: "var(--brand-hero-muted)",
}

const heroForegroundTextStyle: CSSProperties = {
  color: "var(--brand-hero-foreground)",
}

const heroSecurityIconStyle: CSSProperties = {
  color: "var(--brand-hero-security)",
}

const heroFooterBadgeStyle: CSSProperties = {
  background: "var(--brand-hero-chip)",
  borderColor: "var(--brand-hero-border)",
  color: "var(--brand-hero-muted)",
}

type LottiePlayerProps = HTMLAttributes<HTMLElement> & {
  src: string
  background?: string
  speed?: string
  loop?: boolean
  autoplay?: boolean
  style?: CSSProperties
}

function LottiePlayer(props: LottiePlayerProps) {
  return createElement("lottie-player", props)
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
    <div className="flex min-h-[100dvh] w-full flex-col bg-background font-sans text-foreground antialiased selection:bg-brand-soft lg:flex-row">
      <main
        className="relative z-10 flex min-h-[100dvh] w-full flex-col overflow-y-auto p-6 sm:p-10 lg:w-[45%] lg:p-16 xl:w-[40%]"
        style={loginPanelStyle}
      >
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand to-brand-accent lg:hidden" />

        <div className="mx-auto mt-4 flex w-full max-w-[420px] flex-1 flex-col justify-between lg:mt-0">
          <div className="mb-10 flex items-center justify-center gap-4">
            <div
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl border text-brand-foreground"
              style={logoStyle}
            >
              <Stethoscope className="size-7" />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="mb-1 text-3xl font-extrabold leading-none tracking-tight text-foreground">
                SINAN
              </h1>
              <p className="w-fit rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Ministério da Saúde
              </p>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col justify-center">
            <div className="mb-8 text-left">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Acesso ao Portal
              </h2>
              <p className="text-sm font-medium text-muted-foreground">
                Insira suas credenciais institucionais para acessar o
                ecossistema de gestão clínica.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="space-y-1.5">
                <label
                  className="ml-1 block text-[13px] font-semibold text-foreground/75"
                  htmlFor="email"
                >
                  E-mail Institucional
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground transition-colors group-focus-within:text-brand">
                    <Mail className="size-5" />
                  </div>
                  <input
                    {...form.register("email")}
                    className="w-full rounded-xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                    style={fieldStyle}
                    id="email"
                    placeholder="nome@instituicao.gov.br"
                    type="email"
                    required
                  />
                </div>
                {form.formState.errors.email ? (
                  <p className="ml-1 mt-1 text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <div className="mb-1 flex items-end justify-between">
                  <label
                    className="ml-1 block text-[13px] font-semibold text-foreground/75"
                    htmlFor="password"
                  >
                    Senha de Acesso
                  </label>
                  <a
                    className="text-[12px] font-semibold text-brand transition-colors hover:text-brand-hover"
                    href="#"
                  >
                    Esqueci minha senha
                  </a>
                </div>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground transition-colors group-focus-within:text-brand">
                    <Lock className="size-5" />
                  </div>
                  <input
                    {...form.register("password")}
                    className="w-full rounded-xl border border-border bg-card py-3.5 pl-11 pr-12 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                    style={fieldStyle}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground transition-colors hover:text-brand"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password ? (
                  <p className="ml-1 mt-1 text-xs text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                ) : null}
              </div>

              {errorMessage ? (
                <div className="flex animate-in items-start gap-3 rounded-xl border border-destructive/20 bg-danger-soft p-4 text-sm text-destructive shadow-sm fade-in slide-in-from-top-2">
                  <Activity className="mt-0.5 size-5 shrink-0" />
                  <span className="font-medium leading-relaxed">
                    {errorMessage}
                  </span>
                </div>
              ) : null}

              <div className="pt-2">
                <button
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 font-semibold text-brand-foreground transition-all hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  style={brandButtonStyle}
                  type="submit"
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 translate-y-full bg-brand-foreground/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">
                    {isLoading ? "Autenticando..." : "Entrar no Sistema"}
                  </span>
                  {!isLoading ? (
                    <ArrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-1" />
                  ) : null}
                </button>
              </div>

              <div className="flex items-center gap-4 py-5">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-semibold text-muted-foreground">
                  ou
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div>
                <button
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-govbr-hover/50 bg-govbr py-3.5 text-sm font-medium text-govbr-foreground shadow-sm shadow-govbr/20 transition-all hover:bg-govbr-hover active:scale-[0.98]"
                  type="button"
                >
                  <div className="flex items-center rounded-md bg-govbr-foreground/10 px-2 py-1">
                    <span className="text-base font-extrabold tracking-tight">
                      gov<span className="text-govbr-accent">.</span>br
                    </span>
                  </div>
                  <span className="font-semibold">
                    Entrar com a conta gov.br
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10 w-full space-y-5 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              <a className="transition-colors hover:text-brand" href="#">
                Termos de Uso
              </a>
              <a className="transition-colors hover:text-brand" href="#">
                Privacidade
              </a>
              <a className="transition-colors hover:text-brand" href="#">
                Suporte
              </a>
            </div>

            <div className="flex w-full justify-center border-t border-border pt-4 lg:hidden">
              <Image
                className="h-6 w-auto object-contain opacity-50 grayscale"
                alt="Ministério da Saúde"
                src={MINISTRY_LOGO_URL}
                width={170}
                height={34}
              />
            </div>
          </div>
        </div>
      </main>

      <aside
        className="relative hidden flex-1 flex-col items-center justify-center overflow-hidden p-12 lg:flex"
        style={heroStyle}
      >
        <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
          <Script
            src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
            strategy="lazyOnload"
          />

          <div className="relative mb-10 flex w-full justify-center">
            <LottiePlayer
              src="/doctor.json"
              background="transparent"
              speed="1"
              className="relative z-10 aspect-square w-full max-w-[360px] drop-shadow-2xl"
              loop
              autoplay
            />
          </div>

          <div
            className="group relative w-full overflow-hidden rounded-3xl border border-brand-hero-border p-7 text-left backdrop-blur-2xl"
            style={statusCardStyle}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-hero-highlight to-transparent" />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-brand/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-8 items-center justify-center rounded-full border"
                  style={statusSurfaceStyle}
                >
                  <Server className="size-4" />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={heroMutedTextStyle}
                >
                  Status do Sistema
                </span>
              </div>
              <div
                className="flex items-center gap-2 rounded-full border px-3 py-1.5"
                style={statusSurfaceStyle}
              >
                <span
                  className="size-2 animate-pulse rounded-full"
                  style={{ background: "var(--status-online)" }}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Online
                </span>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-8">
              <div>
                <p
                  className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                  style={heroMutedTextStyle}
                >
                  Unidades Ativas
                </p>
                <p
                  className="text-3xl font-bold tracking-tight"
                  style={heroForegroundTextStyle}
                >
                  4.281
                </p>
              </div>
              <div>
                <p
                  className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                  style={heroMutedTextStyle}
                >
                  Notificações Hoje
                </p>
                <p
                  className="text-3xl font-bold tracking-tight"
                  style={heroForegroundTextStyle}
                >
                  12.4k
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 h-1.5 w-full overflow-hidden rounded-full bg-brand-hero-track-strong shadow-inner">
              <div className="relative h-full w-[94%] overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand-accent">
                <div className="animate-shimmer absolute inset-0 h-full w-full -translate-x-full bg-brand-hero-highlight" />
              </div>
            </div>

            <div className="relative z-10 mt-4 flex items-start gap-2">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0"
                style={heroSecurityIconStyle}
              />
              <p
                className="text-[11px] leading-relaxed"
                style={heroMutedTextStyle}
              >
                Operação encriptada de ponta a ponta em conformidade com as
                diretrizes de segurança do Ministério da Saúde.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-12 z-10 flex flex-col items-end gap-3">
          <div
            className="rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest"
            style={heroFooterBadgeStyle}
          >
            Ministério da Saúde
          </div>
          <p
            className="text-[10px] font-medium tracking-wide"
            style={heroMutedTextStyle}
          >
            © {new Date().getFullYear()} SINAN - Sistema de Informação de
            Agravos de Notificação
          </p>
        </div>
      </aside>
    </div>
  )
}
