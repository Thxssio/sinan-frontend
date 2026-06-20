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
// 5. ANTECEDENTES EPIDEMIOLÓGICOS
// -----------------------------------------------------------------------------
const epidemiologicalBackgroundSection = {
    id: "epidemiological_background",
    title: "Antecedentes Epidemiológicos",
    description: "Agravos associados e exposição a risco.",
    columns: 3,
    fields: [
        // Agravos Associados
        { name: "associated_hypertension", label: "Agravos Associados: Hipertensão Arterial", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "associated_diabetes", label: "Agravos Associados: Diabetes Mellitus", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "associated_leprosy", label: "Agravos Associados: Hanseníase", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "associated_mental_disorder", label: "Agravos Associados: Transtorno Mental", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "associated_tuberculosis", label: "Agravos Associados: Tuberculose", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "associated_asthma", label: "Agravos Associados: Asma", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "associated_others", label: "Agravos Associados: Outras", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
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
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. CONCLUSÃO / INVESTIGAÇÃO CLÍNICA E EXPOSIÇÃO
// -----------------------------------------------------------------------------
const clinicalAndExposureSection = {
    id: "clinical_and_exposure",
    title: "Sinais, Sintomas e Exposição no Trabalho",
    description: "Sinais e sintomas apresentados pelo paciente e fatores de risco no trabalho.",
    columns: 3,
    fields: [
        // Sinais e Sintomas
        { name: "symp_sensory_alteration", label: "Sinais e Sintomas: Alteração de sensibilidade", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_muscle_weakness", label: "Sinais e Sintomas: Diminuição de força muscular", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_movement_decrease", label: "Sinais e Sintomas: Diminuição do movimento", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_movement_limitation", label: "Sinais e Sintomas: Limitação de movimentos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_phlogistic_signs", label: "Sinais e Sintomas: Sinais flogísticos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_pain", label: "Sinais e Sintomas: Dor", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_other", label: "Sinais e Sintomas: Outro", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_other_specify", label: "Outro Sintoma (Especifique)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Limitação e incapacidade
        { name: "task_limitation", label: "Limitação e incapacidade para o exercício de tarefas", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Exposição no local de trabalho
        { name: "exp_production_bonus", label: "Exposição à: Prêmios de produção", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "exp_repetitive_movements", label: "Exposição à: Movimentos repetitivos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "exp_stressful_environment", label: "Exposição à: Ambiente estressante", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "exp_pause_time", label: "Exposição à: Há tempo de pausas", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "exp_long_journey", label: "Exposição à: Jornada de trabalho de mais de 6 horas", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Diagnóstico Específico
        { name: "specific_diagnosis", label: "Diagnóstico Específico", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "specific_diagnosis_cid10", label: "CID 10", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. CONDUTA E EVOLUÇÃO
// -----------------------------------------------------------------------------
const conductAndEvolutionSection = {
    id: "conduct_and_evolution",
    title: "Conduta e Evolução do Caso",
    description: "Tratamento, afastamento, conduta geral e desfecho.",
    columns: 3,
    fields: [
        // Afastamento e Resultados
        { name: "work_absence", label: "Houve afastamento do trabalho para tratamento?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "absence_time_unit", label: "Tempo de Afastamento (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "absence_time_value", label: "Tempo de Afastamento (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "with_absence_evolution",
            label: "Com Afastamento do Trabalho",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Melhora", value: "1" },
                { label: "2 - Piora", value: "2" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },

        // Outros Trabalhadores
        { name: "other_workers_same_disease", label: "Há ou Houve Outros Trabalhadores com a mesma Doença no Local de Trabalho?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Conduta Geral
        { name: "conduct_risk_removal", label: "Conduta Geral: Afastamento do agente do risco com mudança de função e/ou posto de trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_work_org_change", label: "Conduta Geral: Adoção de mudança na organização do trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_collective_protection", label: "Conduta Geral: Adoção de proteção coletiva", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_individual_protection", label: "Conduta Geral: Adoção de proteção individual", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_none", label: "Conduta Geral: Nenhum", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_workplace_removal", label: "Conduta Geral: Afastamento do local de trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "conduct_others", label: "Conduta Geral: Outros", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

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