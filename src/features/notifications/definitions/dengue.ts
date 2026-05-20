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

const yesNoOptions = [
    { label: "1 - Sim", value: "1" },
    { label: "2 - Não", value: "2" },
];

const labResultOptions = [
    { label: "1 - Positivo/Reagente", value: "1" },
    { label: "2 - Negativo/Não Reagente", value: "2" },
    { label: "3 - Inconclusivo", value: "3" },
    { label: "4 - Não Realizado", value: "4" },
];

// -----------------------------------------------------------------------------
// 1. DADOS GERAIS (Campos 1 a 7)
// -----------------------------------------------------------------------------
const generalSection = {
    id: "general",
    title: "Dados Gerais",
    description: "Informações básicas da notificação e unidade de saúde. [cite: 6]",
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
            defaultValue: "",
            options: [
                { label: "1 - DENGUE", value: "1" },
                { label: "2 - CHIKUNGUNYA", value: "2" },
            ],
        },
        {
            name: "cid10",
            label: "Código (CID10)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
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
            label: "UF de Notificação",
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
            name: "dt_first_symptoms",
            label: "Data dos Primeiros Sintomas",
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
    description: "Identificação e dados sociodemográficos da Notificação Individual. [cite: 5]",
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
            name: "patient_age",
            label: "Idade (com código da unidade)",
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
            options: educationLevelOptions,
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
// 3. DADOS DE RESIDÊNCIA (Campos 17 a 30)
// -----------------------------------------------------------------------------
const residenceSection = {
    id: "residence",
    title: "Dados de Residência",
    description: "Informações de endereço de residência do paciente. [cite: 4]",
    columns: 3,
    fields: [
        {
            name: "residence_state",
            label: "UF",
            kind: "text",
            schema: z.string().min(2, "UF obrigatória"),
            defaultValue: "",
        },
        {
            name: "residence_city",
            label: "Município de Residência",
            kind: "text",
            schema: z.string().min(1, "Município obrigatório"),
            defaultValue: "",
        },
        {
            name: "residence_district",
            label: "Distrito",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_neighborhood",
            label: "Bairro",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_street",
            label: "Logradouro (rua, avenida,...)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_number",
            label: "Número",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_complement",
            label: "Complemento (apto., casa, ...)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_geo1",
            label: "Geo campo 1",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_geo2",
            label: "Geo campo 2",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_reference",
            label: "Ponto de Referência",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_cep",
            label: "CEP",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "residence_phone",
            label: "(DDD) Telefone",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
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
        {
            name: "residence_country",
            label: "País (se residente fora do Brasil)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. DADOS CLÍNICOS E DOENÇAS PRÉ-EXISTENTES (Campos 31 a 34)
// -----------------------------------------------------------------------------
const clinicalSection = {
    id: "clinical",
    title: "Dados Clínicos",
    description: "Sinais clínicos, ocupação e doenças pré-existentes. [cite: 2, 74]",
    columns: 3,
    fields: [
        {
            name: "dt_investigation",
            label: "Data da Investigação",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "occupation",
            label: "Ocupação",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        // Sinais clínicos
        { name: "st_fever", label: "Febre", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_myalgia", label: "Mialgia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_headache", label: "Cefaleia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_exanthema", label: "Exantema", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_vomiting", label: "Vômito", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_nausea", label: "Náuseas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_back_pain", label: "Dor nas costas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_conjunctivitis", label: "Conjuntivite", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_arthritis", label: "Artrite", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_severe_arthralgia", label: "Artralgia intensa", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_petechiae", label: "Petéquias", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_leukopenia", label: "Leucopenia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_tourniquet_test", label: "Prova do laço positiva", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_retroorbital_pain", label: "Dor retroorbital", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },

        // Doenças pré-existentes
        { name: "st_diabetes", label: "Diabetes", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_hematological", label: "Doenças hematológicas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_hepatopathy", label: "Hepatopatias", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_chronic_renal", label: "Doença renal crônica", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_hypertension", label: "Hipertensão arterial", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_peptic_acid", label: "Doença ácido-péptica", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "st_autoimmune", label: "Doenças auto-imunes", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. DADOS LABORATORIAIS (Campos 35 a 49)
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados Laboratoriais",
    description: "Testes sorológicos, moleculares e isolamento viral para Dengue e Chikungunya. [cite: 1, 74]",
    columns: 3,
    fields: [
        { name: "dt_chik_igm_s1", label: "Sorologia Chikungunya S1 - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 107, 110, 112]
        { name: "dt_chik_igm_s2", label: "Sorologia Chikungunya S2 - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 107, 110, 112]
        { name: "dt_chik_prnt", label: "Exame PRNT Chikungunya - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 108, 111, 115]
        { name: "res_chik_prnt", label: "Exame PRNT Chikungunya - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions }, // [cite: 109, 118, 119]

        { name: "dt_den_igm", label: "Sorologia (IgM) Dengue - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 120, 122]
        { name: "res_den_igm", label: "Sorologia (IgM) Dengue - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions }, // [cite: 123, 128, 131]

        { name: "dt_den_ns1", label: "Exame NS1 - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 121, 125]
        { name: "res_den_ns1", label: "Exame NS1 - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions }, // [cite: 126, 129, 130, 132]

        { name: "dt_isolation", label: "Isolamento Viral - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 133, 139]
        { name: "res_isolation", label: "Isolamento Viral - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions }, // [cite: 134, 140, 141, 146]

        { name: "dt_rtpcr", label: "RT-PCR - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 136, 142]
        { name: "res_rtpcr", label: "RT-PCR - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions }, // [cite: 137, 143, 144, 145, 147]

        {
            name: "den_serotype",
            label: "Sorotipo",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - DENV 1", value: "1" },
                { label: "2 - DENV 2", value: "2" },
                { label: "3 - DENV 3", value: "3" },
                { label: "4 - DENV 4", value: "4" },
            ],
        },
        {
            name: "res_histopathology",
            label: "Histopatologia",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Compatível", value: "1" },
                { label: "2 - Incompatível", value: "2" },
                { label: "3 - Inconclusivo", value: "3" },
                { label: "4 - Não realizado", value: "4" },
            ],
        },
        { name: "res_immunohistochemistry", label: "Imunohistoquímica", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions }, // [cite: 156, 160]
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. HOSPITALIZAÇÃO E LOCAL PROVÁVEL DE INFECÇÃO (Campos 50 a 61)
// -----------------------------------------------------------------------------
const hospitalizationSection = {
    id: "hospitalization",
    title: "Hospitalização e Infecção",
    description: "Dados da internação e local provável da infecção nos últimos 15 dias. [cite: 167, 177]",
    columns: 3,
    fields: [
        { name: "st_hospitalization", label: "Ocorreu Hospitalização?", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: yesNoUnknownOptions }, // [cite: 169, 172]
        { name: "dt_hospitalization", label: "Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 169]
        { name: "hospital_uf", label: "UF do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 168]
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 170]
        { name: "hospital_name", label: "Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 174]
        { name: "hospital_phone", label: "(DDD) Telefone (Hospital)", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 176]

        {
            name: "st_autochthonous",
            label: "O caso é autóctone do município de residência?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Indeterminado", value: "3" },
            ],
        },
        { name: "infection_uf", label: "UF (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 183]
        { name: "infection_country", label: "País (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 184]
        { name: "infection_city", label: "Município (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 186]
        { name: "infection_district", label: "Distrito (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 188]
        { name: "infection_neighborhood", label: "Bairro (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 189]
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. DENGUE COM SINAIS DE ALARME E DENGUE GRAVE (Campos 68 a 71)
// -----------------------------------------------------------------------------
const severeDengueSection = {
    id: "severe_dengue",
    title: "Dengue com Sinais de Alarme e Dengue Grave",
    description: "Sinais de gravidade e alarme no desenvolvimento da Dengue. [cite: 165, 207]",
    columns: 3,
    fields: [
        { name: "dt_alarm_signs", label: "Data de início dos sinais de alarme", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 212, 218]
        { name: "al_persistent_vomiting", label: "Vômitos persistentes", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 208, 210, 213]
        { name: "al_abdominal_pain", label: "Dor abdominal intensa e contínua", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 215, 221]
        { name: "al_fluid_accumulation", label: "Acúmulo de líquidos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 223]
        { name: "al_mucosal_bleeding", label: "Sangramento de mucosa/outras hemorr.", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 226]
        { name: "al_hematocrit_increase", label: "Aumento progressivo do hematócrito", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 211, 216]
        { name: "al_hepatomegaly", label: "Hepatomegalia >= 2cm", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 217]
        { name: "al_postural_hypotension", label: "Hipotensão postural e/ou lipotímia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 219]
        { name: "al_lethargy", label: "Letargia ou irritabilidade", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 221]
        { name: "al_platelet_drop", label: "Queda abrupta de plaquetas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 224]

        { name: "dt_severity_signs", label: "Data de início dos sinais de gravidade", kind: "date", schema: optionalTextSchema, defaultValue: "" }, // [cite: 254, 256]
        { name: "sev_hematemesis", label: "Grave: Hematêmese", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 227, 231]
        { name: "sev_melena", label: "Grave: Melena", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 237]
        { name: "sev_metrorrhagia", label: "Grave: Metrorragia volumosa", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 232]
        { name: "sev_cns_bleeding", label: "Grave: Sangramento do SNC", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 238]

        { name: "sev_weak_pulse", label: "Grave: Pulso débil ou indetectável", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 234]
        { name: "sev_tachycardia", label: "Grave: Taquicardia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 235]
        { name: "sev_convergent_bp", label: "Grave: PA convergente <= 20 mmHg", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 241]
        { name: "sev_cold_extremities", label: "Grave: Extremidades frias/Enchim. capilar", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 241, 243]
        { name: "sev_late_hypotension", label: "Grave: Hipotensão arterial tardia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 245, 251]
        { name: "sev_respiratory_fluid", label: "Grave: Acúmulo líq. c/ insuf. respiratória", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 252]

        { name: "sev_ast_alt", label: "Grave: AST/ALT > 1.000", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 247]
        { name: "sev_consciousness", label: "Grave: Alteração da consciência", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 249, 248]
        { name: "sev_myocarditis", label: "Grave: Miocardite", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions }, // [cite: 248]
        { name: "sev_other_organs", label: "Grave: Outros órgãos (Especificar)", kind: "text", schema: optionalTextSchema, defaultValue: "" }, // [cite: 253]
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. CONCLUSÃO DO CASO (Campos 62 a 67)
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final, evolução e encerramento. [cite: 166]",
    columns: 3,
    fields: [
        {
            name: "tp_final_classification",
            label: "Classificação Final", // [cite: 190]
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "5 - Descartado", value: "5" }, // [cite: 179]
                { label: "10 - Dengue", value: "10" }, // [cite: 179]
                { label: "11 - Dengue com Sinais de Alarme", value: "11" }, // [cite: 179]
                { label: "12 - Dengue Grave", value: "12" }, // [cite: 180]
                { label: "13 - Chikungunya", value: "13" }, // [cite: 180]
            ],
        },
        {
            name: "tp_confirmation_criteria",
            label: "Critério de Confirmação/Descarte", // [cite: 191, 193]
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Laboratório", value: "1" },
                { label: "2 - Clínico-Epidemiológico", value: "2" },
                { label: "3 - Em investigação", value: "3" },
            ],
        },
        {
            name: "tp_clinical_presentation",
            label: "Apresentação clínica (Chikungunya)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Aguda", value: "1" },
                { label: "2 - Crônica", value: "2" },
            ],
        },
        {
            name: "tp_evolution",
            label: "Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Cura", value: "1" },
                { label: "2 - Óbito pelo agravo", value: "2" },
                { label: "3 - Óbito por outras causas", value: "3" },
                { label: "4 - Óbito em investigação", value: "4" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        {
            name: "dt_death",
            label: "Data do Óbito",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "dt_closing",
            label: "Data do Encerramento",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "additional_observations",
            label: "Informações Complementares e Observações Adicionais",
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
    clinicalSection,
    laboratorySection,
    hospitalizationSection,
    severeDengueSection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const dengueChikungunyaNotificationDefinition = defineNotificationType({
    id: 9,
    slug: "dengue_chikungunya",
    label: "Dengue e Chikungunya",
    description: `Caso suspeito de dengue: pessoa que viva ou tenha viajado nos últimos 14 dias para área onde esteja ocorrendo transmissão e apresente febre acompanhada de duas ou mais manifestações. Chikungunya: febre de início súbito e artralgia ou artrite intensa. [cite: 10, 11, 12]`,
    sections,
});