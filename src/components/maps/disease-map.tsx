"use client"

import * as React from "react"
import { MapPin } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { NotificationWithRelations } from "@/types/notification"
import type { Unit } from "@/types/unit"

type DiseaseMapProps = {
  notifications: NotificationWithRelations[]
  units: Unit[]
  isLoading?: boolean
}

type StateSummary = {
  state: string
  total: number
  diseases: Record<string, number>
}

type LocationSummary = {
  id: string
  name: string
  city: string
  state: string
  latitude?: number
  longitude?: number
  total: number
  diseases: Record<string, number>
}

const statePositions: Record<string, { x: number; y: number }> = {
  AC: { x: 13, y: 54 },
  AL: { x: 78, y: 52 },
  AM: { x: 25, y: 32 },
  AP: { x: 48, y: 13 },
  BA: { x: 69, y: 61 },
  CE: { x: 76, y: 37 },
  DF: { x: 58, y: 63 },
  ES: { x: 73, y: 75 },
  GO: { x: 55, y: 64 },
  MA: { x: 62, y: 35 },
  MG: { x: 64, y: 72 },
  MS: { x: 45, y: 75 },
  MT: { x: 43, y: 60 },
  PA: { x: 48, y: 27 },
  PB: { x: 80, y: 42 },
  PE: { x: 80, y: 47 },
  PI: { x: 68, y: 42 },
  PR: { x: 55, y: 86 },
  RJ: { x: 69, y: 80 },
  RN: { x: 82, y: 38 },
  RO: { x: 29, y: 58 },
  RR: { x: 33, y: 14 },
  RS: { x: 55, y: 96 },
  SC: { x: 58, y: 91 },
  SE: { x: 78, y: 56 },
  SP: { x: 60, y: 80 },
  TO: { x: 58, y: 48 },
}

const numberFormatter = new Intl.NumberFormat("pt-BR")
const brazilBounds = {
  minLatitude: -33.8,
  maxLatitude: 5.3,
  minLongitude: -73.9,
  maxLongitude: -34.7,
}

function normalizeState(state?: string) {
  const normalized = state?.trim().toUpperCase()

  if (!normalized || normalized.length !== 2) {
    return "UF não informada"
  }

  return normalized
}

function buildStateSummaries(
  notifications: NotificationWithRelations[],
  units: Unit[],
  selectedDisease: string
) {
  const unitsById = new Map(units.map((unit) => [unit.id, unit]))
  const summaries = new Map<string, StateSummary>()

  notifications.forEach((notification) => {
    const disease = notification.notification_type

    if (selectedDisease !== "all" && disease !== selectedDisease) {
      return
    }

    const unit = unitsById.get(notification.unit_id)
    const state = normalizeState(unit?.state)
    const current = summaries.get(state) ?? {
      state,
      total: 0,
      diseases: {},
    }

    current.total += 1
    current.diseases[disease] = (current.diseases[disease] ?? 0) + 1
    summaries.set(state, current)
  })

  return Array.from(summaries.values()).sort((left, right) => {
    if (right.total !== left.total) {
      return right.total - left.total
    }

    return left.state.localeCompare(right.state)
  })
}

function hasCoordinates(
  unit?: Unit
): unit is Unit & { latitude: number; longitude: number } {
  return (
    typeof unit?.latitude === "number" &&
    Number.isFinite(unit.latitude) &&
    typeof unit.longitude === "number" &&
    Number.isFinite(unit.longitude)
  )
}

function projectCoordinates(latitude: number, longitude: number) {
  const x =
    ((longitude - brazilBounds.minLongitude) /
      (brazilBounds.maxLongitude - brazilBounds.minLongitude)) *
    100
  const y =
    ((brazilBounds.maxLatitude - latitude) /
      (brazilBounds.maxLatitude - brazilBounds.minLatitude)) *
    100

  return {
    x: Math.min(100, Math.max(0, x)),
    y: Math.min(100, Math.max(0, y)),
  }
}

function buildLocationSummaries(
  notifications: NotificationWithRelations[],
  units: Unit[],
  selectedDisease: string
) {
  const unitsById = new Map(units.map((unit) => [unit.id, unit]))
  const summaries = new Map<string, LocationSummary>()

  notifications.forEach((notification) => {
    const disease = notification.notification_type

    if (selectedDisease !== "all" && disease !== selectedDisease) {
      return
    }

    const unit = unitsById.get(notification.unit_id)

    if (!hasCoordinates(unit)) {
      return
    }

    const id = String(unit.id)
    const current = summaries.get(id) ?? {
      id,
      name: unit.name,
      city: unit.city,
      state: normalizeState(unit.state),
      latitude: unit.latitude,
      longitude: unit.longitude,
      total: 0,
      diseases: {},
    }

    current.total += 1
    current.diseases[disease] = (current.diseases[disease] ?? 0) + 1
    summaries.set(id, current)
  })

  return Array.from(summaries.values()).sort((left, right) => {
    if (right.total !== left.total) {
      return right.total - left.total
    }

    return left.name.localeCompare(right.name, "pt-BR")
  })
}

function buildDiseaseOptions(notifications: NotificationWithRelations[]) {
  const diseaseTotals = new Map<string, number>()

  notifications.forEach((notification) => {
    diseaseTotals.set(
      notification.notification_type,
      (diseaseTotals.get(notification.notification_type) ?? 0) + 1
    )
  })

  return Array.from(diseaseTotals.entries())
    .map(([label, total]) => ({ label, total }))
    .sort((left, right) => {
      if (right.total !== left.total) {
        return right.total - left.total
      }

      return left.label.localeCompare(right.label, "pt-BR")
    })
}

function getDominantDisease(summary: StateSummary) {
  const [disease] = Object.entries(summary.diseases).sort(
    ([, leftTotal], [, rightTotal]) => rightTotal - leftTotal
  )[0] ?? ["Sem agravo"]

  return disease
}

export function DiseaseMap({
  notifications,
  units,
  isLoading,
}: DiseaseMapProps) {
  const [selectedDisease, setSelectedDisease] = React.useState("all")
  const diseaseOptions = buildDiseaseOptions(notifications)
  const stateSummaries = buildStateSummaries(
    notifications,
    units,
    selectedDisease
  )
  const locationSummaries = buildLocationSummaries(
    notifications,
    units,
    selectedDisease
  )
  const mappedSummaries = stateSummaries.filter(
    (summary) => statePositions[summary.state]
  )
  const unmappedSummaries = stateSummaries.filter(
    (summary) => !statePositions[summary.state]
  )
  const maxTotal = Math.max(
    1,
    ...locationSummaries.map((summary) => summary.total),
    ...stateSummaries.map((summary) => summary.total)
  )
  const hasPreciseLocations = locationSummaries.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-4 text-brand" />
          Mapa de doenças registradas
        </CardTitle>
        <CardDescription>
          Veja onde os agravos foram registrados e identifique áreas com maior
          concentração de notificações.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-3">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <button
                className={cn(
                  "grid min-h-16 rounded-lg border px-3 py-2 text-left transition-colors",
                  selectedDisease === "all"
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
                type="button"
                onClick={() => setSelectedDisease("all")}
              >
                <span className="text-sm font-medium">Todas</span>
                <span className="text-xs opacity-80">
                  {numberFormatter.format(notifications.length)} registros
                </span>
              </button>
              {diseaseOptions.map((disease) => (
                <button
                  className={cn(
                    "grid min-h-16 rounded-lg border px-3 py-2 text-left transition-colors",
                    selectedDisease === disease.label
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  )}
                  key={disease.label}
                  type="button"
                  onClick={() => setSelectedDisease(disease.label)}
                >
                  <span className="text-sm font-medium">{disease.label}</span>
                  <span className="text-xs opacity-80">
                    {numberFormatter.format(disease.total)} registros
                  </span>
                </button>
              ))}
            </div>

            <div className="relative aspect-[4/3] min-h-80 overflow-hidden rounded-xl border border-border bg-muted/30">
              <svg
                className="absolute inset-0 size-full text-border"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path
                  d="M33 7 L48 11 L58 22 L74 28 L86 43 L78 58 L72 73 L62 82 L58 96 L45 90 L37 78 L25 71 L18 58 L8 49 L18 35 L20 20 Z"
                  fill="currentColor"
                  opacity="0.42"
                />
                <path
                  d="M33 7 L48 11 L58 22 L74 28 L86 43 L78 58 L72 73 L62 82 L58 96 L45 90 L37 78 L25 71 L18 58 L8 49 L18 35 L20 20 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
              </svg>

              {isLoading ? (
                <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                  Carregando mapa...
                </div>
              ) : hasPreciseLocations ? (
                locationSummaries.map((summary) => {
                  const position = projectCoordinates(
                    summary.latitude ?? 0,
                    summary.longitude ?? 0
                  )
                  const size = 0.9 + (summary.total / maxTotal) * 1.25

                  return (
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      key={summary.id}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                      }}
                    >
                      <div
                        className="grid place-items-center rounded-full border-2 border-background bg-brand text-[0.65rem] font-semibold text-brand-foreground shadow-lg"
                        title={`${summary.name}: ${summary.total} registro(s)`}
                        style={{
                          width: `${size}rem`,
                          height: `${size}rem`,
                        }}
                      >
                        {summary.total}
                      </div>
                      <span className="absolute left-1/2 top-full mt-1 max-w-24 -translate-x-1/2 rounded bg-background/90 px-1 text-center text-[0.65rem] font-medium leading-tight text-foreground shadow-sm">
                        {summary.city}/{summary.state}
                      </span>
                    </div>
                  )
                })
              ) : mappedSummaries.length > 0 ? (
                mappedSummaries.map((summary) => {
                  const position = statePositions[summary.state]
                  const size = 0.9 + (summary.total / maxTotal) * 1.25

                  return (
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      key={summary.state}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                      }}
                    >
                      <div
                        className="grid place-items-center rounded-full border-2 border-background bg-brand text-[0.65rem] font-semibold text-brand-foreground shadow-lg"
                        title={`${summary.state}: ${summary.total} registro(s)`}
                        style={{
                          width: `${size}rem`,
                          height: `${size}rem`,
                        }}
                      >
                        {summary.total}
                      </div>
                      <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded bg-background/90 px-1 text-[0.65rem] font-medium text-foreground shadow-sm">
                        {summary.state}
                      </span>
                    </div>
                  )
                })
              ) : (
                <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground">
                  Nenhum registro com UF encontrada para o filtro selecionado.
                </div>
              )}
            </div>
          </div>

          <div className="grid content-start gap-3">
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Total no filtro</p>
              <p className="mt-1 text-3xl font-semibold">
                {numberFormatter.format(
                  stateSummaries.reduce(
                    (total, summary) => total + summary.total,
                    0
                  )
                )}
              </p>
            </div>

            <div className="grid gap-2">
              {hasPreciseLocations ? (
                locationSummaries.map((summary) => (
                  <div
                    className="rounded-xl border border-border px-4 py-3"
                    key={summary.id}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{summary.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {summary.city}/{summary.state}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {numberFormatter.format(summary.total)}
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Principal: {getDominantDisease(summary)}
                    </p>
                  </div>
                ))
              ) : stateSummaries.length > 0 ? (
                stateSummaries.map((summary) => (
                  <div
                    className="rounded-xl border border-border px-4 py-3"
                    key={summary.state}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{summary.state}</p>
                      <p className="text-sm font-semibold">
                        {numberFormatter.format(summary.total)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Principal: {getDominantDisease(summary)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                  Nenhum registro para listar.
                </div>
              )}
            </div>

            {unmappedSummaries.length > 0 ? (
              <p className="text-xs text-muted-foreground">
                {unmappedSummaries.length} agrupamento(s) sem posição no mapa
                por falta de UF válida.
              </p>
            ) : null}
            {!hasPreciseLocations && stateSummaries.length > 0 ? (
              <p className="text-xs text-muted-foreground">
                Exibição por UF. Quando o backend enviar latitude/longitude das
                unidades via CNES, o mapa passa a mostrar os pontos exatos.
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
