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
    description: "Capture o retrato do paciente na notificação, mesmo quando ele já existe no cadastro geral.",
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
// 3. DADOS COMPLEMENTARES DO CASO (ANTECEDENTES EPIDEMIOLÓGICOS)
// -----------------------------------------------------------------------------
const epidemiologicalSection = {
    id: "epidemiological",
    title: "Dados Complementares do Caso / Exposição",
    description: "Informações sobre a exposição ao vírus rábico e antecedentes.",
    columns: 3,
    fields: [
        { name: "dt_investigation", label: "Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Tipo de Exposição
        { name: "exposure_scratch", label: "Exposição: Arranhão", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "exposure_bite", label: "Exposição: Mordedura", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "exposure_lick", label: "Exposição: Lambedura", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "exposure_indirect", label: "Exposição: Contato Indireto", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Localização
        { name: "loc_mucosa", label: "Localização: Mucosa", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_head_neck", label: "Localização: Cabeça/Pescoço", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_hands", label: "Localização: Mãos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_feet", label: "Localização: Pés", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_trunk", label: "Localização: Tronco", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_upper_limbs", label: "Localização: Membros Superiores", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_lower_limbs", label: "Localização: Membros Inferiores", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Ferimento
        {
            name: "wound_type_count",
            label: "Ferimento",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Único", value: "1" },
                { label: "2 - Múltiplo", value: "2" },
                { label: "3 - Sem Ferimento", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "wound_deep", label: "Ferimento Profundo", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "wound_superficial", label: "Ferimento Superficial", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "wound_tearing", label: "Ferimento Dilacerante", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "dt_exposure", label: "Data da Exposição", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "history_rabies_treatment", label: "Tem Antecedentes de Tratamento Anti-Rábico?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        // Antecedentes de Tratamento Anti-Rábico
        { name: "history_pre_exposure", label: "Antecedente: Pré-Exposição", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "history_post_exposure", label: "Antecedente: Pós-Exposição", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "history_doses", label: "Número de Doses Aplicadas", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_history_last_dose", label: "Data da Última Dose", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        // Animal Agressor
        {
            name: "animal_species",
            label: "Espécie do Animal Agressor",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Canina", value: "1" },
                { label: "2 - Felina", value: "2" },
                { label: "3 - Quiróptera (Morcego)", value: "3" },
                { label: "4 - Primata (Macaco)", value: "4" },
                { label: "5 - Raposa", value: "5" },
                { label: "6 - Herbívora", value: "6" },
                { label: "7 - Outra", value: "7" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "animal_vaccinated", label: "Animal Vacinado", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. ATENDIMENTO E SINAIS/SINTOMAS
// -----------------------------------------------------------------------------
const clinicalSection = {
    id: "clinical",
    title: "Atendimento Clínico",
    description: "Informações sobre hospitalização e sinais ou sintomas apresentados.",
    columns: 3,
    fields: [
        { name: "dt_first_symptoms", label: "Data dos Primeiros Sintomas", kind: "date", schema: z.string().min(1, "Data dos primeiros sintomas é obrigatória"), defaultValue: "" },
        { name: "hospitalized", label: "Ocorreu Hospitalização?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_hospitalization", label: "Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_uf", label: "UF (Hospital)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_name", label: "Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Sinais e Sintomas
        { name: "symp_aerophobia", label: "Sintoma: Aerofobia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_hydrophobia", label: "Sintoma: Hidrofobia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_dysphagia", label: "Sintoma: Disfagia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_paresthesia", label: "Sintoma: Parestesia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_aggressiveness", label: "Sintoma: Agressividade", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_paralysis", label: "Sintoma: Paralisia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_psychomotor_agitation", label: "Sintoma: Agitação Psicomotora", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_fever", label: "Sintoma: Febre", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_others", label: "Sintoma: Outro(s)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_others_description", label: "Se Outro(s), quais?", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. TRATAMENTO ATUAL
// -----------------------------------------------------------------------------
const treatmentSection = {
    id: "treatment",
    title: "Tratamento Atual",
    description: "Informações sobre vacina e soro antirrábico aplicados após a exposição atual.",
    columns: 3,
    fields: [
        { name: "current_vaccine", label: "Aplicação de Vacina Anti-Rábica Atualmente", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_treatment_start", label: "Data do Início do Tratamento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "current_doses", label: "Número de Doses Aplicadas", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_first_dose", label: "Data da 1ª Dose da Vacina", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_last_dose", label: "Data da Última Dose da Vacina", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        { name: "serum_applied", label: "Foi aplicado soro?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_serum_applied", label: "Se Sim, Data da Aplicação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "serum_quantity_ml", label: "Quantidade de Soro Aplicado (ml)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "serum_infiltration",
            label: "Infiltração de Soro no(s) Local(ais)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Sim, Total", value: "1" },
                { label: "2 - Sim, Parcial", value: "2" },
                { label: "3 - Não", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final e dados laboratoriais do caso de Raiva Humana.",
    columns: 3,
    fields: [
        {
            name: "lab_diagnosis",
            label: "Diagnóstico Laboratorial",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Positivo", value: "1" },
                { label: "2 - Negativo", value: "2" },
                { label: "3 - Inconclusivo", value: "3" },
                { label: "4 - Não realizado", value: "4" },
            ]
        },
        { name: "lab_direct_immunofluorescence", label: "Imunofluorescência direta", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "lab_biological_test", label: "Prova biológica", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "lab_histological", label: "Histológico", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "lab_indirect_immunofluorescence", label: "Imunofluorescência indireta", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "lab_variant", label: "Variante", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        {
            name: "final_classification",
            label: "Classificação Final",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Confirmado", value: "1" },
                { label: "2 - Descartado", value: "2" },
            ]
        },
        {
            name: "confirmation_criterion",
            label: "Critério de Confirmação/Descarte",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Laboratório", value: "1" },
                { label: "2 - Óbito c/ Clínica Compatível + Vínculo Epid.", value: "2" },
                { label: "3 - Evolução Clínica Incompatível", value: "3" },
            ]
        },
        {
            name: "autochthonous",
            label: "Caso é autóctone do município de residência?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Indeterminado", value: "3" },
            ]
        },

        // Local Provável da Fonte de Infecção
        { name: "infection_uf", label: "UF (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_country", label: "País (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_city", label: "Município (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_district", label: "Distrito (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_neighborhood", label: "Bairro (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "infection_zone",
            label: "Zona (Infecção)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Urbana", value: "1" },
                { label: "2 - Rural", value: "2" },
                { label: "3 - Periurbana", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },

        { name: "work_related", label: "Doença Relacionada ao Trabalho", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_death", label: "Data do Óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_closing", label: "Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    ]
} satisfies NotificationSectionDefinition;

const sections = [
    patientSection,
    residenceSection,
    epidemiologicalSection,
    clinicalSection,
    treatmentSection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const rabiesNotificationDefinition = defineNotificationType({
    id: 18,
    slug: "rabies",
    label: "Raiva Humana",
    description: `Ficha de investigação para Raiva Humana (CID10 A82.9). Caso suspeito: Todo paciente com quadro clínico sugestivo de encefalite rábica, com antecedentes ou não de exposição à infecção pelo vírus rábico.`,
    sections,
});