import { z } from "zod";

import {
    defineNotificationType,
    educationLevelOptions,
    healthOutcomeOptions,
    ministryProtocolOptions,
    raceColorOptions,
    screeningTestOptions,
    sexOptions,
    yesNoUnknownOptions,
    type NotificationSectionDefinition,
} from "@/features/notifications/definitions/shared"

const optionalTextSchema = z.string().optional();

// -----------------------------------------------------------------------------
// 1. DADOS DO PACIENTE
// -----------------------------------------------------------------------------
const patientSection = {
    id: "patient",
    title: "Dados do Paciente",
    description: "Capture o retrato do paciente na notificacao, mesmo quando ele ja existe no cadastro geral.",
    columns: 3,
    fields: [
        {
            name: "patient_name",
            label: "Nome",
            kind: "text",
            schema: z.string().min(3, "Nome obrigatorio"),
            defaultValue: "",
        },
        {
            name: "patient_cpf",
            label: "CPF",
            kind: "text",
            schema: z.string().min(11, "CPF obrigatorio"),
            defaultValue: "",
        },
        {
            name: "patient_birth_date",
            label: "Data de nascimento",
            kind: "date",
            schema: z.string().min(1, "Data de nascimento obrigatoria"),
            defaultValue: "",
        },
        {
            name: "sex",
            label: "Sexo",
            kind: "select",
            schema: z.string().min(1, "Sexo obrigatorio"),
            defaultValue: "",
            options: sexOptions,
        },
        {
            name: "race_color",
            label: "Raca/Cor",
            kind: "select",
            schema: z.string().min(1, "Raca/Cor obrigatoria"),
            defaultValue: "",
            options: raceColorOptions,
        },
        {
            name: "education_level",
            label: "Escolaridade",
            kind: "select",
            schema: z.string().min(1, "Escolaridade obrigatoria"),
            defaultValue: "",
            options: educationLevelOptions,
        },
        {
            name: "sus_card_number",
            label: "Cartao SUS",
            kind: "text",
            schema: z.string().min(1, "Cartao SUS obrigatorio"),
            defaultValue: "",
        },
        {
            name: "residence_city",
            label: "Municipio",
            kind: "text",
            schema: z.string().min(1, "Municipio obrigatorio"),
            defaultValue: "",
        },
        {
            name: "residence_state",
            label: "Estado",
            kind: "text",
            schema: z.string().min(2, "Estado obrigatorio"),
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 2. DADOS DE ATENDIMENTO
// -----------------------------------------------------------------------------
const attendanceDataSection = {
    id: "attendance_data",
    title: "Dados de Atendimento e Hospitalização",
    description: "Informações sobre o atendimento médico e internação.",
    columns: 3,
    fields: [
        {
            name: "dt_first_attendance",
            label: "Data do 1º Atendimento",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "nu_attendances_until_suspicion",
            label: "Nº de Atendimentos até suspeição",
            kind: "number",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "dt_clinical_suspicion",
            label: "Data da Suspeição Clínica",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_hospitalization_occurred",
            label: "Ocorreu Hospitalização?",
            kind: "select",
            schema: z.string().min(1, "Campo obrigatório"),
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "dt_hospitalization",
            label: "Data da Internação",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "dt_hospital_discharge",
            label: "Data da Alta Hospitalar",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 3. SINTOMAS
// -----------------------------------------------------------------------------
const symptomsSection = {
    id: "symptoms",
    title: "Sintomas",
    description: "Sinais e sintomas do paciente.",
    columns: 3,
    fields: [
        {
            name: "st_symptoms_fever",
            label: "Febre",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_nausea",
            label: "Nausea",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_vomiting",
            label: "Vomito",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_diarrhea",
            label: "Diarreia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_constipation",
            label: "Constipacao",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_headache",
            label: "Cefaleia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_dizziness",
            label: "Tontura",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_blurred_vision",
            label: "Visao Turva",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_diplopia",
            label: "Diplopia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_dysarthria",
            label: "Disartria",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_dysphonia",
            label: "Disfonia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_dysphagia",
            label: "Disfagia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_dry_mouth",
            label: "Boca Seca",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_wound",
            label: "Ferimento",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_neck_flaccidity",
            label: "Flacidez de Pescoco",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_dyspnea",
            label: "Dispneia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_respiratory_failure",
            label: "Insuficiencia Respiratoria",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_heart_failure",
            label: "Insuficiencia Cardiaca",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_coma",
            label: "Coma",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_symptoms_paresthesia",
            label: "Parestesia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "ds_symptoms_paresthesia_where",
            label: "Parestesia, onde:",
            kind: "text",
            schema: z.string().optional(),
            defaultValue: "",
        },
        {
            name: "st_symptoms_other",
            label: "Outros",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. EXAME NEUROLÓGICO
// -----------------------------------------------------------------------------
const neurologicalExamSection = {
    id: "neurological_examination",
    title: "Exame Neurológico",
    description: "Exame neurológico do paciente.",
    columns: 3,
    fields: [
        {
            name: "st_exam_ptosis",
            label: "Ptose Palpebral",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_ophthalmoparesis",
            label: "Oftalmoparesia / Oftalmoplegia",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_mydriasis",
            label: "Midriase",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_facial_paralysis",
            label: "Paralisia Facial",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_bulbar_musculature",
            label: "Comprometimento da Musculatura Bulbar",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_upper_limb_weakness",
            label: "Fraqueza em Membros Sup.",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_lower_limb_weakness",
            label: "Fraqueza em Membros Inf.",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_descending_weakness",
            label: "Fraqueza Descendente",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_symmetric_weakness",
            label: "Fraqueza Simetrica",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_exam_altered_sensitivity",
            label: "Alteracoes de Sensibilidade",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. REFLEXOS NEUROLÓGICOS
// -----------------------------------------------------------------------------
const neurologicalReflexesSection = {
    id: "neurological_reflexes",
    title: "Reflexos Neurologicos",
    description: "Reflexos neurológicos do paciente.",
    columns: 3,
    fields: [
        {
            name: "st_neurological_reflexes",
            label: "Reflexos Neurológicos",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "9",
            options: [
                { label: "1 - Normais", value: "1" },
                { label: "2 - Aumentados", value: "2" },
                { label: "3 - Reduzidos/Ausentes", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. FONTE DE TRANSMISSÃO
// -----------------------------------------------------------------------------
const transmissionSourceSection = {
    id: "transmission_source",
    title: "Fonte de Transmissao",
    description: "Informacoes sobre a fonte de transmissao do botulismo.",
    columns: 3,
    fields: [
        {
            name: "transmission_source_food",
            label: "Suspeita de transmissão alimentar?",
            kind: "select",
            schema: z.string().min(1, "Campo obrigatorio"),
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "ds_transmission_source_food",
            label: "Se sim, qual alimento?",
            kind: "text",
            schema: z.string().optional(),
            defaultValue: "",
        },
        {
            name: "tp_exposure_food",
            label: "Exposição ao Alimento",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Única", value: "1" },
                { label: "Múltipla", value: "2" },
                { label: "Ignorado", value: "9" },
            ]
        },
        {
            name: "st_food_industrial",
            label: "Produção Industrial/Comercial",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_food_homemade",
            label: "Produção Caseira",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "ds_food_industrial_info",
            label: "Se Industrial: Marca, Validade e Lote",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_location_domicile",
            label: "Local Ingestão: Domicílio",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_location_daycare",
            label: "Local Ingestão: Creche/Escola",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_location_work",
            label: "Local Ingestão: Trabalho",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_location_restaurant",
            label: "Local Ingestão: Restaurante/Bar/Lanchonete",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_location_party",
            label: "Local Ingestão: Festa",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_location_other",
            label: "Local Ingestão: Outro",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "nu_people_consumed_food",
            label: "Nº de pessoas que consumiram",
            kind: "number",
            schema: optionalTextSchema,
            defaultValue: "",
        }
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. TRATAMENTO
// -----------------------------------------------------------------------------
const treatmentSection = {
    id: "treatment",
    title: "Tratamento",
    description: "Informacoes sobre o tratamento do paciente.",
    columns: 3,
    fields: [
        {
            name: "st_treatment_ventilatory_support",
            label: "Assistência Ventilatória",
            kind: "select",
            schema: z.string().min(1, "Campo obrigatório"),
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_treatment_antibiotic_therapy",
            label: "Antibioticoterapia",
            kind: "select",
            schema: z.string().min(1, "Campo obrigatório"),
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_treatment_antibotulinum_serum",
            label: "Soro Antibotulínico",
            kind: "select",
            schema: z.string().min(1, "Campo obrigatório"),
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "dt_antibotulinum_serum",
            label: "Data de Administração do Soro",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ]
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. EXAMES COMPLEMENTARES
// -----------------------------------------------------------------------------
const complementaryExamsSection = {
    id: "complementary_exams",
    title: "Exames Complementares",
    description: "Líquor e Eletroneuromiografia.",
    columns: 3,
    fields: [
        {
            name: "tp_cerebrospinal_fluid",
            label: "Líquor",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Realizado", value: "1" },
                { label: "Não Realizado", value: "2" },
            ],
        },
        {
            name: "dt_cerebrospinal_fluid_collection",
            label: "Líquor: Data da Coleta",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "nu_cerebrospinal_fluid_cells",
            label: "Líquor: Células/mm³",
            kind: "number",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "nu_cerebrospinal_fluid_protein",
            label: "Líquor: Proteínas mg%",
            kind: "number",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_electroneuromyography",
            label: "Eletroneuromiografia",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Realizada", value: "1" },
                { label: "Não Realizada", value: "2" },
            ],
        },
        {
            name: "dt_electroneuromyography_date",
            label: "Eletroneuromiografia: Data Realização",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "tp_emg_sensitive_neuroconduction",
            label: "EMG: Neurocondução Sensitiva",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Normal", value: "1" },
                { label: "Diminuição de amplitude", value: "2" },
                { label: "Lentificações", value: "3" },
            ],
        },
        {
            name: "tp_emg_motor_neuroconduction",
            label: "EMG: Neurocondução Motora",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Normal", value: "1" },
                { label: "Diminuição de amplitude", value: "2" },
                { label: "Lentificações", value: "3" },
            ],
        },
        {
            name: "tp_emg_repetitive_stimulation",
            label: "EMG: Estimulação Repetitiva",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Normal", value: "1" },
                { label: "Decremento (freq baixa)", value: "2" },
                { label: "Incremento (freq alta)", value: "3" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 9. DADOS LABORATORIAIS
// -----------------------------------------------------------------------------
const laboratoryDataSection = {
    id: "laboratory_data",
    title: "Pesquisa de Toxina Botulínica",
    description: "Coleta de material clínico e bromatológico.",
    columns: 3,
    fields: [
        {
            name: "st_botuli_serum_collected",
            label: "Soro: Coletou Material?",
            kind: "select",
            schema: z.string().min(1, "Campo obrigatório"),
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "dt_botuli_serum_collection",
            label: "Soro: Data da Coleta",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_botuli_serum_result",
            label: "Soro: Resultado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Presença de toxina", value: "1" },
                { label: "Ausência de toxina", value: "2" },
                { label: "Inconclusivo", value: "3" },
                { label: "Não realizado", value: "4" },
            ],
        },
        {
            name: "tp_botuli_serum_toxin",
            label: "Soro: Tipo de Toxina",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "A", value: "1" },
                { label: "B", value: "2" },
                { label: "AB", value: "3" },
                { label: "E", value: "4" },
                { label: "F", value: "5" },
                { label: "G", value: "6" },
                { label: "Outra", value: "7" },
                { label: "Ignorado", value: "9" },
            ],
        },
        {
            name: "st_botuli_feces_collected",
            label: "Fezes: Coletou Material?",
            kind: "select",
            schema: z.string().min(1, "Campo obrigatório"),
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "dt_botuli_feces_collection",
            label: "Fezes: Data da Coleta",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_botuli_feces_result",
            label: "Fezes: Resultado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Presença de toxina", value: "1" },
                { label: "Ausência de toxina", value: "2" },
                { label: "Inconclusivo", value: "3" },
                { label: "Não realizado", value: "4" },
            ],
        },
        {
            name: "tp_botuli_feces_toxin",
            label: "Fezes: Tipo de Toxina",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "A", value: "1" },
                { label: "B", value: "2" },
                { label: "AB", value: "3" },
                { label: "E", value: "4" },
                { label: "F", value: "5" },
                { label: "G", value: "6" },
                { label: "Outra", value: "7" },
                { label: "Ignorado", value: "9" },
            ],
        },
        {
            name: "ds_botuli_food1_info",
            label: "Alimento 1: Especificar",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_botuli_food1_collected",
            label: "Alimento 1: Coletou Material?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "dt_botuli_food1_collection",
            label: "Alimento 1: Data da Coleta",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_botuli_food1_result",
            label: "Alimento 1: Resultado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Presença de toxina", value: "1" },
                { label: "Ausência de toxina", value: "2" },
                { label: "Inconclusivo", value: "3" },
                { label: "Não realizado", value: "4" },
            ],
        },
        {
            name: "tp_botuli_food1_toxin",
            label: "Alimento 1: Tipo de Toxina",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "A", value: "1" },
                { label: "B", value: "2" },
                { label: "AB", value: "3" },
                { label: "E", value: "4" },
                { label: "F", value: "5" },
                { label: "G", value: "6" },
                { label: "Outra", value: "7" },
                { label: "Ignorado", value: "9" },
            ],
        },
        {
            name: "ds_botuli_food2_info",
            label: "Alimento 2: Especificar",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_botuli_food2_collected",
            label: "Alimento 2: Coletou Material?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "dt_botuli_food2_collection",
            label: "Alimento 2: Data da Coleta",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_botuli_food2_result",
            label: "Alimento 2: Resultado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Presença de toxina", value: "1" },
                { label: "Ausência de toxina", value: "2" },
                { label: "Inconclusivo", value: "3" },
                { label: "Não realizado", value: "4" },
            ],
        },
        {
            name: "tp_botuli_food2_toxin",
            label: "Alimento 2: Tipo de Toxina",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "A", value: "1" },
                { label: "B", value: "2" },
                { label: "AB", value: "3" },
                { label: "E", value: "4" },
                { label: "F", value: "5" },
                { label: "G", value: "6" },
                { label: "Outra", value: "7" },
                { label: "Ignorado", value: "9" },
            ],
        },
        {
            name: "st_botuli_other_collected",
            label: "Outros: Coletou Material?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "ds_botuli_other_info",
            label: "Outros: Especificar Material",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "dt_botuli_other_collection",
            label: "Outros: Data da Coleta",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_botuli_other_result",
            label: "Outros: Resultado",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Presença de toxina", value: "1" },
                { label: "Ausência de toxina", value: "2" },
                { label: "Inconclusivo", value: "3" },
                { label: "Não realizado", value: "4" },
            ],
        },
        {
            name: "tp_botuli_other_toxin",
            label: "Outros: Tipo de Toxina",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "A", value: "1" },
                { label: "B", value: "2" },
                { label: "AB", value: "3" },
                { label: "E", value: "4" },
                { label: "F", value: "5" },
                { label: "G", value: "6" },
                { label: "Outra", value: "7" },
                { label: "Ignorado", value: "9" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 10. CONCLUSÃO
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Classificação final e evolução do caso.",
    columns: 3,
    fields: [
        {
            name: "tp_final_classification",
            label: "Classificação Final",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Confirmado", value: "1" },
                { label: "Descartado", value: "2" },
            ],
        },
        {
            name: "tp_confirmation_criteria",
            label: "Critério de Confirmação/Descarte",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Laboratorial", value: "1" },
                { label: "Clínico-Epidemiológico", value: "2" },
            ],
        },
        {
            name: "tp_botulism",
            label: "Forma de Botulismo",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Alimentar", value: "1" },
                { label: "Intestinal", value: "2" },
                { label: "Por ferimento", value: "3" },
                { label: "Outra", value: "4" },
            ],
        },
        {
            name: "tp_case_evolution",
            label: "Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: [
                { label: "Cura", value: "1" },
                { label: "Óbito por botulismo", value: "2" },
                { label: "Óbito por outras causas", value: "3" },
                { label: "Ignorado", value: "9" },
            ],
        },
        {
            name: "ds_cause",
            label: "Causa / Alimento Incriminado",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "st_work_related_disease",
            label: "Doença Relacionada ao Trabalho?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoUnknownOptions,
        },
        {
            name: "dt_death",
            label: "Data do Óbito (Se aplicável)",
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
    ],
} satisfies NotificationSectionDefinition;


// -----------------------------------------------------------------------------
// DEFINIÇÃO FINAL
// -----------------------------------------------------------------------------
const sections = [
    patientSection,
    attendanceDataSection,
    symptomsSection,
    neurologicalExamSection,
    neurologicalReflexesSection,
    transmissionSourceSection,
    treatmentSection,
    complementaryExamsSection,
    laboratoryDataSection,
    conclusionSection
] as const satisfies readonly NotificationSectionDefinition[];

export const botulismNotificationDefinition = defineNotificationType({
    id: 3,
    slug: "botulism",
    label: "Botulismo",
    description: `Formulário com dados do paciente, dados de atendimento, sinais clínicos, exames neurológicos, diagnóstico e evolução do caso.

O botulismo é uma doença neuroparalítica grave, não contagiosa, resultante da ação de uma potente toxina produzida pela bactéria Clostridium botulinum. A toxina ataca o sistema nervoso, interferindo na transmissão dos impulsos nervosos e causando fraqueza e paralisia muscular progressiva, que pode evoluir para insuficiência respiratória e óbito.

O diagnóstico precoce e a administração imediata do soro antibotulínico são essenciais para o sucesso do tratamento, além do suporte ventilatório quando necessário. A suspeita clínica exige notificação compulsória imediata e investigação epidemiológica rápida para identificar a fonte de exposição.`,
    sections,
});