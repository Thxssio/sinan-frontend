import type { ReactNode } from "react"

type PageTitleProps = {
  title: string
  description?: string
  action?: ReactNode
}

export function PageTitle({ title, description, action }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
