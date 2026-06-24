import { z } from "zod"

import {
  educationLevelOptions,
  raceColorOptions,
  sexOptions,
  yesNoUnknownOptions,
  accidentTypeOptions,
  defineNotificationType,
  type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared"

const optionalTextSchema = z.string().optional()

const timeToCareHoursDraftSchema = z
  .number({ error: "Informe o tempo ate o atendimento" })
  .min(0, "Tempo inválido")
  .optional()

const timeToCareHoursSchema = z
  .number({ error: "Informe o tempo ate o atendimento" })
  .min(0, "Tempo inválido")

const antivenomAmpoulesSchema = z
  .number({ error: "Número de ampolas inválido" })
  .int("Use um número inteiro de ampolas")
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
        "Informe o número de ampolas quando houver soro ou o caso for grave",
    })
  }
}


// -----------------------------------------------------------------------------
// 1. DADOS GERAIS (Campos 1 a 7)
// -----------------------------------------------------------------------------
const generalSection = {
    id: "general",
    title: "Dados Gerais",
    description: "Informações básicas da notificação e unidade de saúde. [cite: 6]",
    columns: 3,
    fields: [
        {
            name: "tp_notification",
            label: "Tipo de Notificação",
            kind: "select",
            schema: z.string(),
            defaultValue: "2",
            options: [{ label: "2 - Individual", value: "2" }],
        },
        {
            name: "dt_notification",
            label: "Data da Notificação",
            kind: "date",
            schema: z.string().min(1, "Data obrigatória"),
            defaultValue: "",
        },
        {
            name: "uf_notification",
            label: "UF de Notificação",
            kind: "text",
            schema: z.string().min(2, "UF obrigatória"),
            defaultValue: "",
        },
        {
            name: "city_notification",
            label: "Município de Notificação",
            kind: "text",
            schema: z.string().min(1, "Município obrigatório"),
            defaultValue: "",
        },
        {
            name: "health_unit_name",
            label: "Unidade de Saúde (ou outra fonte notificadora)",
            kind: "text",
            schema: z.string().min(1, "Unidade obrigatória"),
            defaultValue: "",
        },
        {
            name: "dt_first_symptoms",
            label: "Data dos Primeiros Sintomas",
            kind: "date",
            schema: z.string().min(1, "Data obrigatória"),
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 2. DADOS DO PACIENTE (Campos 8 a 16)
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Dados do Paciente",
    description: "Identificação e dados sociodemográficos da Notificação Individual. [cite: 5]",
    columns: 3,
    fields: [
        {
            name: "patient_name",
            label: "Nome do Paciente",
            kind: "text",
            schema: z.string().min(3, "Nome obrigatório"),
            defaultValue: "",
        },
        {
            name: "patient_birth_date",
            label: "Data de Nascimento",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "patient_age",
            label: "Idade (com código da unidade)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "sex",
            label: "Sexo",
            kind: "select",
            schema: z.string().min(1, "Sexo obrigatório"),
            defaultValue: "",
            options: sexOptions,
        },
        {
            name: "pregnant",
            label: "Gestante",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "6",
            options: [
                { label: "1 - 1º Trimestre", value: "1" },
                { label: "2 - 2º Trimestre", value: "2" },
                { label: "3 - 3º Trimestre", value: "3" },
                { label: "4 - Idade gestacional ignorada", value: "4" },
                { label: "5 - Não", value: "5" },
                { label: "6 - Não se aplica", value: "6" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        {
            name: "race_color",
            label: "Raça/Cor",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: raceColorOptions,
        },
        {
            name: "education_level",
            label: "Escolaridade",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: educationLevelOptions,
        },
        {
            name: "sus_card_number",
            label: "Número do Cartão SUS",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "mother_name",
            label: "Nome da mãe",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 3. DADOS DE RESIDÊNCIA (Campos 17 a 30)
// -----------------------------------------------------------------------------
const residenceSection = {
    id: "residence",
    title: "Dados de Residência",
    description: "Informações de endereço de residência do paciente. [cite: 4]",
    columns: 3,
    fields: [
        {
            name: "residence_state",
            label: "UF",
            kind: "text",
            schema: z.string().min(2, "UF obrigatória"),
            defaultValue: "",
        },
        {
            name: "residence_city",
            label: "Município de Residência",
            kind: "text",
            schema: z.string().min(1, "Município obrigatório"),
            defaultValue: "",
        },
        {
            name: "residence_district",
            label: "Distrito",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_neighborhood",
            label: "Bairro",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_street",
            label: "Logradouro (rua, avenida,...)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_number",
            label: "Número",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_complement",
            label: "Complemento (apto., casa, ...)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_geo1",
            label: "Geo campo 1",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_geo2",
            label: "Geo campo 2",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_reference",
            label: "Ponto de Referência",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_cep",
            label: "CEP",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_phone",
            label: "(DDD) Telefone",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_zone",
            label: "Zona",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Urbana", value: "1" },
                { label: "2 - Rural", value: "2" },
                { label: "3 - Periurbana", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        {
            name: "residence_country",
            label: "País (se residente fora do Brasil)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// Dados Complementares do Caso
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 4. Antecedentes Epidemiológicos (Campos 31 a 39)
// -----------------------------------------------------------------------------

const investigationInfoSection = {
    id: "investigation_info",
    title: "Antecedentes Epidemiológicos",
    description: "Informações sobre a investigação do acidente",
    columns: 3,
    fields: [
    {
      name: "dt_investigation",
      label: "Data da Investigação",
      kind: "date",
      schema: z.string().min(1, "Data obrigatória"),
      defaultValue: "",
    },
    {
      name: "occupation",
      label: "Ocupação",
      kind: "text",
      schema: z.string().min(2, "UF obrigatória"),
      defaultValue: "",
    },
    {
      name: "dt_accident",
      label: "Data do Acidente",
      kind: "date",
      schema: z.string().min(1, "Data obrigatória"),
      defaultValue: "",
    },
    {
      name: "state_accident",
      label: "UF do Acidente",
      kind: "text",
      schema: z.string().min(2, "UF obrigatória"),
      defaultValue: "",
    },
    {
      name: "city_accident",
      label: "Município de Ocorrênciado Acidente",
      kind: "text",
      schema: z.string().min(1, "Município obrigatório"),
      defaultValue: "",
    },
    {
      name: "local_accident",
      label: "Localidade de Ocorrência doAcidente",
      kind: "text",
      schema: z.string().min(1, "Localidade obrigatória"),
      defaultValue: "",
    },
    {
      name: "zone_accident",
      label: "Zona de Ocorrência",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "9",
      options: [
        { label: "1 - Urbana", value: "1" },
        { label: "2 - Rural", value: "2" },
        { label: "3 - Periurbana", value: "3" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    {
      name: "time_to_care_hours",
      label: "Tempo Decorrido Picada/Atendimento(horas)", //Tempo ate o atendimento 
      kind: "number",
      schema: timeToCareHoursDraftSchema,
      defaultValue: undefined,
    },
    {
      name: "local_bite",
      label: "Local da Picada",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "99",
      options: [
        { label: "01 - Cabeça", value: "1" },
        { label: "02 - Braço", value: "2" },
        { label: "03 - Ante-Braço", value: "3" },
        { label: "04 - Mão", value: "4" },
        { label: "05 - Dedo da Mão", value: "5" },
        { label: "06 - Tronco", value: "6" },
        { label: "07 - Coxa", value: "7" },
        { label: "08 - Perna", value: "8" },
        { label: "09 - Pé", value: "9" },
        { label: "10 - Dedo do Pé", value: "10" },
        { label: "99 - Ignorado", value: "99" },
      ],
    },
  ],  
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. Dados Clínicos (Campos 40 a 44)
// ----------------------------------------------------------------------------- 

const clinicalDataSection = {
id: "accident",
    title: "Dados do Acidente",
    description: "Informações sobre o acidente",
    columns: 3,
    fields: [
    {
      name: "local_manif",
      label: "Manifestações Locais",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "pain_local",
      label: "Manifestações Locais: Dor",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "edema_local",
      label: "Manifestações Locais: Edema",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "ecchymosis_local",
      label: "Manifestações Locais: Equimose",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "necrosis_local",
      label: "Manifestações Locais: Necrose",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "other_local",
      label: "Manifestações Locais: Outras",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "sist_manif",
      label: "Manifestações Sistêmicas",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "neuroparalytics",
      label: "Manifestações Sistêmicas: neuroparalíticas (ptosepalpebral, turvação visual)",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "myolitic",
      label: "Manifestações Sistêmicas: miolíticas/hemolíticas (mialgia,anemia, urina escura)",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "hemorrhagic",
      label: "Manifestações Sistêmicas: hemorrágicas (gengivorragia,outros sangramentos)",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "kidney",
      label: "Manifestações Sistêmicas: renais (oligúria/anúria)",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "vagal",
      label: "Manifestações Sistêmicas: vagais (vômitos,diarréias)",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "manif_sist_other",
      label: "Manifestações Sistêmicas: Outras (Espec.)",
      kind: "text",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
    },
    {
      name: "coag_time",
      label: "Tempo de Coagulação",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "9",
      options: [
        { label: "1 - Normal", value: "1" },
        { label: "2 - Alterado", value: "2" },
        { label: "9 - Não realizado", value: "9" },
      ],
    },
  ], 
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. Dados do Acidente (Campos 45 a 48)
// ----------------------------------------------------------------------------- 

const accidentDataSection = {
    id: "accident_info",
    title: "Dados do Acidente",
    description: "Informações sobre o acidente",
    columns: 3,
    fields: [
    {
      name: "accident_type",
      label: "Tipo de acidente",
      kind: "select",
      schema: z.string().min(1, "Tipo de acidente obrigatório"),
      defaultValue: "",
      options: accidentTypeOptions,
    },
    {
      name: "snake_type",
      label: "Serpente - Tipo de Acidente",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "9",
      options: [
        { label: "1 - Botrópico", value: "1" },
        { label: "2 - Crotálico", value: "2" },
        { label: "3 - Elapídico", value: "3" },
        { label: "4 - Laquético", value: "4" },
        { label: "5 -Serpente Não Peçonhenta", value: "5" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    {
      name: "spider_type",
      label: "Serpente - Tipo de Acidente",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "9",
      options: [
        { label: "1 - Foneutrismo", value: "1" },
        { label: "2 - Loxoscelismo", value: "2" },
        { label: "3 - Latrodectismo", value: "3" },
        { label: "4 - Outra Aranha", value: "4" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    {
      name: "caterpillar_type",
      label: "Serpente - Tipo de Acidente",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "9",
      options: [
        { label: "1 - Lonomia", value: "1" },
        { label: "2 - Outra lagarta", value: "2" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. Tratamento (Campos 49 a 55)
// ----------------------------------------------------------------------------- 

const treatmentSection = {
    id: "treatment_info",
    title: "Dados do Tratamento",
    description: "Informações sobre o tratamento",
    columns: 3,
    fields: [
    {
      name: "classif_case",
      label: "Classificação do Caso",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "9",
      options: [
        { label: "1 - Leve", value: "1" },
        { label: "2 - Moderado", value: "2" },
        { label: "3 - Grave", value: "3" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    {
      name: "serotherapy",
      label: "Soroterapia",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "antivenom_ampoules",
      label: "Número de ampolas",
      kind: "number",
      schema: antivenomAmpoulesSchema,
      defaultValue: undefined,
    },
    {
      name: "local_complications",
      label: "Complicacoes locais",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "secondary_infection",
      label: "Complicações Locais: Infecção Secundária",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "extensive_necrosis",
      label: "Complicações Locais: Necrose Extensa",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "compartment_syndrome",
      label: "Complicações Locais: Síndrome Compartimental",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "functional_deficit",
      label: "Complicações Locais: Déficit Funcional",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "amputation",
      label: "Complicações Locais: Amputação",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "systemic_complications",
      label: "Complicacoes sistemicas",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "kidney_failure",
      label: "Insuficiência Renal",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "respiratory_failure",
      label: "Insuficiência Respiratória /Edema Pulmonar Agudo",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "septicemia",
      label: "Septicemia",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "shock",
      label: "Choque",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. Tratamento (Campos 56 a 59)
// ----------------------------------------------------------------------------- 

const conclusionSection = {
  id: "conclusion_info",
    title: "Conclusão",
    description: "Conclusão do Caso",
    columns: 3,
    fields: [
    {
      name: "work_accident",
      label: "Acidente Relacionadoao Trabalho",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "case_evolution",
      label: "Evolução do Caso",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatório"),
      defaultValue: "9",
      options: [
        { label: "1 - Cura", value: "1" },
        { label: "2 - Óbito por acidentes por animais peçonhentos", value: "2" },
        { label: "3 - Óbito por outras causas", value: "3" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    {
      name: "death_date",
      label: "Data do Óbito",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "end_date",
      label: "Data do Encerramento",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "complementar_info",
      label: "Informações complementares e observações",
      kind: "textarea",
      schema: optionalTextSchema,
      defaultValue: "",
      fullWidth: true,
    },
  ],
} satisfies NotificationSectionDefinition;

  const sections = [
      patientSection,
      residenceSection,
      generalSection,
      investigationInfoSection,
      clinicalDataSection,
      accidentDataSection,
      treatmentSection,
      conclusionSection,
    ] as const satisfies readonly NotificationSectionDefinition[];

export const venomousAnimalNotificationDefinition = defineNotificationType({
  id: 2,
  slug: "venomous_animal",
  label: "Acidente por Animal Peçonhento",
  description:
    "Formulário com dados do acidente, manifestações clínicas, tratamento e evolução.",
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
