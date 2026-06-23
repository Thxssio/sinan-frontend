import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    timeUnitOptions,
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
    description: "Capture o retrato do paciente na notificação, mesmo quando ele já existe no cadastro geral.",
    columns: 3,
    fields: [
        { name: "patient_name", label: "Nome", kind: "text", schema: z.string().min(3, "Nome obrigatório"), defaultValue: "" },
        { name: "patient_cpf", label: "CPF", kind: "text", schema: z.string().min(11, "CPF obrigatório"), defaultValue: "" },
        { name: "patient_birth_date", label: "Data de nascimento", kind: "date", schema: z.string().min(1, "Data de nascimento obrigatória"), defaultValue: "" },
        { name: "patient_age_unit", label: "Idade (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "patient_age_value", label: "Idade (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "sex", label: "Sexo", kind: "select", schema: z.string().min(1, "Sexo obrigatório"), defaultValue: "", options: sexOptions },
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
        { name: "race_color", label: "Raça/Cor", kind: "select", schema: z.string().min(1, "Raça/Cor obrigatória"), defaultValue: "unknown", options: raceColorOptions },
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
        { name: "sus_card_number", label: "Cartão SUS", kind: "text", schema: z.string().min(1, "Cartão SUS obrigatório"), defaultValue: "" },
        { name: "mother_name", label: "Nome da mãe", kind: "text", schema: optionalTextSchema, defaultValue: "" },
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
                { label: "3 - Periurbana", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        { name: "residence_country", label: "País (se residente fora do Brasil)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 3. DADOS CLÍNICOS E EPIDEMIOLÓGICOS
// -----------------------------------------------------------------------------
const clinicalEpidemiologicalSection = {
    id: "clinical_epidemiological",
    title: "Dados Clínicos Epidemiológicos",
    description: "Sintomatologia e dados de investigação da Peste.",
    columns: 3,
    fields: [
        { name: "dt_first_symptoms", label: "Data dos Primeiros Sintomas", kind: "date", schema: z.string().min(1, "Data dos primeiros sintomas é obrigatória"), defaultValue: "" },
        { name: "dt_investigation", label: "Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "risk_conditions", label: "A ocorrência cumpre condições básicas de risco?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "epi_events_associated", label: "O Caso está associado a eventos positivos de importância epidemiológica para Peste?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "compatible_symptoms", label: "Os Sinais e Sintomas são compatíveis com a definição de caso?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Sintomatologia Específica
        { name: "symp_ganglionar", label: "Sintomatologia Específica: Ganglionar", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_pulmonary", label: "Sintomatologia Específica: Pulmonar", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. DADOS DO LABORATÓRIO
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados do Laboratório",
    description: "Resultados de exames bacteriológicos e sorológicos.",
    columns: 3,
    fields: [
        // Exame Bacteriológico
        {
            name: "bacteriological_blood_culture",
            label: "Hemocultura",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "4",
            options: [
                { label: "1 - Positivo", value: "1" },
                { label: "2 - Negativo", value: "2" },
                { label: "3 - Inconclusivo", value: "3" },
                { label: "4 - Não Realizado", value: "4" },
            ]
        },
        {
            name: "bacteriological_direct_smear",
            label: "Esfregaço Direto",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "4",
            options: [
                { label: "1 - Positivo", value: "1" },
                { label: "2 - Negativo", value: "2" },
                { label: "3 - Inconclusivo", value: "3" },
                { label: "4 - Não Realizado", value: "4" },
            ]
        },

        { name: "dt_collection_s1", label: "Data da coleta S1", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_collection_s2", label: "Data da coleta S2", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        // Sorologia para ELISA
        {
            name: "elisa_s1",
            label: "Resultado ELISA S1",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "4",
            options: [
                { label: "1 - Reagente", value: "1" },
                { label: "2 - Não-Reagente", value: "2" },
                { label: "3 - Inconclusivo", value: "3" },
                { label: "4 - Não Realizado", value: "4" },
            ]
        },
        {
            name: "elisa_s2",
            label: "Resultado ELISA S2",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "4",
            options: [
                { label: "1 - Reagente", value: "1" },
                { label: "2 - Não-Reagente", value: "2" },
                { label: "3 - Inconclusivo", value: "3" },
                { label: "4 - Não Realizado", value: "4" },
            ]
        },

        // Hemoaglutinação
        {
            name: "hemagglutination_result",
            label: "Resultado da Hemoaglutinação",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "4",
            options: [
                { label: "1 - Reagente", value: "1" },
                { label: "2 - Não-Reagente", value: "2" },
                { label: "3 - Inconclusivo", value: "3" },
                { label: "4 - Não Realizado", value: "4" },
            ]
        },
        { name: "hemagglutination_igm_titers", label: "Títulos IgM (Ex: 1:___)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hemagglutination_igg_titers", label: "Títulos IgG (Ex: 1:___)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Encerramento e classificação final do caso de Peste.",
    columns: 3,
    fields: [
        { name: "case_treated", label: "Caso Tratado?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "focal_control", label: "Instituído Controle Focal?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

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
                { label: "1 - Laboratório", value: "1" },
                { label: "2 - Clínico-Epidemiológico", value: "2" },
                { label: "3 - Clínico", value: "3" },
            ]
        },
        {
            name: "clinical_form",
            label: "Classificação da Forma Clínica",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Forma Bubônica", value: "1" },
                { label: "2 - Forma Pneumônica", value: "2" },
                { label: "3 - Septicêmica", value: "3" },
                { label: "4 - Outra", value: "4" },
            ]
        },
        {
            name: "severity",
            label: "Gravidade",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Benigno/Ambulatorial", value: "1" },
                { label: "2 - Moderado", value: "2" },
                { label: "3 - Grave", value: "3" },
            ]
        },
        {
            name: "autochthonous",
            label: "O caso é autóctone do município de residência?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Indeterminado", value: "3" },
            ]
        },

        // Local Provável da Fonte de Infecção
        { name: "infection_uf", label: "UF (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_country", label: "País (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_city", label: "Município (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_district", label: "Distrito (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_neighborhood", label: "Bairro (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "work_related", label: "Doença Relacionada ao Trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "case_evolution",
            label: "Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Cura", value: "1" },
                { label: "2 - Óbito por peste", value: "2" },
                { label: "3 - Óbito por outras causas", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "dt_closing", label: "Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ]
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    clinicalEpidemiologicalSection,
    laboratorySection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const plagueNotificationDefinition = defineNotificationType({
    id: 19,
    slug: "plague",
    label: "Peste",
    description: `Ficha de investigação para Peste (CID10 A20.9). Caso suspeito: Paciente sintomático ganglionar ou respiratório com febre, oriundo de zonas ativas de ocorrência de peste.`,
    sections,
});