import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    yesNoUnknownOptions,
    type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared";

const optionalTextSchema = z.string().optional();

const yesNoIgnoredOptions = [
    { label: "1 - Sim", value: "1" },
    { label: "2 - Não", value: "2" },
    { label: "9 - Ignorado", value: "9" },
];

const yesNoOptions = [
    { label: "1 - Sim", value: "1" },
    { label: "2 - Não", value: "2" },
];

const timeUnitOptions = [
    { label: "1 - Hora", value: "1" },
    { label: "2 - Dia", value: "2" },
    { label: "3 - Mês", value: "3" },
    { label: "4 - Ano", value: "4" },
];

const smokingHabitOptions = [
    { label: "1 - Sim", value: "1" },
    { label: "2 - Não", value: "2" },
    { label: "3 - Ex-fumante", value: "3" },
    { label: "9 - Ignorado", value: "9" },
];

// -----------------------------------------------------------------------------
// 1. DADOS GERAIS
// -----------------------------------------------------------------------------
const generalSection = {
    id: "general",
    title: "Dados Gerais",
    description: "Informações básicas da notificação e unidade de saúde.",
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
            name: "disease",
            label: "Agravo/doença",
            kind: "select",
            schema: z.string().min(1, "Obrigatório"),
            defaultValue: "pneumoconioses",
            options: [
                { label: "Pneumoconioses", value: "pneumoconioses" },
            ],
        },
        {
            name: "cid10",
            label: "Código (CID10)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "J64",
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
            label: "UF",
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
            name: "dt_diagnosis",
            label: "Data do Diagnóstico",
            kind: "date",
            schema: z.string().min(1, "Data obrigatória"),
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 2. DADOS DO PACIENTE
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Dados do Paciente",
    description: "Identificação e dados sociodemográficos da Notificação Individual.",
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
            name: "patient_age_unit",
            label: "(ou) Idade (Unidade)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: timeUnitOptions,
        },
        {
            name: "patient_age_value",
            label: "(ou) Idade (Valor)",
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
            options: [
                ...educationLevelOptions,
                { label: "10 - Não se aplica", value: "10" }
            ],
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
// 3. DADOS DE RESIDÊNCIA
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
// 4. DADOS COMPLEMENTARES DO CASO
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
                { label: "03 - Autônomo/ conta própria", value: "03" },
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
// 5. DADOS DA EMPRESA CONTRATANTE
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
// 6. ANTECEDENTES EPIDEMIOLÓGICOS
// -----------------------------------------------------------------------------
const epidemiologicalBackgroundSection = {
    id: "epidemiological_background",
    title: "Antecedentes Epidemiológicos",
    description: "Agravos associados e exposição a agentes de risco.",
    columns: 3,
    fields: [
        // Agravos Associados
        { name: "associated_chronic_airflow_limitation", label: "Agravos Assoc.: Limitação crônica ao fluxo aéreo", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "associated_cancer", label: "Agravos Assoc.: Câncer", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "associated_thyroiditis", label: "Agravos Assoc.: Tireoidite", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "associated_tuberculosis", label: "Agravos Assoc.: Tuberculose", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "associated_rheumatoid_arthritis", label: "Agravos Assoc.: Artrite reumatóide", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "associated_others", label: "Agravos Assoc.: Outras", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "associated_others_specify", label: "Outras (Especifique)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

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

        // Exposição em vínculos
        { name: "exposure_multiple_bonds", label: "A exposição a poeiras e minerais ocorreu em um ou mais vínculos distintos da empresa", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "exposure_multiple_bonds_specify", label: "Especificar", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Agentes de Exposição
        { name: "exposure_silica", label: "Agentes de Exp.: Sílica", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "exposure_asbestos", label: "Agentes de Exp.: Asbesto", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "exposure_coal_dust", label: "Agentes de Exp.: Poeiras de carvão mineral", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "exposure_mixed_dust", label: "Agentes de Exp.: Poeiras mistas (silicatos, talco)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "exposure_hard_metals", label: "Agentes de Exp.: Metais duros (cobalto, titânio, tungstênio)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "exposure_beryllium", label: "Agentes de Exp.: Berílio", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "exposure_abrasives_dust", label: "Agentes de Exp.: Poeiras de abrasivos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "exposure_organic_dust", label: "Agentes de Exp.: Poeiras orgânicas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

        // Hábito de Fumar e Exposição
        { name: "smoking_habit", label: "Hábito de Fumar", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: smokingHabitOptions },
        { name: "tobacco_exposure_unit", label: "Tempo de Exposição ao tabaco (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "tobacco_exposure_value", label: "Tempo de Exposição ao tabaco (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Confirmação diagnóstica e avaliação funcional.",
    columns: 3,
    fields: [
        // Confirmação Diagnóstica
        { name: "diag_chest_xray", label: "Conf. Diagnóstica: Radiografia de tórax", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "diag_lung_biopsy", label: "Conf. Diagnóstica: Biópsia pulmonar", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "diag_chest_ct", label: "Conf. Diagnóstica: Tomografia de tórax de alta resolução", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "diag_other", label: "Conf. Diagnóstica: Outro", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

        // Diagnóstico Específico e Outros Trabalhadores
        { name: "specific_diagnosis", label: "Diagnóstico Específico", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "specific_diagnosis_cid10", label: "CID 10 Específico", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "other_workers_same_disease", label: "Há ou Houve Outros Trabalhadores com a mesma Doença no Local de Trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },

        // Avaliação Funcional
        { name: "functional_evaluation", label: "Avaliação funcional (prova de função pulmonar)", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        {
            name: "functional_evaluation_result",
            label: "Resultado da avaliação funcional",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Normal", value: "1" },
                { label: "2 - Alterada", value: "2" },
            ]
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. CONDUTA E EVOLUÇÃO
// -----------------------------------------------------------------------------
const conductAndEvolutionSection = {
    id: "conduct_and_evolution",
    title: "Conduta e Evolução do Caso",
    description: "Conduta geral adotada e desfecho.",
    columns: 3,
    fields: [
        // Conduta Geral
        { name: "conduct_risk_removal", label: "Conduta: Afastamento do agente do risco com mudança de função e/ou posto", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_work_org_change", label: "Conduta: Adoção de mudança na organização do trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_collective_protection", label: "Conduta: Adoção de proteção coletiva", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_workplace_removal", label: "Conduta: Afastamento do local de trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_individual_protection", label: "Conduta: Adoção de proteção individual", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_none", label: "Conduta: Nenhum", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_others", label: "Conduta: Outros", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

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

        // Informações Complementares
        {
            name: "additional_observations",
            label: "Informações complementares e observações",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;


const sections = [
    generalSection,
    patientSection,
    residenceSection,
    complementarySection,
    companySection,
    epidemiologicalBackgroundSection,
    conclusionSection,
    conductAndEvolutionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const pneumoconiosesNotificationDefinition = defineNotificationType({
    id: 14,
    slug: "pneumoconioses",
    label: "Pneumoconioses",
    description: `Todas as doenças pulmonares causadas pela inalação e acúmulo de poeiras inorgânicas nos pulmões com reação tissular à presença dessas poeiras, devido exposição no ambiente ou processo de trabalho. Exemplos de pneumoconioses: asbestose, silicose, beriliose, estanhose, siderose entre outras.`,
    sections,
});