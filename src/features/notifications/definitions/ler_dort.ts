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

// -----------------------------------------------------------------------------
// 1. DADOS GERAIS (Campos 1 a 7)
// -----------------------------------------------------------------------------
const generalSection = {
    id: "general",
    title: "Dados Gerais",
    description: "Informações básicas da notificação e unidade de saúde.",
    columns: 3,
    fields: [
        {
            name: "tp_notification",
            label: "1 Tipo de Notificação",
            kind: "select",
            schema: z.string(),
            defaultValue: "2",
            options: [{ label: "2 - Individual", value: "2" }],
        },
        {
            name: "disease",
            label: "2 Agravo/doença",
            kind: "select",
            schema: z.string().min(1, "Obrigatório"),
            defaultValue: "ler_dort",
            options: [
                { label: "LER/DORT", value: "ler_dort" },
            ],
        },
        {
            name: "cid10",
            label: "Código (CID10)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "Z57.9",
        },
        {
            name: "dt_notification",
            label: "3 Data da Notificação",
            kind: "date",
            schema: z.string().min(1, "Data obrigatória"),
            defaultValue: "",
        },
        {
            name: "uf_notification",
            label: "4 UF",
            kind: "text",
            schema: z.string().min(2, "UF obrigatória"),
            defaultValue: "",
        },
        {
            name: "city_notification",
            label: "5 Município de Notificação",
            kind: "text",
            schema: z.string().min(1, "Município obrigatório"),
            defaultValue: "",
        },
        {
            name: "health_unit_name",
            label: "6 Unidade de Saúde (ou outra fonte notificadora)",
            kind: "text",
            schema: z.string().min(1, "Unidade obrigatória"),
            defaultValue: "",
        },
        {
            name: "dt_diagnosis",
            label: "7 Data do Diagnóstico",
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
    description: "Identificação e dados sociodemográficos da Notificação Individual.",
    columns: 3,
    fields: [
        {
            name: "patient_name",
            label: "8 Nome do Paciente",
            kind: "text",
            schema: z.string().min(3, "Nome obrigatório"),
            defaultValue: "",
        },
        {
            name: "patient_birth_date",
            label: "9 Data de Nascimento",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "patient_age_unit",
            label: "10 (ou) Idade (Unidade)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: timeUnitOptions,
        },
        {
            name: "patient_age_value",
            label: "10 (ou) Idade (Valor)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "sex",
            label: "11 Sexo",
            kind: "select",
            schema: z.string().min(1, "Sexo obrigatório"),
            defaultValue: "",
            options: sexOptions,
        },
        {
            name: "pregnant",
            label: "12 Gestante",
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
            label: "13 Raça/Cor",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: raceColorOptions,
        },
        {
            name: "education_level",
            label: "14 Escolaridade",
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
            label: "15 Número do Cartão SUS",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "mother_name",
            label: "16 Nome da mãe",
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
    description: "Informações de endereço de residência do paciente.",
    columns: 3,
    fields: [
        { name: "residence_state", label: "17 UF", kind: "text", schema: z.string().min(2, "UF obrigatória"), defaultValue: "" },
        { name: "residence_city", label: "18 Município de Residência", kind: "text", schema: z.string().min(1, "Município obrigatório"), defaultValue: "" },
        { name: "residence_district", label: "19 Distrito", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_neighborhood", label: "20 Bairro", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_street", label: "21 Logradouro (rua, avenida,...)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_number", label: "22 Número", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_complement", label: "23 Complemento (apto., casa, ...)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_geo1", label: "24 Geo campo 1", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_geo2", label: "25 Geo campo 2", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_reference", label: "26 Ponto de Referência", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_cep", label: "27 CEP", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_phone", label: "28 (DDD) Telefone", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "residence_zone",
            label: "29 Zona",
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
        { name: "residence_country", label: "30 País (se residente fora do Brasil)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. DADOS COMPLEMENTARES DO CASO (Campos 31 a 33)
// -----------------------------------------------------------------------------
const complementarySection = {
    id: "complementary",
    title: "Dados Complementares do Caso",
    description: "Informações sobre ocupação e mercado de trabalho.",
    columns: 3,
    fields: [
        { name: "occupation", label: "31 Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "work_market_status",
            label: "32 Situação no Mercado de Trabalho",
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
            label: "33 Tempo de Trabalho na Ocupação (Unidade)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: timeUnitOptions,
        },
        {
            name: "work_time_value",
            label: "33 Tempo de Trabalho na Ocupação (Valor)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. DADOS DA EMPRESA CONTRATANTE (Campos 34 a 45)
// -----------------------------------------------------------------------------
const companySection = {
    id: "company",
    title: "Dados da Empresa Contratante",
    description: "Informações sobre a empresa onde o paciente trabalha.",
    columns: 3,
    fields: [
        { name: "company_cnpj_cpf", label: "34 Registro/CNPJ ou CPF", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_name", label: "35 Nome da Empresa ou Empregador", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_cnae", label: "36 Atividade Econômica (CNAE)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_state", label: "37 UF", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_city", label: "38 Município", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_district", label: "39 Distrito", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_neighborhood", label: "40 Bairro", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_address", label: "41 Endereço", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_number", label: "42 Número", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_reference", label: "43 Ponto de Referência", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_phone", label: "44 (DDD) Telefone", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "company_is_outsourced",
            label: "45 O Empregador é Empresa Terceirizada",
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
// 6. ANTECEDENTES EPIDEMIOLÓGICOS (Campos 46 a 48)
// -----------------------------------------------------------------------------
const epidemiologicalBackgroundSection = {
    id: "epidemiological_background",
    title: "Antecedentes Epidemiológicos",
    description: "Agravos associados e exposição a risco.",
    columns: 3,
    fields: [
        // 46 Agravos Associados
        { name: "associated_hypertension", label: "46 Agravos Associados: Hipertensão Arterial", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "associated_diabetes", label: "46 Agravos Associados: Diabetes Mellitus", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "associated_leprosy", label: "46 Agravos Associados: Hanseníase", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "associated_mental_disorder", label: "46 Agravos Associados: Transtorno Mental", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "associated_tuberculosis", label: "46 Agravos Associados: Tuberculose", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "associated_asthma", label: "46 Agravos Associados: Asma", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "associated_others", label: "46 Agravos Associados: Outras", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "associated_others_specify", label: "Outras (Especifique)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // 47 Tempo de Exposição
        { name: "exposure_time_unit", label: "47 Tempo de Exposição ao Agente de Risco (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "exposure_time_value", label: "47 Tempo de Exposição ao Agente de Risco (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // 48 Regime de Tratamento
        {
            name: "treatment_regimen",
            label: "48 Regime de Tratamento",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Hospitalar", value: "1" },
                { label: "2 - Ambulatorial", value: "2" },
            ]
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. CONCLUSÃO / INVESTIGAÇÃO CLÍNICA E EXPOSIÇÃO (Campos 49 a 52)
// -----------------------------------------------------------------------------
const clinicalAndExposureSection = {
    id: "clinical_and_exposure",
    title: "Sinais, Sintomas e Exposição no Trabalho",
    description: "Sinais e sintomas apresentados pelo paciente e fatores de risco no trabalho.",
    columns: 3,
    fields: [
        // 49 Sinais e Sintomas
        { name: "symp_sensory_alteration", label: "49 Sinais e Sintomas: Alteração de sensibilidade", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "symp_muscle_weakness", label: "49 Sinais e Sintomas: Diminuição de força muscular", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "symp_movement_decrease", label: "49 Sinais e Sintomas: Diminuição do movimento", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "symp_movement_limitation", label: "49 Sinais e Sintomas: Limitação de movimentos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "symp_phlogistic_signs", label: "49 Sinais e Sintomas: Sinais flogísticos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "symp_pain", label: "49 Sinais e Sintomas: Dor", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "symp_other", label: "49 Sinais e Sintomas: Outro", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "symp_other_specify", label: "Outro Sintoma (Especifique)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // 50 Limitação e incapacidade
        { name: "task_limitation", label: "50 Limitação e incapacidade para o exercício de tarefas", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },

        // 51 Exposição no local de trabalho
        { name: "exp_production_bonus", label: "51 Exposição à: Prêmios de produção", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_repetitive_movements", label: "51 Exposição à: Movimentos repetitivos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_stressful_environment", label: "51 Exposição à: Ambiente estressante", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_pause_time", label: "51 Exposição à: Há tempo de pausas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_long_journey", label: "51 Exposição à: Jornada de trabalho de mais de 6 horas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },

        // 52 Diagnóstico Específico
        { name: "specific_diagnosis", label: "52 Diagnóstico Específico", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "specific_diagnosis_cid10", label: "CID 10", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. CONDUTA E EVOLUÇÃO (Campos 53 a 60)
// -----------------------------------------------------------------------------
const conductAndEvolutionSection = {
    id: "conduct_and_evolution",
    title: "Conduta e Evolução do Caso",
    description: "Tratamento, afastamento, conduta geral e desfecho.",
    columns: 3,
    fields: [
        // 53, 54, 55 Afastamento e Resultados
        { name: "work_absence", label: "53 Houve afastamento do trabalho para tratamento?", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "absence_time_unit", label: "54 Tempo de Afastamento (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "absence_time_value", label: "54 Tempo de Afastamento (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "with_absence_evolution",
            label: "55 Com Afastamento do Trabalho",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Melhora", value: "1" },
                { label: "2 - Piora", value: "2" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },

        // 56 Outros Trabalhadores
        { name: "other_workers_same_disease", label: "56 Há ou Houve Outros Trabalhadores com a mesma Doença no Local de Trabalho?", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },

        // 57 Conduta Geral
        { name: "conduct_risk_removal", label: "57 Conduta Geral: Afastamento do agente do risco com mudança de função e/ou posto de trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_work_org_change", label: "57 Conduta Geral: Adoção de mudança na organização do trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_collective_protection", label: "57 Conduta Geral: Adoção de proteção coletiva", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_individual_protection", label: "57 Conduta Geral: Adoção de proteção individual", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_none", label: "57 Conduta Geral: Nenhum", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_workplace_removal", label: "57 Conduta Geral: Afastamento do local de trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_others", label: "57 Conduta Geral: Outros", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

        // 58 Evolução do Caso
        {
            name: "case_evolution",
            label: "58 Evolução do Caso",
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

        // 59 Data Óbito
        {
            name: "dt_death",
            label: "59 Se Óbito, Data",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },

        // 60 CAT
        {
            name: "cat_issued",
            label: "60 Foi emitida a Comunicação de Acidente do Trabalho",
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
    clinicalAndExposureSection,
    conductAndEvolutionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const lerDortNotificationDefinition = defineNotificationType({
    id: 12,
    slug: "ler_dort",
    label: "LER/DORT",
    description: `Todas as doenças, lesões e síndromes que afetam o sistema músculo esquelético, causadas, mantidas ou agravadas pelo trabalho (CID-10 G50-59, G90-99, M00-99). Em geral caracteriza-se pela ocorrência de vários sintomas inespecíficos, concomitantes ou não, que podem aparecer aos poucos, tais como dor crônica, parestesia, fadiga muscular, manifestando-se principalmente no pescoço, coluna vertebral, cintura escapular, membros superiores ou inferiores.`,
    sections,
});