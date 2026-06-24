import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    yesNoUnknownOptions,
    yesNoOptions,
    timeUnitOptions,
    resultOptions,
    type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared";

const optionalTextSchema = z.string().optional();

// -----------------------------------------------------------------------------
// 1. DADOS DO PACIENTE
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Dados do Paciente",
    description: "Capture o retrato do paciente na notificação, mesmo quando ele ja existe no cadastro geral.",
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
            label: "Raça/Cor",
            kind: "select",
            schema: z.string().min(1, "Raça/Cor obrigatória"),
            defaultValue: "",
            options: raceColorOptions,
        },
        {
            name: "education_level",
            label: "Escolaridade",
            kind: "select",
            schema: z.string().min(1, "Escolaridade obrigatória"),
            defaultValue: "",
            options: educationLevelOptions,
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
    description: "Investigação, vacinação e sinais/sintomas do paciente.",
    columns: 3,
    fields: [
        { name: "dt_investigation", label: "Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "took_vaccine", label: "Tomou Vacina Contra Sarampo e Rubéola (dupla ou triviral)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_last_dose", label: "Data da Última Dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "contact_suspected_case",
            label: "Contato Com Caso Suspeito ou Confirmado (até 23 dias antes)",
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
        { name: "contact_name", label: "Nome do Contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "contact_address", label: "Endereço do contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_exanthema_start", label: "Data do Início do Exantema", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_fever_start", label: "Data do Início da Febre", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        // Outros Sinais e Sintomas
        { name: "symptom_cough", label: "Tosse", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symptom_arthralgia", label: "Artralgia/Artrite", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symptom_coryza", label: "Coriza", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symptom_ganglia", label: "Presença de Gânglios Retroauriculares/Occiptais", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symptom_conjunctivitis", label: "Conjuntivite", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symptom_retro_ocular_pain", label: "Dor Retro-Ocular", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. ATENDIMENTO
// -----------------------------------------------------------------------------
const attendanceSection = {
    id: "attendance",
    title: "Atendimento",
    description: "Informações sobre hospitalização do paciente.",
    columns: 3,
    fields: [
        { name: "hospitalization_occurred", label: "Ocorreu Hospitalização", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_hospitalization", label: "Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_state", label: "UF do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_name", label: "Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. DADOS DO LABORATÓRIO
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados do Laboratório",
    description: "Exame sorológico e isolamento viral.",
    columns: 3,
    fields: [
        { name: "dt_first_sample", label: "Data da Coleta da 1ª Amostra (S1)", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_second_sample", label: "Data da Coleta da 2ª Amostra (S2)", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        // Exame Sorológico - Resultados
        { name: "result_measles_igm", label: "Sarampo IgM", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_measles_igg", label: "Sarampo IgG", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_rubella_igm", label: "Rubéola IgM", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_rubella_igg", label: "Rubéola IgG", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_others_igm", label: "Outras Exantemáticas IgM", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },
        { name: "result_others_igg", label: "Outras Exantemáticas IgG", kind: "select", schema: optionalTextSchema, defaultValue: "", options: resultOptions },

        // Isolamento Viral
        { name: "sample_blood", label: "Amostra clínica: Sangue Total", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sample_secretion", label: "Amostra clínica: Secreção Nasofaríngea", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sample_urine", label: "Amostra clínica: Urina", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sample_liquor", label: "Amostra clínica: Líquor", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

        {
            name: "viral_etiology",
            label: "Etiologia Viral",
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
// 6. MEDIDAS DE CONTROLE
// -----------------------------------------------------------------------------
const controlMeasuresSection = {
    id: "control_measures",
    title: "Medidas de Controle",
    description: "Ações de bloqueio vacinal realizadas.",
    columns: 3,
    fields: [
        {
            name: "vaccine_blockade_performed",
            label: "Realizou Bloqueio Vacinal",
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
        { name: "vaccinated_under_5", label: "Vacinados: Menor de 5 anos", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccinated_5_to_14", label: "Vacinados: De 5 a 14 anos", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccinated_15_to_39", label: "Vacinados: De 15 a 39 anos", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "time_interval",
            label: "Especifique Intervalo de Tempo",
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
// 7. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final e evolução do caso.",
    columns: 3,
    fields: [
        {
            name: "final_classification",
            label: "Classificação Final",
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
            label: "Critério de Confirmação ou Descarte",
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
            label: "Classificação final do caso descartado",
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
        { name: "infection_state", label: "UF (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_country", label: "País (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_city", label: "Município (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_district", label: "Distrito (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_neighborhood", label: "Bairro (Fonte)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        {
            name: "case_evolution",
            label: "Evolução do Caso",
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
        { name: "dt_death", label: "Data do Óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_closing", label: "Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ]
} satisfies NotificationSectionDefinition;


const sections = [
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