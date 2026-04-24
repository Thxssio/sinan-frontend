import { z } from "zod"

export type NotificationFieldKind =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "select"

export type NotificationFieldOption = {
  label: string
  value: string
}

export type NotificationFieldDefinition<
  TName extends string = string,
  TSchema extends z.ZodTypeAny = z.ZodTypeAny,
> = {
  name: TName
  label: string
  kind: NotificationFieldKind
  schema: TSchema
  defaultValue: z.input<TSchema>
  placeholder?: string
  fullWidth?: boolean
  options?: NotificationFieldOption[]
}

export type NotificationSectionDefinition<
  TFields extends readonly NotificationFieldDefinition[] = readonly NotificationFieldDefinition[],
> = {
  id: string
  title: string
  description: string
  columns?: 1 | 2 | 3
  fields: TFields
}

type Simplify<T> = {
  [Key in keyof T]: T[Key]
} & {}

type UnionToIntersection<T> = (
  T extends unknown ? (value: T) => void : never
) extends (value: infer Result) => void
  ? Result
  : never

type SectionFieldShape<TSection extends NotificationSectionDefinition> = {
  [Field in TSection["fields"][number] as Field["name"]]: Field["schema"]
}

export type NotificationSectionShape<
  TSections extends readonly NotificationSectionDefinition[],
> = Simplify<
  UnionToIntersection<SectionFieldShape<TSections[number]>> & z.ZodRawShape
>

export type NotificationFormDefaults<
  TSections extends readonly NotificationSectionDefinition[],
> = {
  [Key in keyof NotificationSectionShape<TSections>]: z.input<
    NotificationSectionShape<TSections>[Key]
  >
}

export type NotificationTypeDefinition<
  TSlug extends string = string,
  TSections extends readonly NotificationSectionDefinition[] = readonly NotificationSectionDefinition[],
  TFormSchema extends z.ZodTypeAny = z.ZodTypeAny,
  TDraftFormSchema extends z.ZodTypeAny = TFormSchema,
> = {
  id: number
  slug: TSlug
  label: string
  description: string
  sections: TSections
  defaultValues: NotificationFormDefaults<TSections>
  formSchema: TFormSchema
  draftFormSchema: TDraftFormSchema
}

function buildSectionShape<TSections extends readonly NotificationSectionDefinition[]>(
  sections: TSections
) {
  const shape: Record<string, z.ZodTypeAny> = {}

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      shape[field.name] = field.schema
    })
  })

  return shape as unknown as NotificationSectionShape<TSections>
}

export function buildNotificationFormSchema<
  TSections extends readonly NotificationSectionDefinition[],
>(sections: TSections) {
  return z.object(buildSectionShape(sections))
}

export function buildNotificationFormDefaults<
  TSections extends readonly NotificationSectionDefinition[],
>(sections: TSections) {
  const defaults: Record<string, unknown> = {}

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      defaults[field.name] = field.defaultValue
    })
  })

  return defaults as NotificationFormDefaults<TSections>
}

export function defineNotificationType<
  const TSlug extends string,
  const TSections extends readonly NotificationSectionDefinition[],
  TFormSchema extends z.ZodTypeAny = z.ZodObject<
    NotificationSectionShape<TSections>
  >,
  TDraftFormSchema extends z.ZodTypeAny = TFormSchema,
>({
  id,
  slug,
  label,
  description,
  sections,
  buildFormSchema,
  buildDraftFormSchema,
}: {
  id: number
  slug: TSlug
  label: string
  description: string
  sections: TSections
  buildFormSchema?: (
    baseSchema: z.ZodObject<NotificationSectionShape<TSections>>
  ) => TFormSchema
  buildDraftFormSchema?: (
    baseSchema: z.ZodObject<NotificationSectionShape<TSections>>
  ) => TDraftFormSchema
}) {
  const baseSchema = buildNotificationFormSchema(sections)
  const draftFormSchema = buildDraftFormSchema
    ? buildDraftFormSchema(baseSchema)
    : (baseSchema as unknown as TDraftFormSchema)
  const formSchema = buildFormSchema
    ? buildFormSchema(baseSchema)
    : (draftFormSchema as unknown as TFormSchema)

  return {
    id,
    slug,
    label,
    description,
    sections,
    defaultValues: buildNotificationFormDefaults(sections),
    formSchema,
    draftFormSchema,
  } satisfies NotificationTypeDefinition<
    TSlug,
    TSections,
    TFormSchema,
    TDraftFormSchema
  >
}

export const yesNoUnknownOptions = [
  { label: "Sim", value: "yes" },
  { label: "Nao", value: "no" },
  { label: "Ignorado", value: "unknown" },
] satisfies NotificationFieldOption[]

export const sexOptions = [
  { label: "Feminino", value: "female" },
  { label: "Masculino", value: "male" },
  { label: "Outro", value: "other" },
  { label: "Ignorado", value: "unknown" },
] satisfies NotificationFieldOption[]

export const raceColorOptions = [
  { label: "Branca", value: "white" },
  { label: "Preta", value: "black" },
  { label: "Parda", value: "brown" },
  { label: "Amarela", value: "yellow" },
  { label: "Indigena", value: "indigenous" },
  { label: "Ignorado", value: "unknown" },
] satisfies NotificationFieldOption[]

export const educationLevelOptions = [
  { label: "Sem escolaridade", value: "none" },
  { label: "Fundamental incompleto", value: "elementary_incomplete" },
  { label: "Fundamental completo", value: "elementary_complete" },
  { label: "Medio completo", value: "high_school_complete" },
  { label: "Superior completo", value: "college_complete" },
  { label: "Ignorado", value: "unknown" },
] satisfies NotificationFieldOption[]

export const screeningTestOptions = [
  { label: "Positivo", value: "positive" },
  { label: "Negativo", value: "negative" },
  { label: "Inconclusivo", value: "inconclusive" },
] satisfies NotificationFieldOption[]

export const ministryProtocolOptions = [
  { label: "Confirmado", value: "confirmed" },
  { label: "Em investigacao", value: "under_investigation" },
  { label: "Nao confirmado", value: "not_confirmed" },
] satisfies NotificationFieldOption[]

export const healthOutcomeOptions = [
  { label: "Estavel", value: "stable" },
  { label: "Com complicacoes", value: "complications" },
  { label: "Obito", value: "death" },
] satisfies NotificationFieldOption[]

export const accidentTypeOptions = [
  { label: "Serpente", value: "snake" },
  { label: "Aranha", value: "spider" },
  { label: "Escorpiao", value: "scorpion" },
  { label: "Lagarta", value: "caterpillar" },
  { label: "Abelha", value: "bee" },
  { label: "Outro", value: "other" },
] satisfies NotificationFieldOption[]

export const caseClassificationOptions = [
  { label: "Leve", value: "mild" },
  { label: "Moderado", value: "moderate" },
  { label: "Grave", value: "severe" },
] satisfies NotificationFieldOption[]

export const finalDiagnosisOptions = [
  { label: "Curado", value: "cured" },
  { label: "Obito pelo agravo", value: "death_from_event" },
  { label: "Obito por outra causa", value: "death_other_cause" },
  { label: "Outro desfecho", value: "other" },
] satisfies NotificationFieldOption[]
