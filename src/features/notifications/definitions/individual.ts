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
// 1. DADOS DO PACIENTE (Notificação Individual)
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Dados do Paciente",
    description: "Informações básicas e demográficas do paciente notificado.",
    columns: 3,
    fields: [
        { name: "patient_name", label: "Nome", kind: "text", schema: z.string().min(3, "Nome obrigatório"), defaultValue: "" },
        { name: "patient_cpf", label: "CPF", kind: "text", schema: z.string().min(11, "CPF obrigatório"), defaultValue: "" },
        { name: "dt_first_symptoms", label: "Data dos Primeiros Sintomas", kind: "date", schema: z.string().min(1, "Obrigatória"), defaultValue: "" },
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
    description: "Endereço principal do paciente notificado.",
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
// 3. DADOS COMPLEMENTARES (Exames e Clínica)
// -----------------------------------------------------------------------------
const complementaryDataSection = {
    id: "complementary_data",
    title: "Dados Complementares",
    description: "Sinais, sintomas preliminares e exames iniciais no momento da notificação.",
    columns: 3,
    fields: [
        { name: "dt_first_sample_serology", label: "Data da coleta da 1ª amostra (Sorologia)", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_first_sample_other", label: "Data da coleta da 1ª amostra (Outra)", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "exam_type_specify", label: "Especificar tipo de exame", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "death_occurred", label: "Óbito?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "contact_similar_case", label: "Contato com caso semelhante?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "exanthema_presence", label: "Presença de exantema?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_exanthema_start", label: "Data do início do exantema", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "petechiae_presence", label: "Petéquias ou sufusões hemorrágicas?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "liquor_performed", label: "Foi realizado líquor?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "bacterioscopy_result", label: "Resultado da bacterioscopia", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "vaccinated_against", label: "Paciente tomou vacina contra o agravo notificado?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_last_vaccine_dose", label: "Data da última dose tomada", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. ATENDIMENTO E HIPÓTESES DIAGNÓSTICAS
// -----------------------------------------------------------------------------
const hospitalizationDiagnosisSection = {
    id: "hospitalization_diagnosis",
    title: "Hospitalização e Diagnóstico",
    description: "Dados de internação e hipóteses diagnósticas no momento da notificação.",
    columns: 3,
    fields: [
        { name: "hospitalized", label: "Ocorreu hospitalização?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_hospitalization", label: "Data da hospitalização", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_uf", label: "UF (Hospital)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_name", label: "Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "hypothesis_1_cid10", label: "1ª Hipótese Diagnóstica (CID 10)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hypothesis_2_cid10", label: "2ª Hipótese Diagnóstica (CID 10)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. LOCAL PROVÁVEL DE INFECÇÃO
// -----------------------------------------------------------------------------
const probableInfectionLocationSection = {
    id: "probable_infection_location",
    title: "Local Provável de Infecção",
    description: "Classificação provisória do local de infecção (no momento da notificação).",
    columns: 3,
    fields: [
        { name: "infection_country", label: "País (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_uf", label: "UF (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_city", label: "Município (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_district", label: "Distrito (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_neighborhood", label: "Bairro (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    complementaryDataSection,
    hospitalizationDiagnosisSection,
    probableInfectionLocationSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const individualNotificationDefinition = defineNotificationType({
    id: 98,
    slug: "individual",
    label: "Notificação Individual",
    description: `Ficha de Notificação Individual para registro de casos suspeitos ou confirmados de agravos, contendo dados complementares clínicos e epidemiológicos.`,
    sections,
});