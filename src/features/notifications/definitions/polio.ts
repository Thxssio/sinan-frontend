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
    description: "Capture o retrato do paciente na notificação.",
    columns: 3,
    fields: [
        { name: "patient_name", label: "Nome", kind: "text", schema: z.string().min(3, "Nome obrigatório"), defaultValue: "" },
        { name: "patient_cpf", label: "CPF", kind: "text", schema: z.string().min(11, "CPF obrigatório"), defaultValue: "" },
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
// 3. ANTECEDENTES EPIDEMIOLÓGICOS E VACINAIS
// -----------------------------------------------------------------------------
const epidemiologicalSection = {
    id: "epidemiological",
    title: "Antecedentes Epidemiológicos e Vacinais",
    description: "Investigação, vacinação e histórico de viagens.",
    columns: 3,
    fields: [
        { name: "dt_first_symptoms", label: "Data dos Primeiros Sintomas", kind: "date", schema: z.string().min(1, "Obrigatória"), defaultValue: "" },
        { name: "dt_first_consultation", label: "Data da 1ª Consulta", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_investigation", label: "Data da Investigação", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        { name: "polio_vaccine", label: "Tomou Vacina Contra Poliomielite", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "valid_doses", label: "Número de doses válidas", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_last_vaccine_dose", label: "Data da Última Dose da Vacina", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        { name: "traveled_endemic_area", label: "Viajou/recebeu visitas de áreas endêmicas (30 dias)?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "country_of_origin", label: "Se sim, País de origem", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. DADOS CLÍNICOS E NEUROLÓGICOS (Fase Aguda)
// -----------------------------------------------------------------------------
const clinicalNeurologicalSection = {
    id: "clinical_neurological",
    title: "Dados Clínicos e Neurológicos (Fase Aguda)",
    description: "Sinais, sintomas, e exame neurológico detalhado.",
    columns: 3,
    fields: [
        // Sinais e Sintomas Gerais
        { name: "symp_fever", label: "Febre", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_muscle_pain", label: "Dores Musculares", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_vomiting", label: "Vômitos", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_headache", label: "Cefaléia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_diarrhea", label: "Diarréia", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_respiratory", label: "Sint. Respiratórios", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_constipation", label: "Obstipação", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "symp_others", label: "Outros", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "dt_motor_deficit", label: "Data Início da Def. Motora", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        // Deficiência Motora Detalhes
        { name: "motor_def_acute", label: "Def. Motora Aguda", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "motor_def_flaccid", label: "Flácida", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "motor_def_asymmetric", label: "Assimétrica", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "motor_def_progression", label: "Progressão Após 3 Dias", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "motor_def_ascending", label: "Ascendente", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "motor_def_descending", label: "Descendente", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Força e Localização
        {
            name: "muscle_strength",
            label: "Força Muscular Geral",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuída", value: "1" },
                { label: "2 - Ausente", value: "2" },
                { label: "3 - Normal", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        {
            name: "localization",
            label: "Localização",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Distal", value: "1" },
                { label: "2 - Proximal", value: "2" },
                { label: "3 - Todo o membro", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "loc_mie", label: "Compromete: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_mse", label: "Compromete: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_mid", label: "Compromete: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_msd", label: "Compromete: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_resp", label: "Compromete: Musc. Respiratória", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_cervical", label: "Compromete: Musc. Cervical", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "loc_face", label: "Compromete: Face", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "dt_neurological_exam", label: "Data do Exame (Fase Aguda)", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "acute_muscle_tone",
            label: "Tônus Muscular",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuído", value: "1" }, { label: "2 - Ausente", value: "2" },
                { label: "3 - Normal", value: "3" }, { label: "4 - Aumentado", value: "4" }, { label: "9 - Ignorado", value: "9" }
            ]
        },
        {
            name: "acute_sensitivity",
            label: "Sensibilidade",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuída", value: "1" }, { label: "2 - Ausente", value: "2" }, { label: "3 - Normal", value: "3" },
                { label: "4 - Parestesia", value: "4" }, { label: "5 - Prejudicado", value: "5" }, { label: "9 - Ignorado", value: "9" }
            ]
        },
        {
            name: "acute_reflexes",
            label: "Reflexos",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuído", value: "1" }, { label: "2 - Ausente", value: "2" },
                { label: "3 - Normal", value: "3" }, { label: "4 - Aumentado", value: "4" }, { label: "9 - Ignorado", value: "9" }
            ]
        },
        // Detalhamentos do Campo 45 (Força Muscular)
        { name: "acute_strength_mie", label: "Força Muscular: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_strength_mse", label: "Força Muscular: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_strength_mid", label: "Força Muscular: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_strength_msd", label: "Força Muscular: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_strength_cervical", label: "Força Muscular: Musc. Cervical", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_strength_face", label: "Força Muscular: Face", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos do Campo 46 (Tônus Muscular)
        { name: "acute_tone_mie", label: "Tônus Muscular: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_tone_mse", label: "Tônus Muscular: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_tone_mid", label: "Tônus Muscular: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_tone_msd", label: "Tônus Muscular: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos do Campo 47 (Sensibilidade)
        { name: "acute_sens_mie", label: "Sensibilidade: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_sens_mse", label: "Sensibilidade: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_sens_mid", label: "Sensibilidade: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_sens_msd", label: "Sensibilidade: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_sens_face", label: "Sensibilidade: Face", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos do Campo 48 (Reflexos Específicos)
        { name: "acute_reflex_aquileu_e", label: "Reflexo: Aquileu E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_reflex_aquileu_d", label: "Reflexo: Aquileu D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_reflex_patelar_e", label: "Reflexo: Patelar E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_reflex_patelar_d", label: "Reflexo: Patelar D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_reflex_bicipital_e", label: "Reflexo: Bicipital E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_reflex_bicipital_d", label: "Reflexo: Bicipital D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_reflex_tricipital_e", label: "Reflexo: Tricipital E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "acute_reflex_tricipital_d", label: "Reflexo: Tricipital D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. ATENDIMENTO E OUTROS FATORES
// -----------------------------------------------------------------------------
const clinicalAttendanceSection = {
    id: "clinical_attendance",
    title: "Atendimento e Outros Fatores",
    description: "Sinais complementares, hospitalização e histórico tóxico.",
    columns: 3,
    fields: [
        { name: "plantar_reflex", label: "Reflexo Cutâneo Plantar", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "plantar_flexion_left", label: "Reflexo Plantar: Flexão E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "plantar_flexion_right", label: "Reflexo Plantar: Flexão D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "plantar_extension_left", label: "Reflexo Plantar: Extensão E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "plantar_extension_right", label: "Reflexo Plantar: Extensão D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "meningeal_irritation", label: "Sinais de Irritação Meníngea", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: [{ label: "1 - Ausente", value: "1" }, { label: "2 - Presente", value: "2" }, { label: "9 - Ignorado", value: "9" }] },

        { name: "meningeal_kernig", label: "Sinal: Kernig", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "meningeal_neck_stiffness", label: "Sinal: Rigidez de Nuca", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "meningeal_brudzinski", label: "Sinal: Brudzinski", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "toxic_contact", label: "Contato c/ Subst. Tóxicas", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "toxic_specify", label: "Se sim, especifique", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "im_injection_history", label: "História de Injeção Intramuscular", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        {
            name: "im_injection_site",
            label: "Local de Aplicação",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - MIE", value: "1" },
                { label: "2 - MSE", value: "2" },
                { label: "3 - MID", value: "3" },
                { label: "4 - MSD", value: "4" },
                { label: "5 - Glúteo E", value: "5" },
                { label: "6 - Glúteo D", value: "6" },
            ]
        },

        { name: "diagnostic_hypothesis", label: "Hipótese Diagnóstica (Tabela Anexa)", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        { name: "hospitalized", label: "Ocorreu Hospitalização", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "dt_hospitalization", label: "Data da Internação", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_uf", label: "UF (Hospital)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "hospital_city", label: "Município do Hospital", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. DADOS DO LABORATÓRIO E EXAMES
// -----------------------------------------------------------------------------
const laboratorySection = {
    id: "laboratory",
    title: "Dados do Laboratório e Exames",
    description: "Resultados virológicos, líquor e outros exames.",
    columns: 3,
    fields: [
        { name: "dt_sample_collection", label: "Data da Coleta (Fezes)", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_sent_local_to_state", label: "Envio Local p/ Estadual", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_sent_state_to_lrr", label: "Envio Estadual p/ LRR", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "dt_received_lrr", label: "Recebimento no LRR", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        { name: "sample_quantity", label: "Quantidade", kind: "select", schema: optionalTextSchema, defaultValue: "", options: [{ label: "1 - Suficiente", value: "1" }, { label: "2 - Insuficiente", value: "2" }] },
        { name: "sample_conditions", label: "Condições", kind: "select", schema: optionalTextSchema, defaultValue: "", options: [{ label: "1 - Temperatura Adequada", value: "1" }, { label: "2 - Temperatura Alterada", value: "2" }] },

        { name: "dt_lab_result", label: "Data do Resultado", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "lab_result_type",
            label: "Resultado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - P1 Vacinal", value: "1" },
                { label: "2 - P2 Vacinal", value: "2" },
                { label: "3 - P3 Vacinal", value: "3" },
                { label: "4 - P1 Selvagem", value: "4" },
                { label: "5 - P2 Selvagem", value: "5" },
                { label: "6 - P3 Selvagem", value: "6" },
                { label: "7 - Negativo", value: "7" },
                { label: "8 - Não pólio", value: "8" },
                { label: "9 - Outros", value: "9" },
                { label: "10 - Inconclusivo", value: "10" },
                { label: "11 - PVDV1", value: "11" },
                { label: "12 - PVDV2", value: "12" },
                { label: "13 - PVDV3", value: "13" },
            ]
        },
        // Líquor
        { name: "liquor_dt_collection", label: "Líquor - Data da Coleta", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "liquor_cells", label: "Líquor - Nº de Células/mm³", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "liquor_lymphocytes", label: "Líquor - Linfócitos %", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "liquor_proteins", label: "Líquor - Proteínas mg%", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "liquor_glucose", label: "Líquor - Glicose mg%", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "liquor_chloride", label: "Líquor - Cloreto mg%", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Exames Complementares: Eletroneuromiografia
        { name: "dt_eletroneuromiografia", label: "Eletroneuromiografia - Data", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        { name: "diag_eletroneuromiografia", label: "Diagnóstico Sugestivo", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // Anatomopatológico
        { name: "anatomopathological_collected", label: "Coletado Material Anatomop.?", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "anatomo_brain", label: "Anatomo: Cérebro", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "anatomo_medulla", label: "Anatomo: Medula", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "anatomo_intestine", label: "Anatomo: Intestino", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        { name: "dt_anatomo_collection", label: "Data da Coleta", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "anatomo_result",
            label: "Resultado Anatomop.",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Compatível com poliomielite", value: "1" },
                { label: "2 - Não compatível com poliomielite", value: "2" },
            ]
        },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. EVOLUÇÃO DO CASO (REVISITA)
// -----------------------------------------------------------------------------
const revisitSection = {
    id: "revisit",
    title: "Evolução do Caso (Revisita / 60 dias)",
    description: "Avaliação neurológica durante a revisita.",
    columns: 3,
    fields: [
        { name: "dt_revisit", label: "Data da Revisita", kind: "date", schema: optionalTextSchema, defaultValue: "" },

        {
            name: "revisit_muscle_strength",
            label: "Força Muscular",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuída", value: "1" },
                { label: "2 - Ausente", value: "2" },
                { label: "3 - Normal", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        {
            name: "revisit_muscle_tone",
            label: "Tônus Muscular",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuído", value: "1" },
                { label: "2 - Ausente", value: "2" },
                { label: "3 - Normal", value: "3" },
                { label: "4 - Aumentado", value: "4" },
                { label: "9 - Ignorado", value: "9" },
            ]
        },
        { name: "revisit_atrophy", label: "Atrofia", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: [{ label: "1 - Presente", value: "1" }, { label: "2 - Ausente", value: "2" }, { label: "9 - Ignorado", value: "9" }] },
        {
            name: "revisit_reflexes",
            label: "Reflexos (Revisita)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuído", value: "1" }, { label: "2 - Ausente", value: "2" },
                { label: "3 - Normal", value: "3" }, { label: "4 - Aumentado", value: "4" }, { label: "9 - Ignorado", value: "9" }
            ]
        },
        {
            name: "revisit_plantar_reflex",
            label: "Reflexo Cutâneo Plantar (Revisita)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "unknown",
            options: yesNoUnknownOptions
        },
        {
            name: "revisit_sensitivity",
            label: "Sensibilidade (Revisita)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Diminuída", value: "1" }, { label: "2 - Ausente", value: "2" }, { label: "3 - Normal", value: "3" },
                { label: "4 - Parestesia", value: "4" }, { label: "5 - Prejudicada", value: "5" }, { label: "9 - Ignorado", value: "9" }
            ]
        },
        // Detalhamentos Revisit (Força Muscular)
        { name: "revisit_strength_mie", label: "Revisita Força: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_strength_mse", label: "Revisita Força: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_strength_mid", label: "Revisita Força: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_strength_msd", label: "Revisita Força: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_strength_cervical", label: "Revisita Força: Musc. Cervical", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_strength_face", label: "Revisita Força: Face", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos Revisit (Tônus Muscular)
        { name: "revisit_tone_mie", label: "Revisita Tônus: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_tone_mse", label: "Revisita Tônus: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_tone_mid", label: "Revisita Tônus: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_tone_msd", label: "Revisita Tônus: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos Revisit (Reflexos)
        { name: "revisit_reflex_aquileu_e", label: "Revisita Reflexo: Aquileu E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_reflex_aquileu_d", label: "Revisita Reflexo: Aquileu D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_reflex_patelar_e", label: "Revisita Reflexo: Patelar E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_reflex_patelar_d", label: "Revisita Reflexo: Patelar D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_reflex_bicipital_e", label: "Revisita Reflexo: Bicipital E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_reflex_bicipital_d", label: "Revisita Reflexo: Bicipital D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_reflex_tricipital_e", label: "Revisita Reflexo: Tricipital E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_reflex_tricipital_d", label: "Revisita Reflexo: Tricipital D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos Revisit (Reflexo Plantar - Campo 78)
        { name: "revisit_plantar_flexion_left", label: "Revisita Reflexo Plantar: Flexão E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_plantar_flexion_right", label: "Revisita Reflexo Plantar: Flexão D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_plantar_extension_left", label: "Revisita Reflexo Plantar: Extensão E", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_plantar_extension_right", label: "Revisita Reflexo Plantar: Extensão D", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos Revisit (Atrofia - Campo 79)
        { name: "revisit_atrophy_mie", label: "Revisita Atrofia: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_atrophy_mse", label: "Revisita Atrofia: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_atrophy_mid", label: "Revisita Atrofia: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_atrophy_msd", label: "Revisita Atrofia: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },

        // Detalhamentos Revisit (Sensibilidade - Campo 80)
        { name: "revisit_sens_mie", label: "Revisita Sensibilidade: MIE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_sens_mse", label: "Revisita Sensibilidade: MSE", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_sens_mid", label: "Revisita Sensibilidade: MID", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_sens_msd", label: "Revisita Sensibilidade: MSD", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
        { name: "revisit_sens_face", label: "Revisita Sensibilidade: Face", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final e encerramento.",
    columns: 3,
    fields: [
        { name: "dt_revision", label: "Data da Revisão", kind: "date", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "final_classification",
            label: "Classificação Final",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Confirmado Poliovírus Selvagem", value: "1" },
                { label: "2 - Compatível", value: "2" },
                { label: "3 - Associado à vacina", value: "3" },
                { label: "4 - Descartado", value: "4" },
                { label: "5 - Confirmado PVDV", value: "5" },
            ]
        },
        {
            name: "classification_criterion",
            label: "Critério de Classificação",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "1 - Laboratorial", value: "1" },
                { label: "2 - Clínico Epidemiológico", value: "2" },
                { label: "3 - Perda de Seguimento", value: "3" },
                { label: "4 - Óbito", value: "4" },
                { label: "5 - Evolução", value: "5" },
            ]
        },
        { name: "discarded_diagnosis", label: "Diagnóstico do Caso Descartado", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        {
            name: "case_evolution",
            label: "Evolução",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Cura com sequela", value: "1" },
                { label: "2 - Cura sem sequela", value: "2" },
                { label: "3 - Óbito por PFA/Pólio", value: "3" },
                { label: "4 - Óbito por outras causas", value: "4" },
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
    epidemiologicalSection,
    clinicalNeurologicalSection,
    clinicalAttendanceSection,
    laboratorySection,
    revisitSection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const polioNotificationDefinition = defineNotificationType({
    id: 20,
    slug: "polio",
    label: "Poliomielite / PFA",
    description: `Ficha de investigação para Paralisia Flácida Aguda/Poliomielite (CID10 A80.9). Caso suspeito: Deficiência motora flácida, início súbito em menores de 15 anos, ou qualquer idade com histórico de viagem para países endêmicos.`,
    sections,
});