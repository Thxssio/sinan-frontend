import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    timeUnitOptions,
    yesNoOptions,
    yesNoUnknownOptions,
    type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared";

const optionalTextSchema = z.string().optional();

// -----------------------------------------------------------------------------
// 1. DADOS DO PACIENTE
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Dados do Paciente",
    description: "Capture o retrato do paciente na notificacao, mesmo quando ele ja existe no cadastro geral.",
    columns: 3,
    fields: [
        {
            name: "patient_name",
            label: "Nome",
            kind: "text",
            schema: z.string().min(3, "Nome obrigatório"),
            defaultValue: "",
        },
        {
            name: "patient_cpf",
            label: "CPF",
            kind: "text",
            schema: z.string().min(11, "CPF obrigatório"),
            defaultValue: "",
        },
        {
            name: "patient_birth_date",
            label: "Data de nascimento",
            kind: "date",
            schema: z.string().min(1, "Data de nascimento obrigatória"),
            defaultValue: "",
        },
        {
            name: "patient_age_unit",
            label: "Idade (Unidade)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: timeUnitOptions,
        },
        {
            name: "patient_age_value",
            label: "Idade (Valor)",
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
            schema: z.string().min(1, "Raça/Cor obrigatória"),
            defaultValue: "unknown",
            options: raceColorOptions,
        },
        {
            name: "education_level",
            label: "Escolaridade",
            kind: "select",
            schema: z.string().min(1, "Escolaridade obrigatória"),
            defaultValue: "unknown",
            options: [
                ...educationLevelOptions,
                { label: "Não se aplica", value: "not_applicable" }
            ],
        },
        {
            name: "sus_card_number",
            label: "Cartão SUS",
            kind: "text",
            schema: z.string().min(1, "Cartão SUS obrigatório"),
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
// 2. DADOS DE RESIDÊNCIA
// -----------------------------------------------------------------------------
const residenceSection = {
    id: "residence",
    title: "Dados de Residência",
    description: "Informações de endereço de residência do paciente.",
    columns: 3,
    fields: [
        { name: "residence_state", label: "UF", kind: "text", schema: z.string().min(2, "UF obrigatória"), defaultValue: "" },
        { name: "residence_city", label: "Município de Residência", kind: "text", schema: z.string().min(1, "Município obrigatório"), defaultValue: "" },
        { name: "residence_district", label: "Distrito", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_neighborhood", label: "Bairro", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_street", label: "Logradouro (rua, avenida,...)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_number", label: "Número", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_complement", label: "Complemento (apto., casa, ...)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_geo1", label: "Geo campo 1", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_geo2", label: "Geo campo 2", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_reference", label: "Ponto de Referência", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_cep", label: "CEP", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_phone", label: "(DDD) Telefone", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "residence_zone",
            label: "Zona",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Urbana", value: "1" },
                { label: "2 - Rural", value: "2" },
                { label: "3 - Urbana/Rural", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        { name: "residence_country", label: "País (se residente fora do Brasil)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 3. DADOS CLÍNICOS E COMPLEMENTARES
// -----------------------------------------------------------------------------
const clinicalSection = {
    id: "clinical",
    title: "Dados Complementares do Caso / Sinais e Sintomas",
    description: "Informações clínicas e sinais apresentados pelo paciente.",
    columns: 3,
    fields: [
        { name: "symptom_vomiting", label: "Vômitos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "vomiting_episodes", label: "Vômitos - N.º de episódios/24 horas", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "vomiting_duration", label: "Vômitos - Duração (dias)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "symptom_fever", label: "Febre", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "fever_temperature", label: "Febre - Temperatura °C", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "symptom_diarrhea", label: "Diarréia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "diarrhea_episodes", label: "Diarréia - N.º de episódios/24 horas", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "diarrhea_duration", label: "Diarréia - Duração (dias)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "blood_in_stool", label: "Presença de sangue nas fezes", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "breastfeeding", label: "Aleitamento materno", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "breastfeeding_type",
            label: "Se sim (Tipo)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Exclusivo", value: "1" },
                { label: "2 - Misto", value: "2" }
            ]
        },
        { name: "breastfeeding_duration", label: "Até quando? Mês(es)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. ANTECEDENTES VACINAIS
// -----------------------------------------------------------------------------
const vaccinationSection = {
    id: "vaccination",
    title: "Antecedentes Vacinais",
    description: "Informações sobre vacinação do paciente contra rotavírus.",
    columns: 3,
    fields: [
        { name: "rotavirus_vaccine", label: "Vacina contra Rotavírus", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "dt_dose_1", label: "1ª dose - Data da aplicação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "lot_dose_1", label: "1ª dose - Lote", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "lab_dose_1", label: "1ª dose - Laboratório produtor", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "dt_dose_2", label: "2ª dose - Data da aplicação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "lot_dose_2", label: "2ª dose - Lote", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "lab_dose_2", label: "2ª dose - Laboratório produtor", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "vop_same_day", label: "A vacina VOP foi administrada no mesmo dia da vacina contra rotavírus?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_last_vop", label: "Data da última dose de VOP", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. DADOS DO LABORATÓRIO
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados do Laboratório",
    description: "Informações de amostras e exames laboratoriais.",
    columns: 3,
    fields: [
        { name: "dt_stool_sample", label: "Data da coleta da amostra de fezes", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "rotavirus_identified", label: "Rotavírus identificado na amostra", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "genotype_g", label: "Qual foi o genótipo G:", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "genotype_p", label: "Qual foi o genótipo P:", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "other_virus", label: "Outro vírus identificado na amostra", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "which_virus", label: "Se sim, qual", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "bacteria_identified", label: "Bactéria identificada na amostra", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "which_bacteria", label: "Se sim, qual bactéria", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "parasite_identified", label: "Parasita identificado na amostra", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "which_parasite", label: "Se sim, qual parasita", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "medication_used", label: "Uso de medicamentos antes da coleta", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "which_medication", label: "Se sim, qual?", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "dt_sent_to_lacen", label: "Data do envio da amostra ao LACEN", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "adequate_sample", label: "Acondicionamento da amostra adequada", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final e encerramento do caso.",
    columns: 3,
    fields: [
        {
            name: "final_classification",
            label: "Classificação Final",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Confirmado", value: "1" },
                { label: "2 - Descartado", value: "2" },
            ]
        },
        {
            name: "confirmation_criterion",
            label: "Critério de Confirmação/Descarte",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Laboratorial", value: "1" },
                { label: "2 - Clínico-epidemiológico", value: "2" },
                { label: "3 - Clínico", value: "3" },
            ]
        },
        {
            name: "isolated_case",
            label: "Diarréia por rotavírus: Caso isolado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: yesNoOptions,
        },
        {
            name: "outbreak_location",
            label: "Se surto sim, local",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "case_evolution",
            label: "Evolução",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Cura", value: "1" },
                { label: "2 - Óbito por Rotavírus", value: "2" },
                { label: "3 - Óbito por outras causas", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "dt_death", label: "Data do Óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_closing", label: "Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },

    ]
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    clinicalSection,
    vaccinationSection,
    laboratorySection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const rotavirusNotificationDefinition = defineNotificationType({
    id: 17,
    slug: "rotavirus",
    label: "Rotavírus",
    description: `Ficha de investigação para Rotavírus. Definição de caso suspeito: Criança menor de cinco anos, com diagnóstico de Doença Diarreica Aguda, que tenha recebido soro de reidratação por via endovenosa, independente do estado vacinal.`,
    sections,
});