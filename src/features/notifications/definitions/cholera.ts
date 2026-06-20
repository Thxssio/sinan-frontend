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
// 3. DADOS COMPLEMENTARES DO CASO
// -----------------------------------------------------------------------------
const complementarySection = {
    id: "complementary",
    title: "Dados Complementares",
    description: "Investigação epidemiológica e histórico de contatos.",
    columns: 2,
    fields: [
        { name: "dt_investigation", label: "Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
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
                { label: "7 - Outros", value: "7" }, { label: "8 - Sem História de Contato", value: "8" },
                { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "contact_name", label: "Nome do Contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "contact_phone", label: "(DDD) Telefone do Contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "contact_address", label: "Endereço do Contato", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "tp_infection_link",
            label: "Sugestão de Vínculo com",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Consumo de água não tratada", value: "1" }, { label: "2 - Exposição a esgoto", value: "2" },
                { label: "3 - Alimento", value: "3" }, { label: "4 - Deslocamento", value: "4" },
                { label: "5 - Outros", value: "5" }, { label: "Ignorado", value: "unknown" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. SINAIS E SINTOMAS
// -----------------------------------------------------------------------------
const symptomsSection = {
    id: "symptoms",
    title: "Sinais e Sintomas",
    description: "Manifestações clínicas observadas no paciente.",
    columns: 3,
    fields: [
        { name: "dt_first_symptoms", label: "Data dos Primeiros Sintomas", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "st_symptoms_asymptomatic", label: "Assintomático", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptoms_fever", label: "Febre", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptoms_abdominal_pain", label: "Dor Abdominal", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptoms_shock", label: "Choque", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptoms_diarrhea", label: "Diarreia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptoms_vomiting", label: "Vômitos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_symptoms_cramps", label: "Câimbras", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "st_dehydration",
            label: "Desidratação",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Não", value: "1" }, { label: "2 - Algum Grau", value: "2" },
                { label: "3 - Grave", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. CARACTERÍSTICAS DA DIARREIA
// -----------------------------------------------------------------------------
const diarrheaDetailsSection = {
    id: "diarrhea_details",
    title: "Características da Diarreia",
    description: "Detalhes específicos sobre o quadro diarreico.",
    columns: 2,
    fields: [
        {
            name: "tp_diarrhea_characteristic",
            label: "Característica da Diarreia",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Aquosa/Amarelada", value: "1" }, { label: "2 - Aquosa/Água de Arroz", value: "2" },
                { label: "3 - Pastosa", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        {
            name: "nu_diarrhea_frequency",
            label: "Frequência/Dia",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Até 5 evacuações", value: "1" }, { label: "2 - De 6 a 10 evacuações", value: "2" },
                { label: "3 - De 11 a 20 evacuações", value: "3" }, { label: "4 - Acima de 20 evacuações", value: "4" },
                { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "st_presence_blood", label: "Presença de Sangue?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_presence_mucus", label: "Presença de Muco?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. ATENDIMENTO
// -----------------------------------------------------------------------------
const attendanceSection = {
    id: "attendance",
    title: "Atendimento",
    description: "Informações sobre o atendimento médico prestado.",
    columns: 3,
    fields: [
        {
            name: "tp_attendance",
            label: "Tipo de Atendimento",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Hospitalar", value: "1" }, { label: "2 - Ambulatorial", value: "2" },
                { label: "3 - Domiciliar", value: "3" }, { label: "4 - Nenhum", value: "4" },
                { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "dt_attendance", label: "Data do Atendimento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_hospitalization", label: "Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_state", label: "UF do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_name", label: "Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. DADOS DO LABORATÓRIO
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados do Laboratório",
    description: "Resultados de exames para detecção de V. cholerae.",
    columns: 3,
    fields: [
        {
            name: "st_material_collected",
            label: "Material Colhido",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Fezes/Swab retal ou fecal", value: "1" }, { label: "2 - Vômito", value: "2" },
                { label: "3 - Não", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "dt_collection", label: "Data da Coleta", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "st_antibiotic_before_collection", label: "Uso de ATB Antes da Coleta?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "antibiotic_before_collection_name", label: "Caso afirmativo, Qual?", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "tp_lab_result",
            label: "Resultado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Positivo", value: "1" }, { label: "2 - Negativo", value: "2" },
            ],
        },
        {
            name: "tp_serotype",
            label: "Caso Positivo (Sorotipo)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Ogawa", value: "1" }, { label: "2 - Inaba", value: "2" },
                { label: "3 - Hikojima", value: "3" }, { label: "4 - Outro Sorotipo", value: "4" },
                { label: "5 - Não Vibrio", value: "5" },
            ],
        },
        { name: "negative_result_specify", label: "Caso Negativo, Especificar", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. TRATAMENTO
// -----------------------------------------------------------------------------
const treatmentSection = {
    id: "treatment",
    title: "Tratamento",
    description: "Intervenções terapêuticas realizadas.",
    columns: 3,
    fields: [
        {
            name: "tp_rehydration",
            label: "Reidratação",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Via Oral", value: "1" }, { label: "2 - Venosa", value: "2" },
                { label: "3 - Oral-Venosa", value: "3" },
            ],
        },
        { name: "st_used_antibiotics", label: "Utilizou Antibióticos?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "used_antibiotics_name", label: "Caso afirmativo, Qual?", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 9. LOCAL DE INFECÇÃO E CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão do Caso",
    description: "Encerramento e definição do local de infecção provável.",
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
                { label: "1 - Laboratorial", value: "1" }, { label: "2 - Clínico-Epidemiológico", value: "2" },
            ],
        },
        {
            name: "st_autochthonous",
            label: "Autóctone do município?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Sim", value: "1" }, { label: "2 - Não", value: "2" },
                { label: "3 - Indeterminado", value: "3" },
            ],
        },
        { name: "infection_state", label: "UF (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_country", label: "País (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_city", label: "Município (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_district", label: "Distrito (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_neighborhood", label: "Bairro (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "st_work_related", label: "Doença Relacionada ao Trabalho?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "tp_case_evolution",
            label: "Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Cura", value: "1" }, { label: "2 - Óbito por cólera", value: "2" },
                { label: "3 - Óbito por outras causas", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "dt_death", label: "Data do Óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_closing", label: "Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "additional_observations", label: "Informações Complementares e Observações (Deslocamentos/Alimentos)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    complementarySection,
    symptomsSection,
    diarrheaDetailsSection,
    attendanceSection,
    laboratorySection,
    treatmentSection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const choleraNotificationDefinition = defineNotificationType({
    id: 7,
    slug: "cholera",
    label: "Cólera",
    description: `Cólera é uma doença diarreica aguda causada pela ingestão de alimentos ou água contaminados com a bactéria Vibrio cholerae patogênico (Sorogrupos O1 e O139). Caracteriza-se por diarreia aquosa abundante, podendo levar a desidratação grave e choque em poucas horas se não tratada.`,
    sections,
});