import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    timeUnitOptions,
    smokingHabitOptions,
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
                { label: "4 - Idade gestacional Ignorada", value: "4" },
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
                { label: "3 - Periurbana", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        { name: "residence_country", label: "País (se residente fora do Brasil)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 3. DADOS COMPLEMENTARES DO CASO
// -----------------------------------------------------------------------------
const complementarySection = {
    id: "complementary",
    title: "Dados Complementares do Caso",
    description: "Informações sobre ocupação e mercado de trabalho.",
    columns: 3,
    fields: [
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "work_market_status",
            label: "Situação no Mercado de Trabalho",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "99",
            options: [
                { label: "01 - Empregado registrado com carteira assinada", value: "01" },
                { label: "02 - Empregado não registrado", value: "02" },
                { label: "03 - Autônomo/conta própria", value: "03" },
                { label: "04 - Servidor público estatuário", value: "04" },
                { label: "05 - Servidor público celetista", value: "05" },
                { label: "06 - Aposentado", value: "06" },
                { label: "07 - Desempregado", value: "07" },
                { label: "08 - Trabalho temporário", value: "08" },
                { label: "09 - Cooperativado", value: "09" },
                { label: "10 - Trabalhador avulso", value: "10" },
                { label: "11 - Empregador", value: "11" },
                { label: "12 - Outros", value: "12" },
                { label: "99 - Ignorado", value: "99" },
            ],
        },
        {
            name: "work_time_unit",
            label: "Tempo de Trabalho na Ocupação (Unidade)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: timeUnitOptions,
        },
        {
            name: "work_time_value",
            label: "Tempo de Trabalho na Ocupação (Valor)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. DADOS DA EMPRESA CONTRATANTE
// -----------------------------------------------------------------------------
const companySection = {
    id: "company",
    title: "Dados da Empresa Contratante",
    description: "Informações sobre a empresa onde o paciente trabalha.",
    columns: 3,
    fields: [
        { name: "company_cnpj_cpf", label: "Registro/CNPJ ou CPF", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_name", label: "Nome da Empresa ou Empregador", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_cnae", label: "Atividade Econômica (CNAE)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_state", label: "UF", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_city", label: "Município", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_district", label: "Distrito", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_neighborhood", label: "Bairro", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_address", label: "Endereço", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_number", label: "Número", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_reference", label: "Ponto de Referência", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_phone", label: "(DDD) Telefone", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "company_is_outsourced",
            label: "O Empregador é Empresa Terceirizada",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Não se aplica", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. ANTECEDENTES EPIDEMIOLÓGICOS E HÁBITOS
// -----------------------------------------------------------------------------
const epidemiologicalBackgroundSection = {
    id: "epidemiological_background",
    title: "Antecedentes Epidemiológicos e Hábitos",
    description: "Conclusão investigativa, exposição, diagnósticos e hábitos do paciente.",
    columns: 3,
    fields: [
        // Tempo de Exposição
        { name: "exposure_time_unit", label: "Tempo de Exposição ao Agente de Risco (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "exposure_time_value", label: "Tempo de Exposição ao Agente de Risco (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Regime de Tratamento
        {
            name: "treatment_regimen",
            label: "Regime de Tratamento",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Hospitalar", value: "1" },
                { label: "2 - Ambulatorial", value: "2" },
            ]
        },

        // Diagnóstico Específico
        { name: "specific_diagnosis", label: "Diagnóstico Específico", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "specific_diagnosis_cid10", label: "CID 10 Específico", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Hábitos
        { name: "smoking_habit", label: "Hábito de Fumar", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: smokingHabitOptions },
        { name: "tobacco_exposure_unit", label: "Tempo de Exposição ao tabaco (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "tobacco_exposure_value", label: "Tempo de Exposição ao tabaco (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Álcool e Drogas
        { name: "habit_alcohol", label: "Hábitos: Álcool", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "habit_psychoactive_drugs", label: "Hábitos: Drogas psicoativas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "habit_psychopharmaceuticals", label: "Hábitos: Psicofármacos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. CONDUTA E EVOLUÇÃO
// -----------------------------------------------------------------------------
const conductAndEvolutionSection = {
    id: "conduct_and_evolution",
    title: "Conduta e Evolução do Caso",
    description: "Conduta geral adotada, encaminhamentos e desfecho.",
    columns: 3,
    fields: [
        // Conduta Geral
        { name: "conduct_mental_wear_removal", label: "Conduta: Afastamento da situação de desgaste mental", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_work_org_change", label: "Conduta: Adoção de mudança na organização do trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_collective_protection", label: "Conduta: Adoção de proteção coletiva", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_workplace_removal", label: "Conduta: Afastamento do local de trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_individual_protection", label: "Conduta: Adoção de proteção individual", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_none", label: "Conduta: Nenhum", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_others", label: "Conduta: Outros", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

        // Investigação Adicional
        { name: "other_workers_same_disease", label: "Há ou houve outros trabalhadores com a mesma doença no local de trabalho?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Encaminhamento
        { name: "referred_to_caps", label: "O paciente foi encaminhado a um Centro de Atenção Psicossocial (CAPS) no SUS ou outro serviço especializado?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Evolução do Caso
        {
            name: "case_evolution",
            label: "Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Cura", value: "1" },
                { label: "2 - Cura não confirmada", value: "2" },
                { label: "3 - Incapacidade Temporária", value: "3" },
                { label: "4 - Incapacidade Permanente Parcial", value: "4" },
                { label: "5 - Incapacidade Permanente Total", value: "5" },
                { label: "6 - Óbito por doença relacionada ao trabalho", value: "6" },
                { label: "7 - Óbito por Outra Causa", value: "7" },
                { label: "8 - Outro", value: "8" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },

        // Data Óbito
        {
            name: "dt_death",
            label: "Se Óbito, Data",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },

        // CAT
        {
            name: "cat_issued",
            label: "Foi emitida a Comunicação de Acidente do Trabalho",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Não se aplica", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    complementarySection,
    companySection,
    epidemiologicalBackgroundSection,
    conductAndEvolutionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const mentalDisordersNotificationDefinition = defineNotificationType({
    id: 15,
    slug: "mental_disorder",
    label: "DTR Transtornos Mentais",
    description: `Todo caso de sofrimento emocional em suas diversas formas de manifestação tais como: choro fácil, tristeza, medo excessivo, doenças psicossomáticas, agitação, irritação, nervosismo, ansiedade, taquicardia, sudorese, insegurança, entre outros sintomas que podem indicar o desenvolvimento ou agravo de transtornos mentais, os quais tem como elementos causais fatores de risco relacionados ao trabalho, sejam resultantes da sua organização e gestão ou por exposição a determinados agentes tóxicos.`,
    sections,
});