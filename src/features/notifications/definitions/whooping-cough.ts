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
    description: "Identificação e dados sociodemográficos do paciente.",
    columns: 3,
    fields: [
        { name: "patient_name", label: "Nome do Paciente", kind: "text", schema: z.string().min(3, "Nome obrigatório"), defaultValue: "" },
        { name: "patient_cpf", label: "CPF", kind: "text", schema: z.string().min(11, "CPF obrigatório"), defaultValue: "" },
        { name: "patient_birth_date", label: "Data de Nascimento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "patient_age_unit", label: "Idade (Unidade)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: timeUnitOptions },
        { name: "patient_age_value", label: "Idade (Valor)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "sex", label: "Sexo", kind: "select", schema: z.string().min(1, "Sexo obrigatório"), defaultValue: "", options: sexOptions },
        {
            name: "pregnant",
            label: "Gestante",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - 1º Trimestre", value: "1" }, { label: "2 - 2º Trimestre", value: "2" },
                { label: "3 - 3º Trimestre", value: "3" }, { label: "4 - Idade gestacional ignorada", value: "4" },
                { label: "5 - Não", value: "5" }, { label: "6 - Não se aplica", value: "6" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "race_color", label: "Raça/Cor", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: raceColorOptions },
        { name: "education_level", label: "Escolaridade", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: educationLevelOptions },
        { name: "sus_card_number", label: "Número do Cartão SUS", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "mother_name", label: "Nome da Mãe", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 2. DADOS DE RESIDÊNCIA
// -----------------------------------------------------------------------------
const residenceSection = {
    id: "residence",
    title: "Dados de Residência",
    description: "Informações de endereço do paciente.",
    columns: 3,
    fields: [
        { name: "residence_state", label: "UF", kind: "text", schema: z.string().min(2, "UF obrigatória"), defaultValue: "" },
        { name: "residence_city", label: "Município de Residência", kind: "text", schema: z.string().min(1, "Município obrigatório"), defaultValue: "" },
        { name: "residence_district", label: "Distrito", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_neighborhood", label: "Bairro", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_street", label: "Logradouro (Rua, Avenida, etc)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_number", label: "Número", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "residence_complement", label: "Complemento", kind: "text", schema: optionalTextSchema, defaultValue: "" },
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
            defaultValue: "unknown",
            options: [
                { label: "1 - Urbana", value: "1" }, { label: "2 - Rural", value: "2" },
                { label: "3 - Periurbana", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "residence_country", label: "País (se fora do Brasil)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 3. DADOS COMPLEMENTARES E ANTECEDENTES
// -----------------------------------------------------------------------------
const complementarySection = {
    id: "complementary",
    title: "Dados Complementares e Antecedentes",
    description: "Investigação epidemiológica e histórico vacinal.",
    columns: 2,
    fields: [
        { name: "dt_investigation", label: "Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "st_sentinel_unit", label: "A Unidade Notificante é Sentinela?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "tp_contact_suspect",
            label: "Contato com Caso Suspeito/Confirmado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Domicílio", value: "1" }, { label: "2 - Vizinhança", value: "2" },
                { label: "3 - Trabalho", value: "3" }, { label: "4 - Creche/Escola", value: "4" },
                { label: "5 - Posto de Saúde/Hospital", value: "5" }, { label: "6 - Outro Estado/Município", value: "6" },
                { label: "7 - Outro", value: "7" }, { label: "8 - Sem História de Contato", value: "8" },
                { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "contact_name", label: "Nome do Contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "contact_address", label: "Endereço do Contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "nu_doses_vaccine",
            label: "Nº Doses Vacina Tríplice ou Tetravalente",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Uma", value: "1" }, { label: "2 - Duas", value: "2" },
                { label: "3 - Três", value: "3" }, { label: "4 - Três + Um Reforço", value: "4" },
                { label: "5 - Três + Dois Reforços", value: "5" }, { label: "6 - Nunca Vacinado", value: "6" },
                { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "dt_last_vaccine_dose", label: "Data da Última Dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. DADOS CLÍNICOS E SINTOMAS
// -----------------------------------------------------------------------------
const symptomsSection = {
    id: "symptoms",
    title: "Sinais, Sintomas e Complicações",
    description: "Manifestações clínicas e possíveis complicações da doença.",
    columns: 3,
    fields: [
        { name: "dt_first_symptoms", label: "Data dos Primeiros Sintomas", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_cough_onset", label: "Data do Início da Tosse", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "st_symptom_cough", label: "Tosse", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_cyanosis", label: "Cianose", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_temp_low", label: "Temperatura < 38°C", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_paroxysmal_cough", label: "Tosse Paroxística", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_vomiting", label: "Vômitos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_temp_high", label: "Temperatura >= 38°C", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_whoop", label: "Respiração Ruidosa (Guincho)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_apnea", label: "Apneia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptom_others", label: "Outros Sinais e Sintomas", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_comp_pneumonia", label: "Complicação: Pneumonia/Broncopneumonia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_comp_dehydration", label: "Complicação: Desidratação", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_comp_malnutrition", label: "Complicação: Desnutrição", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_comp_encephalopathy", label: "Complicação: Encefalopatia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_comp_otitis", label: "Complicação: Otite", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_comp_others", label: "Outras Complicações", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. ATENDIMENTO E TRATAMENTO
// -----------------------------------------------------------------------------
const attendanceSection = {
    id: "attendance",
    title: "Atendimento e Tratamento",
    description: "Informações de hospitalização e uso de antibióticos.",
    columns: 3,
    fields: [
        { name: "st_hospitalization", label: "Ocorreu Hospitalização?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_hospitalization", label: "Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_state", label: "UF do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_name", label: "Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "st_used_antibiotic", label: "Utilizou Antibiótico?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_antibiotic_start", label: "Data de Adm. do Antibiótico", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. DADOS DO LABORATÓRIO
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados do Laboratório",
    description: "Informações sobre coletas de materiais para diagnóstico.",
    columns: 3,
    fields: [
        { name: "dt_material_collection", label: "Data da Coleta de Material", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "st_nasopharyngeal_collection", label: "Coleta de Material da Nasofaringe?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "tp_culture_result",
            label: "Resultado da Cultura",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Positiva", value: "1" }, { label: "2 - Negativa", value: "2" },
                { label: "3 - Não Realizada", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. COMUNICANTES E MEDIDAS DE CONTROLE
// -----------------------------------------------------------------------------
const controlMeasuresSection = {
    id: "control_measures",
    title: "Comunicantes e Medidas de Controle",
    description: "Ações realizadas junto aos contatos e prevenção.",
    columns: 3,
    fields: [
        { name: "st_identified_contacts", label: "Realizada Identificação dos Comunicantes Íntimos?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "nu_identified_contacts", label: "Se Sim, Quantos?", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "nu_secondary_cases",
            label: "Casos Secundários Confirmados",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "0 - Nenhum", value: "0" }, { label: "1 - Um", value: "1" },
                { label: "2 - Dois ou mais", value: "2" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "st_nasopharyngeal_collection_contacts", label: "Realizada Coleta da Nasofaringe (Comunicantes)?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "nu_collection_contacts", label: "Se Sim, Em Quantos?", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "nu_positive_culture_contacts", label: "Resultados Positivos na Cultura (Comunicantes)?", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "tp_prevention_measures",
            label: "Medidas de Prevenção/Controle",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Bloqueio vacinal", value: "1" }, { label: "2 - Quimioprofilaxia", value: "2" },
                { label: "3 - Ambos", value: "3" }, { label: "4 - Não", value: "4" },
                { label: "Ignorado", value: "unknown" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. CONCLUSÃO DO CASO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão do Caso",
    description: "Critérios de encerramento e desfecho da notificação.",
    columns: 3,
    fields: [
        {
            name: "tp_final_classification",
            label: "Classificação Final",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Confirmado", value: "1" }, { label: "2 - Descartado", value: "2" },
            ],
        },
        {
            name: "tp_confirmation_criteria",
            label: "Critério de Confirmação/Descarte",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Laboratorial", value: "1" }, { label: "2 - Clínico-epidemiológico", value: "2" },
                { label: "3 - Clínico", value: "3" },
            ],
        },
        { name: "st_work_related", label: "Doença Relacionada ao Trabalho?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "tp_evolution",
            label: "Evolução",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Cura", value: "1" }, { label: "2 - Óbito por coqueluche", value: "2" },
                { label: "3 - Óbito por outras causas", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "dt_death", label: "Data do Óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_closing", label: "Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "additional_observations", label: "Informações Complementares e Observações", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    complementarySection,
    symptomsSection,
    attendanceSection,
    laboratorySection,
    controlMeasuresSection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const whoopingCoughNotificationDefinition = defineNotificationType({
    id: 8,
    slug: "whooping_cough",
    label: "Coqueluche",
    description: `A coqueluche é uma doença infecciosa aguda e transmissível, que compromete especificamente o aparelho respiratório (traqueia e brônquios) e se caracteriza por paroxismos de tosse seca. No lactente, pode resultar em complicações severas.`,
    sections,
});