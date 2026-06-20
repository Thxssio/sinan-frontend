import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    timeUnitOptions,
    yesNoUnknownOptions,
    woundsOptions,
    animalConditionOptions,
    animalSpeciesOptions,
    type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared";

const optionalTextSchema = z.string().optional();

// -----------------------------------------------------------------------------
// 1. DADOS DO PACIENTE
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Dados do Paciente",
    description: "Identificação e dados sociodemográficos da Notificação Individual.",
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
        { name: "mother_name", label: "Nome da mãe", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
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
            defaultValue: "unknown",
            options: [
                { label: "1 - Urbana", value: "1" }, { label: "2 - Rural", value: "2" },
                { label: "3 - Periurbana", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "residence_country", label: "País (se residente fora do Brasil)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 3. TIPO DE EXPOSIÇÃO AO VÍRUS RÁBICO
// -----------------------------------------------------------------------------
const exposureTypeSection = {
    id: "exposure_type",
    title: "Tipo de Exposição ao Vírus Rábico",
    description: "Tipo de contatos que levaram a exposição ao vírus rábico.",
    columns: 3,
    fields: [
        { name: "st_indirect_contact", label: "Contato Indireto", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_scrath", label: "Arranhadura", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_licking", label: "Lambedura", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_bite", label: "Mordedura", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_other", label: "Outro", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. LOCALIZAÇÃO DO CONTATO
// -----------------------------------------------------------------------------
const locationSection = {
    id: "location",
    title: "Localização",
    description: "Local do corpo que ocorreu o contato",
    columns: 3,
    fields: [
        { name: "st_mucosa", label: "Mucosa", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_head_neck", label: "Cabeça/Pescoço", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_hand_feet", label: "Mãos/Pés", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_trunk", label: "Tronco", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_upper_extremities", label: "Membros Superiores", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_lower_extremities", label: "Membros Inferiores", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. CARACTERÍSTICAS DO FERIMENTO
// -----------------------------------------------------------------------------
const woundSection = {
    id: "wound",
    title: "Ferimento",
    description: "Tipo de Ferimento",
    columns: 2,
    fields: [
        { name: "st_wound", label: "Ferimento", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: woundsOptions },
        { name: "st_deep_wound", label: "Ferimento Profundo", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_superficial_wound", label: "Ferimento Superficial", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "st_avulsion_wound", label: "Ferimento Dilacerante", kind: "select", schema: z.string().min(1, "Obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. ANTECEDENTES EPIDEMIOLÓGICOS E ANIMAL
// -----------------------------------------------------------------------------
const treatmentSection = {
    id: "treatment",
    title: "Antecedentes Epidemiológicos",
    description: "Histórico de tratamentos e dados do animal agressor.",
    columns: 2,
    fields: [
        { name: "expo_date", label: "Data da Exposição", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "previous_treatment", label: "Antecedentes de Tratamento Anti-Rábico?", kind: "select", schema: z.string().min(1, "Campo obrigatório"), defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "indicated_treatment",
            label: "Se Houve antecedentes, quando foi concluído?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Até 90 dias", value: "1" }, { label: "2 - Após 90 dias", value: "2" },
            ],
        },
        { name: "dose_number", label: "Nº de Doses Aplicadas", kind: "number", schema: optionalTextSchema, defaultValue: "" },
        { name: "animal_species", label: "Espécie do Animal Agressor", kind: "select", schema: z.string().min(1, "Espécie obrigatória"), defaultValue: "", options: animalSpeciesOptions },
        { name: "animal_condition", label: "Condição do Animal", kind: "select", schema: optionalTextSchema, defaultValue: "", options: animalConditionOptions },
        { name: "observable_animal", label: "Animal Passível de Observação?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. TRATAMENTO ATUAL
// -----------------------------------------------------------------------------
const currentTreatmentSection = {
    id: "current_treatment",
    title: "Tratamento Atual",
    description: "Informações sobre a conduta e o tratamento atual.",
    columns: 3,
    fields: [
        {
            name: "indicated_treatment",
            label: "Tratamento Indicado",
            kind: "select",
            schema: z.string().min(1, "Tratamento indicado obrigatório"),
            defaultValue: "",
            options: [
                { label: "1 - Pré Exposição", value: "1" }, { label: "2 - Dispensa de Tratamento", value: "2" },
                { label: "3 - Observação do animal (se cão ou gato)", value: "3" }, { label: "4 - Observação + Vacina", value: "4" },
                { label: "5 - Vacina", value: "5" }, { label: "6 - Soro + Vacina", value: "6" },
                { label: "7 - Esquema de Reexposição", value: "7" },
            ],
        },
        {
            name: "vaccine_producer",
            label: "Laboratório Produtor Vacina",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Instituto Butantan", value: "1" }, { label: "2 - Instituto Vital Brasil", value: "2" },
                { label: "3 - Aventis Pasteur", value: "3" }, { label: "4 - Outro", value: "4" },
            ],
        },
        { name: "lot_number", label: "Número do Lote", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "expire_date", label: "Data do Vencimento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccine1_date", label: "Data da 1ª dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccine2_date", label: "Data da 2ª dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccine3_date", label: "Data da 3ª dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccine4_date", label: "Data da 4ª dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "vaccine5_date", label: "Data da 5ª dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "pos_observable_animal",
            label: "Condição Final do Animal",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Negativo para Raiva (Clínica)", value: "1" }, { label: "2 - Negativo para Raiva (Laboratório)", value: "2" },
                { label: "3 - Positivo para Raiva (Clínica)", value: "3" }, { label: "4 - Positivo para Raiva (Laboratório)", value: "4" },
                { label: "5 - Morto / Sacrificado / Sem Diagnóstico", value: "5" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "treatment_interruption", label: "Houve Interrupção do Tratamento", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "interruption_reason",
            label: "Qual o Motivo da Interrupção?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Indicação da Unidade de Saúde", value: "1" }, { label: "2 - Abandono", value: "2" },
                { label: "3 - Transferência", value: "3" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "treatment_interruption_call", label: "Se Abandono, a Unidade procurou o Paciente?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "patient_weight", label: "Peso do Paciente (Kg)", kind: "number", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "type_serum",
            label: "Tipo de Soro Aplicado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Heterólogo", value: "1" }, { label: "2 - Homólogo", value: "2" }, { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "amount_serum", label: "Quantidade de Soro Aplicada", kind: "number", schema: optionalTextSchema, defaultValue: "" },
        { name: "serum_infiltration_total", label: "Infiltração de Soro Total no Local?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "serum_infiltration_parcial", label: "Infiltração de Soro Parcial no Local?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "serum_producer",
            label: "Laboratório Produtor do Soro",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Instituto Butantan", value: "1" }, { label: "2 - Instituto Vital Brasil", value: "2" },
                { label: "3 - Aventis Pasteur", value: "3" }, { label: "4 - Outro", value: "4" },
            ],
        },
        { name: "match_number", label: "Número da Partida", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "adverse_event", label: "Evento Adverso à Vacina/Soro", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "end_case_date", label: "Data do Encerramento do Caso", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    exposureTypeSection,
    locationSection,
    woundSection,
    treatmentSection,
    currentTreatmentSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const antiRabiesNotificationDefinition = defineNotificationType({
    id: 10,
    slug: "anti_rabies",
    label: "Atendimento Antirrábico",
    description: "Notificação de atendimento antirrábico humano após exposição ao vírus rábico.",
    sections,
});