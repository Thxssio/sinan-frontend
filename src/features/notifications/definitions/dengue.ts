import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    raceColorOptions,
    sexOptions,
    timeUnitOptions,
    yesNoUnknownOptions,
    yesNoOptions,
    labResultOptions,
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
        { name: "patient_birth_date", label: "Data de Nascimento", kind: "date", schema: z.string().min(1, "Data de nascimento obrigatória"), defaultValue: "" },
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
        { name: "race_color", label: "Raça/Cor", kind: "select", schema: z.string().min(1, "Raça/Cor obrigatória"), defaultValue: "unknown", options: raceColorOptions },
        { name: "education_level", label: "Escolaridade", kind: "select", schema: z.string().min(1, "Escolaridade obrigatória"), defaultValue: "unknown", options: educationLevelOptions },
        { name: "sus_card_number", label: "Número do Cartão SUS", kind: "text", schema: z.string().min(1, "Cartão SUS obrigatório"), defaultValue: "" },
        { name: "mother_name", label: "Nome da mãe", kind: "text", schema: optionalTextSchema, defaultValue: "" },
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
// 3. DADOS CLÍNICOS E DOENÇAS PRÉ-EXISTENTES
// -----------------------------------------------------------------------------
const clinicalSection = {
    id: "clinical",
    title: "Dados Clínicos",
    description: "Sinais clínicos, ocupação e doenças pré-existentes.",
    columns: 3,
    fields: [
        { name: "dt_investigation", label: "Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        // Sinais clínicos (Usando yesNoOptions do shared)
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
// 4. DADOS LABORATORIAIS
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados Laboratoriais",
    description: "Testes sorológicos, moleculares e isolamento viral para Dengue e Chikungunya.",
    columns: 3,
    fields: [
        { name: "dt_chik_igm_s1", label: "Sorologia Chikungunya S1 - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_chik_igm_s2", label: "Sorologia Chikungunya S2 - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_chik_prnt", label: "Exame PRNT Chikungunya - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "res_chik_prnt", label: "Exame PRNT Chikungunya - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions },
        { name: "dt_den_igm", label: "Sorologia (IgM) Dengue - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "res_den_igm", label: "Sorologia (IgM) Dengue - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions },
        { name: "dt_den_ns1", label: "Exame NS1 - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "res_den_ns1", label: "Exame NS1 - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions },
        { name: "dt_isolation", label: "Isolamento Viral - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "res_isolation", label: "Isolamento Viral - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions },
        { name: "dt_rtpcr", label: "RT-PCR - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "res_rtpcr", label: "RT-PCR - Resultado", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions },
        {
            name: "den_serotype",
            label: "Sorotipo",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - DENV 1", value: "1" }, { label: "2 - DENV 2", value: "2" },
                { label: "3 - DENV 3", value: "3" }, { label: "4 - DENV 4", value: "4" },
            ],
        },
        {
            name: "res_histopathology",
            label: "Histopatologia",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Compatível", value: "1" }, { label: "2 - Incompatível", value: "2" },
                { label: "3 - Inconclusivo", value: "3" }, { label: "4 - Não realizado", value: "4" },
            ],
        },
        { name: "res_immunohistochemistry", label: "Imunohistoquímica", kind: "select", schema: optionalTextSchema, defaultValue: "", options: labResultOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. HOSPITALIZAÇÃO E LOCAL PROVÁVEL DE INFECÇÃO
// -----------------------------------------------------------------------------
const hospitalizationSection = {
    id: "hospitalization",
    title: "Hospitalização e Infecção",
    description: "Dados da internação e local provável da infecção nos últimos 15 dias.",
    columns: 3,
    fields: [
        { name: "st_hospitalization", label: "Ocorreu Hospitalização?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_hospitalization", label: "Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_uf", label: "UF do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_name", label: "Nome do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_phone", label: "(DDD) Telefone (Hospital)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "st_autochthonous",
            label: "O caso é autóctone do município de residência?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Sim", value: "yes" }, { label: "Não", value: "no" }, { label: "Indeterminado", value: "indeterminate" },
            ],
        },
        { name: "infection_uf", label: "UF (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_country", label: "País (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_city", label: "Município (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_district", label: "Distrito (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "infection_neighborhood", label: "Bairro (Infecção)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. DENGUE COM SINAIS DE ALARME E DENGUE GRAVE
// -----------------------------------------------------------------------------
const severeDengueSection = {
    id: "severe_dengue",
    title: "Dengue com Sinais de Alarme e Dengue Grave",
    description: "Sinais de gravidade e alarme no desenvolvimento da Dengue.",
    columns: 3,
    fields: [
        { name: "dt_alarm_signs", label: "Data de início dos sinais de alarme", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "al_persistent_vomiting", label: "Vômitos persistentes", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_abdominal_pain", label: "Dor abdominal intensa e contínua", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_fluid_accumulation", label: "Acúmulo de líquidos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_mucosal_bleeding", label: "Sangramento de mucosa/outras hemorr.", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_hematocrit_increase", label: "Aumento progressivo do hematócrito", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_hepatomegaly", label: "Hepatomegalia >= 2cm", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_postural_hypotension", label: "Hipotensão postural e/ou lipotímia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_lethargy", label: "Letargia ou irritabilidade", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "al_platelet_drop", label: "Queda abrupta de plaquetas", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "dt_severity_signs", label: "Data de início dos sinais de gravidade", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "sev_hematemesis", label: "Grave: Hematêmese", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_melena", label: "Grave: Melena", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_metrorrhagia", label: "Grave: Metrorragia volumosa", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_cns_bleeding", label: "Grave: Sangramento do SNC", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_weak_pulse", label: "Grave: Pulso débil ou indetectável", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_tachycardia", label: "Grave: Taquicardia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_convergent_bp", label: "Grave: PA convergente <= 20 mmHg", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_cold_extremities", label: "Grave: Extremidades frias/Enchim. capilar", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_late_hypotension", label: "Grave: Hipotensão arterial tardia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_respiratory_fluid", label: "Grave: Acúmulo líq. c/ insuf. respiratória", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_ast_alt", label: "Grave: AST/ALT > 1.000", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_consciousness", label: "Grave: Alteração da consciência", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_myocarditis", label: "Grave: Miocardite", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoOptions },
        { name: "sev_other_organs", label: "Grave: Outros órgãos (Especificar)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. CONCLUSÃO DO CASO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final, evolução e encerramento.",
    columns: 3,
    fields: [
        {
            name: "tp_final_classification",
            label: "Classificação Final",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "5 - Descartado", value: "5" }, { label: "10 - Dengue", value: "10" },
                { label: "11 - Dengue com Sinais de Alarme", value: "11" }, { label: "12 - Dengue Grave", value: "12" },
                { label: "13 - Chikungunya", value: "13" },
            ],
        },
        {
            name: "tp_confirmation_criteria",
            label: "Critério de Confirmação/Descarte",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Laboratório", value: "1" }, { label: "2 - Clínico-Epidemiológico", value: "2" },
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
                { label: "1 - Aguda", value: "1" }, { label: "2 - Crônica", value: "2" },
            ],
        },
        {
            name: "tp_evolution",
            label: "Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: [
                { label: "1 - Cura", value: "1" }, { label: "2 - Óbito pelo agravo", value: "2" },
                { label: "3 - Óbito por outras causas", value: "3" }, { label: "4 - Óbito em investigação", value: "4" },
                { label: "Ignorado", value: "unknown" },
            ],
        },
        { name: "dt_death", label: "Data do Óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_closing", label: "Data do Encerramento", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "additional_observations", label: "Informações Complementares e Observações Adicionais", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

const sections = [
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
    description: `Caso suspeito de dengue: pessoa que viva ou tenha viajado nos últimos 14 dias para área onde esteja ocorrendo transmissão e apresente febre acompanhada de duas ou mais manifestações. Chikungunya: febre de início súbito e artralgia ou artrite intensa.`,
    sections,
});