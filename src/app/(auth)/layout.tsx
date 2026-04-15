export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden">
      {children}
    </div>
  )
}
