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
            label: "1 - Tipo de Notificação",
            kind: "select",
            schema: z.string(),
            defaultValue: "2",
            options: [{ label: "2 - Individual", value: "2" }],
        },
        {
            name: "disease",
            label: "2 - Agravo/doença",
            kind: "select",
            schema: z.string().min(1, "Obrigatório"),
            defaultValue: "",
            options: [
                { label: "1 - SARAMPO", value: "1" },
                { label: "2 - RUBÉOLA", value: "2" },
            ],
        },
        {
            name: "cid10",
            label: "Código (CID10)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "B09",
        },
        {
            name: "dt_notification",
            label: "3 - Data da Notificação",
            kind: "date",
            schema: z.string().min(1, "Data obrigatória"),
            defaultValue: "",
        },
        {
            name: "uf_notification",
            label: "4 - UF",
            kind: "text",
            schema: z.string().min(2, "UF obrigatória"),
            defaultValue: "",
        },
        {
            name: "city_notification",
            label: "5 - Município de Notificação",
            kind: "text",
            schema: z.string().min(1, "Município obrigatório"),
            defaultValue: "",
        },
        {
            name: "health_unit_name",
            label: "6 - Unidade de Saúde (ou outra fonte notificadora)",
            kind: "text",
            schema: z.string().min(1, "Unidade obrigatória"),
            defaultValue: "",
        },
        {
            name: "dt_first_symptoms",
            label: "7 - Data dos Primeiros Sintomas",
            kind: "date",
            schema: z.string().min(1, "Data obrigatória"),
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 2. DADOS DO PACIENTE (NOTIFICAÇÃO INDIVIDUAL)
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Notificação Individual",
    description: "Identificação e dados sociodemográficos.",
    columns: 3,
    fields: [
        {
            name: "patient_name",
            label: "8 - Nome do Paciente",
            kind: "text",
            schema: z.string().min(3, "Nome obrigatório"),
            defaultValue: "",
        },
        {
            name: "patient_birth_date",
            label: "9 - Data de Nascimento",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "patient_age_unit",
            label: "10 - (ou) Idade (Unidade)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: timeUnitOptions,
        },
        {
            name: "patient_age_value",
            label: "10 - (ou) Idade (Valor)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "sex",
            label: "11 - Sexo",
            kind: "select",
            schema: z.string().min(1, "Sexo obrigatório"),
            defaultValue: "",
            options: [
                { label: "M - Masculino", value: "M" },
                { label: "F - Feminino", value: "F" },
                { label: "I - Ignorado", value: "I" },
            ],
        },
        {
            name: "pregnant",
            label: "12 - Gestante",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
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
            label: "13 - Raça/Cor",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Branca", value: "1" },
                { label: "2 - Preta", value: "2" },
                { label: "3 - Amarela", value: "3" },
                { label: "4 - Parda", value: "4" },
                { label: "5 - Indígena", value: "5" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        {
            name: "education_level",
            label: "14 - Escolaridade",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "0 - Analfabeto", value: "0" },
                { label: "1 - 1ª a 4ª série incompleta do EF", value: "1" },
                { label: "2 - 4ª série completa do EF", value: "2" },
                { label: "3 - 5ª à 8ª série incompleta do EF", value: "3" },
                { label: "4 - Ensino fundamental completo", value: "4" },
                { label: "5 - Ensino médio incompleto", value: "5" },
                { label: "6 - Ensino médio completo", value: "6" },
                { label: "7 - Educação superior incompleta", value: "7" },
                { label: "8 - Educação superior completa", value: "8" },
                { label: "9 - Ignorado", value: "9" },
                { label: "10 - Não se aplica", value: "10" },
            ],
        },
        {
            name: "sus_card_number",
            label: "15 - Número do Cartão SUS",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "mother_name",
            label: "16 - Nome da mãe",
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
        { name: "residence_state", label: "17 - UF", kind: "text", schema: z.string().min(2, "UF obrigatória"), defaultValue: "" },
        { name: "residence_city", label: "18 - Município de Residência", kind: "text", schema: z.string().min(1, "Município obrigatório"), defaultValue: "" },
        { name: "residence_district", label: "19 - Distrito", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_neighborhood", label: "20 - Bairro", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_street", label: "21 - Logradouro (rua, avenida,...)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_number", label: "22 - Número", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_complement", label: "23 - Complemento (apto., casa, ...)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_geo1", label: "24 - Geo campo 1", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_geo2", label: "25 - Geo campo 2", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_reference", label: "26 - Ponto de Referência", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_cep", label: "27 - CEP", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_phone", label: "28 - (DDD) Telefone", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "residence_zone",
            label: "29 - Zona",
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
        { name: "residence_country", label: "30 - País (se residente fora do Brasil)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. DADOS COMPLEMENTARES DO CASO
// -----------------------------------------------------------------------------
const complementarySection = {
    id: "complementary",
    title: "Dados Complementares do Caso",
    description: "Investigação, vacinação e sinais/sintomas do paciente.",
    columns: 3,
    fields: [
        { name: "dt_investigation", label: "31 - Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "32 - Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "took_vaccine", label: "33 - Tomou Vacina Contra Sarampo e Rubéola (dupla ou triviral)", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "dt_last_dose", label: "34 - Data da Última Dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "contact_suspected_case",
            label: "35 - Contato Com Caso Suspeito ou Confirmado (até 23 dias antes)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Domicílio", value: "1" },
                { label: "2 - Vizinhança", value: "2" },
                { label: "3 - Trabalho", value: "3" },
                { label: "4 - Creche/Escola", value: "4" },
                { label: "5 - Posto de Saúde/Hospital", value: "5" },
                { label: "6 - Outro Estado/Município", value: "6" },
                { label: "7 - Sem História de Contato", value: "7" },
                { label: "8 - Outro país", value: "8" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        { name: "contact_name", label: "36 - Nome do Contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "contact_address", label: "37 - Endereço do contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_exanthema_start", label: "38 - Data do Início do Exantema", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_fever_start", label: "39 - Data do Início da Febre", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        // Outros Sinais e Sintomas
        { name: "symptom_cough", label: "40 - Tosse", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "symptom_arthralgia", label: "40 - Artralgia/Artrite", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "symptom_coryza", label: "40 - Coriza", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "symptom_ganglia", label: "40 - Presença de Gânglios Retroauriculares/Occiptais", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "symptom_conjunctivitis", label: "40 - Conjuntivite", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "symptom_retro_ocular_pain", label: "40 - Dor Retro-Ocular", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. ATENDIMENTO
// -----------------------------------------------------------------------------
const attendanceSection = {
    id: "attendance",
    title: "Atendimento",
    description: "Informações sobre hospitalização do paciente.",
    columns: 3,
    fields: [
        { name: "hospitalization_occurred", label: "41 - Ocorreu Hospitalização", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoIgnoredOptions },
        { name: "dt_hospitalization", label: "42 - Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_state", label: "43 - UF", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "44 - Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_name", label: "45 - Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. DADOS DO LABORATÓRIO
// -----------------------------------------------------------------------------
const resultOptions = [
    { label: "1 - Reagente", value: "1" },
    { label: "2 - Não Reagente", value: "2" },
    { label: "3 - Inconclusivo", value: "3" },
    { label: "4 - Não Realizado", value: "4" },
];

const laboratorySection = {
    id: "laboratory",
    title: "Dados do Laboratório",
    description: "Exame sorológico e isolamento viral.",
    columns: 3,
    fields: [
        { name: "dt_first_sample", label: "46 - Data da Coleta da 1ª Amostra (S1)", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_second_sample", label: "47 - Data da Coleta da 2ª Amostra (S2)", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        // Exame Sorológico - Resultados
        { name: "result_measles_igm", label: "48 - Sarampo IgM", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_measles_igg", label: "48 - Sarampo IgG", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_rubella_igm", label: "48 - Rubéola IgM", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_rubella_igg", label: "48 - Rubéola IgG", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_others_igm", label: "48 - Outras Exantemáticas IgM", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_others_igg", label: "48 - Outras Exantemáticas IgG", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },

        // Isolamento Viral
        { name: "sample_blood", label: "49 - Amostra clínica: Sangue Total", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sample_secretion", label: "49 - Amostra clínica: Secreção Nasofaríngea", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sample_urine", label: "49 - Amostra clínica: Urina", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sample_liquor", label: "49 - Amostra clínica: Líquor", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

        {
            name: "viral_etiology",
            label: "50 - Etiologia Viral",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Vírus Sarampo Selvagem", value: "1" },
                { label: "2 - Vírus Sarampo Vacinal", value: "2" },
                { label: "3 - Vírus Rubéola Selvagem", value: "3" },
                { label: "4 - Vírus Rubéola Vacinal", value: "4" },
                { label: "5 - Dengue", value: "5" },
                { label: "6 - Herpes Vírus Tipo 6", value: "6" },
                { label: "7 - Parvovírus B19", value: "7" },
                { label: "8 - Enterovírus", value: "8" },
                { label: "9 - Outras", value: "9" },
                { label: "10 - Não detectado", value: "10" },
            ],
        },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. MEDIDAS DE CONTROLE
// -----------------------------------------------------------------------------
const controlMeasuresSection = {
    id: "control_measures",
    title: "Medidas de Controle",
    description: "Ações de bloqueio vacinal realizadas.",
    columns: 3,
    fields: [
        {
            name: "vaccine_blockade_performed",
            label: "51 - Realizou Bloqueio Vacinal",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Não, todos vacinados", value: "3" },
                { label: "4 - Não, sem história de contato", value: "4" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "vaccinated_under_5", label: "52 - Vacinados: Menor de 5 anos", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccinated_5_to_14", label: "52 - Vacinados: De 5 a 14 anos", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccinated_15_to_39", label: "52 - Vacinados: De 15 a 39 anos", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "time_interval",
            label: "53 - Especifique Intervalo de Tempo",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Em até 72 horas", value: "1" },
                { label: "2 - Após 72 horas", value: "2" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final e evolução do caso.",
    columns: 3,
    fields: [
        {
            name: "final_classification",
            label: "54 - Classificação Final",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Sarampo", value: "1" },
                { label: "2 - Rubéola", value: "2" },
                { label: "3 - Descartado", value: "3" },
            ]
        },
        {
            name: "confirmation_criterion",
            label: "55 - Critério de Confirmação ou Descarte",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Laboratorial", value: "1" },
                { label: "2 - Clínico-epidemiológico", value: "2" },
                { label: "3 - Clínico", value: "3" },
                { label: "4 - Data da Última Dose da Vacina", value: "4" },
            ]
        },
        {
            name: "discarded_classification",
            label: "56 - Classificação final do caso descartado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Dengue", value: "1" },
                { label: "2 - Escarlatina", value: "2" },
                { label: "3 - Exantema Súbito (Herpes Vírus Tipo 6)", value: "3" },
                { label: "4 - Eritema Infeccioso (Parvovírus B19)", value: "4" },
                { label: "5 - Enterovirose", value: "5" },
                { label: "6 - Evento Temporal Relacionado à Vacina", value: "6" },
                { label: "7 - IgM associado temporalmente à vacina", value: "7" },
                { label: "8 - Sem soroconversão dos anticorpos IgG", value: "8" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },

        // Local Provável da Fonte de Infecção
        {
            name: "autochthonous",
            label: "57 - O caso é autóctone do município de residência?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Indeterminado", value: "3" },
            ]
        },
        { name: "infection_state", label: "58 - UF (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_country", label: "59 - País (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_city", label: "60 - Município (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_district", label: "61 - Distrito (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_neighborhood", label: "62 - Bairro (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        {
            name: "case_evolution",
            label: "63 - Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Cura", value: "1" },
                { label: "2 - Óbito por doenças exantemáticas", value: "2" },
                { label: "3 - Óbito por outras causas", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "dt_death", label: "64 - Data do Óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_closing", label: "65 - Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "additional_observations", label: "Informações complementares e observações", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ]
} satisfies NotificationSectionDefinition;


const sections = [
    generalSection,
    patientSection,
    residenceSection,
    complementarySection,
    attendanceSection,
    laboratorySection,
    controlMeasuresSection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const exanthematousDiseasesNotificationDefinition = defineNotificationType({
    id: 16,
    slug: "exanthematous_diseases",
    label: "Doenças Exantemáticas (Sarampo/Rubéola)",
    description: `Ficha de investigação para Doenças Exantemáticas Febris (Sarampo/Rubéola). Todo paciente com febre, exantema maculopapular e tosse/coriza/conjuntivite (caso suspeito de sarampo) ou linfoadenopatia (caso suspeito de rubéola).`,
    sections,
}); 