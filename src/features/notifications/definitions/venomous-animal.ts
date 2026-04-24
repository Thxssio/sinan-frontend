import { z } from "zod"

import {
  accidentTypeOptions,
  caseClassificationOptions,
  defineNotificationType,
  finalDiagnosisOptions,
  type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared"

const optionalTextSchema = z.string().optional()

const timeToCareHoursDraftSchema = z
  .number({ error: "Informe o tempo ate o atendimento" })
  .min(0, "Tempo invalido")
  .optional()

const timeToCareHoursSchema = z
  .number({ error: "Informe o tempo ate o atendimento" })
  .min(0, "Tempo invalido")

const antivenomAmpoulesSchema = z
  .number({ error: "Numero de ampolas invalido" })
  .int("Use um numero inteiro de ampolas")
  .positive("Quantidade de ampolas invalida")
  .optional()

function validateVenomousAnimalForm(
  values: Record<string, unknown>,
  ctx: z.RefinementCtx
) {
  const antivenomAdministered =
    typeof values.antivenom_administered === "string"
      ? values.antivenom_administered
      : ""
  const caseClassification =
    typeof values.case_classification === "string"
      ? values.case_classification
      : ""
  const antivenomAmpoules =
    typeof values.antivenom_ampoules === "number"
      ? values.antivenom_ampoules
      : undefined

  const requiresAmpoules =
    antivenomAdministered === "yes" || caseClassification === "severe"

  if (requiresAmpoules && !antivenomAmpoules) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["antivenom_ampoules"],
      message:
        "Informe o numero de ampolas quando houver soro ou o caso for grave",
    })
  }
}

const sections = [
  {
    id: "accident",
    title: "Dados do Acidente",
    description:
      "Caracterize o animal, o local do acidente e o tempo transcorrido ate o atendimento.",
    columns: 2,
    fields: [
      {
        name: "accident_type",
        label: "Tipo de acidente",
        kind: "select",
        schema: z.string().min(1, "Tipo de acidente obrigatorio"),
        defaultValue: "",
        options: accidentTypeOptions,
      },
      {
        name: "accident_location",
        label: "Local do acidente",
        kind: "text",
        schema: z.string().min(1, "Local do acidente obrigatorio"),
        defaultValue: "",
      },
      {
        name: "bite_site",
        label: "Regiao anatomica da picada",
        kind: "text",
        schema: z.string().min(1, "Local da picada obrigatorio"),
        defaultValue: "",
      },
      {
        name: "time_to_care_hours",
        label: "Tempo ate o atendimento (horas)",
        kind: "number",
        schema: timeToCareHoursDraftSchema,
        defaultValue: undefined,
      },
    ],
  },
  {
    id: "clinical",
    title: "Manifestacoes Clinicas",
    description:
      "Detalhe sintomas locais e sistemicos, soro antiveneno e classificacao do caso.",
    columns: 2,
    fields: [
      {
        name: "local_symptoms",
        label: "Sintomas locais",
        kind: "textarea",
        schema: z.string().min(1, "Descreva os sintomas locais"),
        defaultValue: "",
        fullWidth: true,
      },
      {
        name: "systemic_symptoms",
        label: "Sintomas sistemicos",
        kind: "textarea",
        schema: optionalTextSchema,
        defaultValue: "",
        fullWidth: true,
      },
      {
        name: "antivenom_administered",
        label: "Soro antiveneno administrado",
        kind: "select",
        schema: z.string().min(1, "Informe se houve soro"),
        defaultValue: "",
        options: [
          { label: "Sim", value: "yes" },
          { label: "Nao", value: "no" },
        ],
      },
      {
        name: "antivenom_ampoules",
        label: "Numero de ampolas",
        kind: "number",
        schema: antivenomAmpoulesSchema,
        defaultValue: undefined,
      },
      {
        name: "case_classification",
        label: "Classificacao do caso",
        kind: "select",
        schema: z.string().min(1, "Classificacao obrigatoria"),
        defaultValue: "",
        options: caseClassificationOptions,
      },
    ],
  },
  {
    id: "evolution",
    title: "Evolucao",
    description:
      "Consolide complicacoes observadas e o diagnostico final do acidente.",
    columns: 2,
    fields: [
      {
        name: "local_complications",
        label: "Complicacoes locais",
        kind: "textarea",
        schema: optionalTextSchema,
        defaultValue: "",
        fullWidth: true,
      },
      {
        name: "systemic_complications",
        label: "Complicacoes sistemicas",
        kind: "textarea",
        schema: optionalTextSchema,
        defaultValue: "",
        fullWidth: true,
      },
      {
        name: "final_diagnosis",
        label: "Diagnostico final",
        kind: "select",
        schema: z.string().min(1, "Diagnostico final obrigatorio"),
        defaultValue: "",
        options: finalDiagnosisOptions,
      },
      {
        name: "outcome_details",
        label: "Outras observacoes do desfecho",
        kind: "textarea",
        schema: optionalTextSchema,
        defaultValue: "",
        fullWidth: true,
      },
    ],
  },
] as const satisfies readonly NotificationSectionDefinition[]

export const venomousAnimalNotificationDefinition = defineNotificationType({
  id: 2,
  slug: "venomous_animal",
  label: "Acidente por animal peconhento",
  description:
    "Formulario com dados do acidente, manifestacoes clinicas, tratamento e evolucao.",
  sections,
  buildDraftFormSchema: (baseSchema) =>
    baseSchema.superRefine(validateVenomousAnimalForm),
  buildFormSchema: (baseSchema) =>
    baseSchema
      .extend({
        time_to_care_hours: timeToCareHoursSchema,
      })
      .superRefine(validateVenomousAnimalForm),
})
