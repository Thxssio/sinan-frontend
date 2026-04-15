"use client"

import React, { useState } from "react"
import Script from "next/script"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Stethoscope,
  Activity,
  ShieldCheck,
  CheckCircle2
} from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { ROUTES } from "@/lib/constants"
import { getApiErrorMessage } from "@/services/api"
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema"
import { useAuth } from "@/hooks/use-auth"

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
    <div className="min-h-[100dvh] w-full flex flex-col lg:flex-row bg-white font-sans text-slate-900">

      <main className="w-full lg:w-[45%] xl:w-[40%] min-h-[100dvh] flex flex-col p-6 sm:p-10 lg:p-16 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between">
          {/* Header Logo */}
          <div className="flex justify-center items-center gap-4 mb-8 lg:mb-12">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 shrink-0">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div className="text-left flex flex-col justify-center pt-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">SINAN</h1>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Ministério da Saúde
              </p>
            </div>
          </div>

          {/* Formulário Wrapper */}
          <div className="w-full flex-1 flex flex-col justify-center py-6 lg:py-0">
            <div className="mb-8 lg:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3">Acesso ao Portal</h2>
              <p className="text-slate-500 text-sm px-2">Insira suas credenciais institucionais para acessar o ecossistema de gestão clínica.</p>
            </div>

            <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 ml-1" htmlFor="email">
                  E-mail Institucional
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    {...form.register("email")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white placeholder:text-slate-400"
                    id="email"
                    placeholder="nome@instituicao.gov.br"
                    type="email"
                    required
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-red-600 mt-1 ml-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 ml-1" htmlFor="password">
                    Senha de Acesso
                  </label>
                  <a className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors" href="#">
                    Esqueci minha senha
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    {...form.register("password")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-12 text-slate-900 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white placeholder:text-slate-400"
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-red-600 mt-1 ml-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 text-red-600 text-sm p-3.5 rounded-xl border border-red-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Action */}
              <div className="pt-4">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed group"
                  type="submit"
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Autenticando...' : 'Entrar no Sistema'}</span>
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              {/* Divisor */}
              <div className="flex items-center gap-4 py-4">
                <div className="h-[1px] flex-1 bg-slate-200"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Outras formas de acesso</span>
                <div className="h-[1px] flex-1 bg-slate-200"></div>
              </div>

              {/* Alternativas */}
              <div className="space-y-3">
                {/* Botão Gov.br Principal */}
                <button className="flex items-center justify-center gap-2 py-3 w-full bg-[#1351B4] hover:bg-[#0C326F] text-white font-medium text-sm rounded-xl transition-all shadow-sm shadow-blue-900/10 active:scale-[0.98]" type="button">
                  <span className="font-extrabold text-base tracking-tight">gov<span className="text-[#00A859]">.</span>br</span>
                  <span className="border-l border-white/20 pl-3 ml-1">Entrar com a conta gov.br</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer Mobile/Desktop Left */}
          <div className="mt-8 lg:mt-12 w-full text-center space-y-4 shrink-0 flex flex-col items-start lg:items-center">
            <div className="flex flex-wrap gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 w-full justify-start lg:justify-center">
              <a className="hover:text-blue-600 transition-colors" href="#">Termos</a>
              <a className="hover:text-blue-600 transition-colors" href="#">Privacidade</a>
              <a className="hover:text-blue-600 transition-colors" href="#">Suporte</a>
            </div>
            <div className="flex flex-col items-center gap-3 lg:hidden w-full items-start">
              {/* Logo Gov.br para mobile */}
              <img
                className="h-5 object-contain grayscale opacity-60"
                alt="Ministério da Saúde"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7o_Dqdz-IHCH-nds0X9yfCLX-jjs3D7eAyN0LnODWkThIZ22M4qzGk-QYlqwt5Qg-mU2IfvwNG_ZjSZ_D_a9L6SCfaIV81xh9Y_WA5a7o3op9q9JwaIkLacvjoFH8DHYa20Okg3rwfDGeiKW7lNWOjvADbFOtOeVEJG2kSBDYynXaIQElqLdFPeHmMjaGV7Bm2GewO8ENrgPuFELD_MBmHspstNWJGb-pFx1AvXwckwzfzFcdVM7kN20xdi57MU4-lx_YaKBuZKI"
              />
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* LADO DIREITO: BRANDING & STATUS (Apenas Desktop)          */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden items-center justify-center p-12 flex-col">
        {/* Background Gradients & Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Content Showcase */}
        <div className="relative z-10 w-full max-w-xl text-center flex flex-col items-center">
          <Script
            src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
            strategy="lazyOnload"
          />

          {/* Lottie Animation Foreground */}
          <div className="mb-12 flex justify-center w-full">
            <lottie-player
              src="/doctor.json"
              background="transparent"
              speed="1"
              style={{ width: "400px", height: "400px" }}
              loop
              autoplay
            ></lottie-player>
          </div>

          {/* System Status Card (Glassmorphism) */}
          <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl text-left relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full -mr-10 -mt-10"></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <CheckCircle2 className="text-teal-400 w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Status do Sistema • Online</span>
            </div>

            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div>
                <p className="text-slate-400 text-xs mb-1">Unidades Ativas</p>
                <p className="text-white font-bold text-2xl">4.281</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Notificações Hoje</p>
                <p className="text-white font-bold text-2xl">12.4k</p>
              </div>
            </div>

            <div className="mt-6 w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden relative z-10">
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 w-[94%] h-full rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 relative z-10">
              Operação em conformidade com os protocolos do Ministério da Saúde.
            </p>
          </div>

        </div>

        {/* Logo BR Bottom Right */}
        <div className="absolute bottom-10 right-12 flex flex-col items-end gap-3 z-10">
          <img
            className="h-7 object-contain opacity-70 invert brightness-0"
            alt="Ministério da Saúde"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7o_Dqdz-IHCH-nds0X9yfCLX-jjs3D7eAyN0LnODWkThIZ22M4qzGk-QYlqwt5Qg-mU2IfvwNG_ZjSZ_D_a9L6SCfaIV81xh9Y_WA5a7o3op9q9JwaIkLacvjoFH8DHYa20Okg3rwfDGeiKW7lNWOjvADbFOtOeVEJG2kSBDYynXaIQElqLdFPeHmMjaGV7Bm2GewO8ENrgPuFELD_MBmHspstNWJGb-pFx1AvXwckwzfzFcdVM7kN20xdi57MU4-lx_YaKBuZKI"
          />
          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} SINAN - Sistema de Informação de Agravos de Notificação
          </p>
        </div>
      </aside>

    </div>
  )
}