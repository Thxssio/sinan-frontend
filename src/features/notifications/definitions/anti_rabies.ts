import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    yesNoUnknownOptions,
    woundsOptions,
    animalConditionOptions,
    animalSpeciesOptions,
    type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared"

const optionalTextSchema = z.string().optional();

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

// 32 -Tipo de Exposição ao Vírus Rábico
const exposureTypeSection = {
    id: "exposure_type",
    title: "Tipo de Exposição ao Vírus Rábico",
    description: "Tipo de contatos que levaram a exposição ao vírus rábico.",
    columns: 3,
    fields: [
        {
            name: "st_indirect_contact",
            label: "Contato Indireto",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown", //opção ignorado
            options: yesNoUnknownOptions,
        },
        {
            name: "st_scrath",
            label: "Arranhadura",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
                {
            name: "st_licking",
            label: "Lambedura",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
                {
            name: "st_bite",
            label: "Mordedura",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue:"unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_other",
            label: "Outro",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],
} satisfies NotificationSectionDefinition;

// 33
const locationSection = {
    id: "location",
    title: "Localização",
    description: "Local do corpo que ocorreu o contato",
    columns: 3,
    fields: [
        {
            name: "st_mucosa",
            label: "Mucosa",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_head_neck",
            label: "Cabeça/Pescoço",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_hand_feet",
            label: "Mãos/Pés",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_trunk",
            label: "Tronco",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_upper_extremities",
            label: "Membros Superiores",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_lower_extremities",
            label: "Membros Inferiores",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],
} satisfies NotificationSectionDefinition;

const woundSection = {
    id: "Wound",
    title: "Ferimento",
    description: "Tipo de Ferimento",
    columns: 3,
    fields: [
        {
            name: "st_wound", // 34
            label: "Ferimento",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: woundsOptions,
        },
        // 35
        {
            name: "st_deep_wound",
            label: "Ferimento Profundo",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {   
            name: "st_superficial_wound",
            label: "Ferimento Superficial",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {   
            name: "st_avulsion_wound",
            label: "Ferimento Dilacerante",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],

} satisfies NotificationSectionDefinition;

const treatmentSection = {
    id: "treatment",
    title: "Conduta e Tratamento Atual",
    description: "Histórico de tratamentos e tratamento profilático indicado no atendimento.",
    columns: 2,
    fields: [
      {
        //37
        name: "previous_treatment",
        label: "Antecedentes de Tratamento Anti-Rábico?",
        kind: "select",
        schema: z.string().min(1, "Campo obrigatório"),
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
      {
        // 43 
        name: "indicated_treatment",
        label: "Tratamento Indicado",
        kind: "select",
        schema: z.string().min(1, "Tratamento indicado obrigatório"),
        defaultValue: "",
        options: [
                { label: "1 - Pré Exposição", value: "1" },
                { label: "2 - Dispensa de Tratamento", value: "2" },
                { label: "3 - Observação do animal (se cão ou gato)", value: "3" },
                { label: "4 - Observação + Vacina", value: "4"},
                { label: "5 - Vacina", value: "5"},
                { label: "6 - Soro + Vacina", value: "6" },
                { label: "7 - Esquema de Reexposição", value: "7" }, 
        ], 
      },
      {
        // 53
        name: "serum_indicated",
        label: "Indicação do Soro Anti-Rábico?",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
      {
        // 59
        name: "adverse_event",
        label: "Evento Adverso à Vacina/Soro",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
    ],
} satisfies NotificationSectionDefinition;

const animalAgressorSection = {
    id: "animal_aggressor",
    title: "Animal Agressor",
    description: "Informações sobre o animal envolvido na exposição.",
    columns: 2,
    fields: [
      {
        // 40
        name: "animal_species",
        label: "Espécie do Animal Agressor",
        kind: "select",
        schema: z.string().min(1, "Espécie obrigatória"),
        defaultValue: "",
        options: animalSpeciesOptions,
      },
      {
        //41
        name: "animal_condition",
        label: "Condição do Animal",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: animalConditionOptions,
      },
      {
        //42
        name: "observable_animal",
        label: "Animal Passível de Observação?",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
      {
        //48
        name: "pos_observable_animal",
        label: "Condição Final do Animal (após período de observação)",
        kind: "select",
        schema: z.string().min(1, "Obrigatorio"),
        defaultValue: "9",
        options: [
                { label: "1 - Negativo para Raiva (Clínica)", value: "1" },
                { label: "2 - Negativo para Raiva (Laboratório)", value: "2" },
                { label: "3 - Positivo para Raiva(Clínica)", value: "3" },
                { label: "4 - Positivo para Raiva (Laboratório)", value: "4"},
                { label: "5 - Morto/ Sacrificado/ Sem Diagnóstico", value: "5"},
                { label: "9 - Ignorado", value: "9" },
        ], 
      }
    ],
} satisfies NotificationSectionDefinition;

const sections = [
    generalSection,
    patientSection,
    exposureTypeSection,
    residenceSection,
    woundSection,
    treatmentSection,
    animalAgressorSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const antiRabiesNotificationDefinition = defineNotificationType({
    id: 10,
    slug: "anti_rabies",
    label: "Atendimento Antirrábico",
    description: "Notificação de atendimento antirrábico humano após exposição ao vírus rábico.",
    sections,
});
