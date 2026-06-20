import { z } from "zod";

import {
  defineNotificationType,
  educationLevelOptions,
  raceColorOptions,
  sexOptions,
  timeUnitOptions,
  yesNoUnknownOptions,
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
    {
      name: "patient_name",
      label: "Nome do Paciente",
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
      label: "Data de Nascimento",
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
      label: "Número do Cartão SUS",
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
    {
      name: "occupation",
      label: "Ocupação",
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
// 3. MODO DE TRANSMISSÃO
// -----------------------------------------------------------------------------
const transmissionModeSection = {
  id: "transmission",
  title: "Modo de Transmissão",
  description: "Registre os modos de transmissão.",
  columns: 3,
  fields: [
    {
      name: "vertical_transmission",
      label: "Transmissão vertical",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "unknown",
      options: yesNoUnknownOptions,
    },
    {
      name: "sexual_exposure",
      label: "Relações sexuais como exposição",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "9",
      options: [
        { label: "1 - Relações sexuais com homens", value: "1" },
        { label: "2 - Relações sexuais com mulheres", value: "2" },
        { label: "3 - Relações sexuais com homens e mulheres", value: "3" },
        { label: "4 - Não foi transmissão sexual", value: "4" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    {
      name: "injecting_drug_use",
      label: "Uso de drogas injetáveis",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "unknown",
      options: yesNoUnknownOptions,
    },
    {
      name: "blood_transfusion",
      label: "Transfusão de sangue",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "unknown",
      options: yesNoUnknownOptions,
    },
    {
      name: "blood_transfusion_hemophilia",
      label: "Tratamento/hemotransfusão para hemofilia",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "unknown",
      options: yesNoUnknownOptions,
    },
    {
      name: "biological_material",
      label: "Acidente com material biológico com posterior soroconversão até 6 meses",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "unknown",
      options: yesNoUnknownOptions,
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. INFORMAÇÕES SOBRE TRANSFUSÃO / ACIDENTE
// -----------------------------------------------------------------------------
const transfusionAccidentSection = {
  id: "transfusion_accident_info",
  title: "Informações sobre Transfusão/Acidente",
  description: "Dados sobre transfusão ou acidente com material biológico, quando aplicável.",
  columns: 3,
  fields: [
    { name: "transfusion_accident_date", label: "Data da Transfusão/Acidente", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    { name: "transfusion_accident_state", label: "UF onde ocorreu", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    { name: "transfusion_accident_municipality", label: "Município onde ocorreu a transfusão/acidente", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    {
      name: "transfusion_accident_institution",
      label: "Instituição onde ocorreu a transfusão/acidente",
      kind: "text",
      schema: optionalTextSchema,
      defaultValue: "",
      fullWidth: true,
    },
    {
      name: "transfusion_hiv_cause",
      label: "Após investigação, a transfusão/acidente foi considerada causa da infecção?",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "unknown",
      options: yesNoUnknownOptions
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. DADOS DO LABORATÓRIO
// -----------------------------------------------------------------------------
const laboratorySection = {
  id: "laboratory",
  title: "Dados do Laboratório",
  description: "Evidência laboratorial de infecção pelo HIV.",
  columns: 3,
  fields: [
    { name: "screening_test_date", label: "Data da coleta — Teste de triagem", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    { name: "screening_test_result", label: "Resultado do teste de triagem", kind: "select", schema: z.string().min(1, "Resultado obrigatório"), defaultValue: "9", options: labResultOptions },
    { name: "confirmatory_test_date", label: "Data da coleta — Teste confirmatório", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    { name: "confirmatory_test_result", label: "Resultado do teste confirmatório", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: labResultOptions },
    { name: "rapid_test_1_date", label: "Data da coleta — Teste rápido 1", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    { name: "rapid_test_1_result", label: "Resultado — Teste rápido 1", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: labResultOptions },
    { name: "rapid_test_2_date", label: "Data da coleta — Teste rápido 2", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    { name: "rapid_test_2_result", label: "Resultado — Teste rápido 2", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: labResultOptions },
    { name: "rapid_test_3_date", label: "Data da coleta — Teste rápido 3", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    { name: "rapid_test_3_result", label: "Resultado — Teste rápido 3", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: labResultOptions },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. CRITÉRIOS DE DEFINIÇÃO DE CASOS DE AIDS (RJ / CARACAS)
// -----------------------------------------------------------------------------
const criteriaRjCaracasSection = {
  id: "criteria_rj_caracas",
  title: "Critério Rio de Janeiro/Caracas",
  description: "Doenças, sinais e sintomas utilizados como critério diagnóstico para AIDS para Rio de Janeiro e Caracas.",
  columns: 3,
  fields: [
    { name: "kaposi_sarcoma", label: "Sarcoma de Kaposi", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "disseminated_tuberculosis", label: "Tuberculose disseminada/extra-pulmonar/não cavitária (10)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "oral_candidosis", label: "Candidose oral ou leucoplasia pilosa (5)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "pulmonary_tuberculosis", label: "Tuberculose pulmonar cavitária ou não especificada (5)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "herpes_zoster", label: "Herpes zoster em indivíduo <= 60 anos (5)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "dysfunction_cns", label: "Disfunção do sistema nervoso central (5)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "diarrhea_1m", label: "Diarréia >= 1 mês (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "fever_38_1m", label: "Febre >= 38ºC por >= 1 mês (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cachexia", label: "Caquexia ou perda de peso > 10% (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "asthenia_1m", label: "Astenia >= 1 mês (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "persistent_dermatitis", label: "Dermatite persistente (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "anemia_lymphopenia", label: "Anemia e/ou linfopenia e/ou trombocitopenia (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "lymphadenopathy", label: "Linfadenopatia >= 1cm, >= 2 sítios extra-inguinais por >= 1 mês (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "persistent_cough", label: "Tosse persistente ou qualquer pneumonia (2)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. CRITÉRIO CDC ADAPTADO
// -----------------------------------------------------------------------------
const cdcCriteriaSection = {
  id: "cdc_criteria",
  title: "Critério CDC Adaptado",
  description: "Doenças, sinais e sintomas utilizados como critério diagnóstico para AIDS conforme o CDC adaptado.",
  columns: 3,
  fields: [
    { name: "cdc_mod_esophageal_candidiasis", label: "Candidose de esôfago", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_tracheal_candidiasis", label: "Candidose de traquéia, brônquios ou pulmões", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_cmv_other", label: "Citomegalovirose (outro local que não fígado/baço/linfonodo)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_extrapulmonary_cryptococcosis", label: "Criptococose extrapulmonar", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_cryptosporidiosis_1m", label: "Criptosporidiose intestinal crônica > 1 mês", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_herpes_simplex_mucocutaneous", label: "Herpes simples mucocutâneo > 1 mês", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_disseminated_histoplasmosis", label: "Histoplasmose disseminada", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_isosporiasis_1m", label: "Isosporidiose intestinal crônica > 1 mês", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_progressive_multifocal_leukoencephalopathy", label: "Leucoencefalopatia multifocal progressiva", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_non_hodgkin_lymphoma", label: "Linfoma não Hodgkin e outros linfomas", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_primary_brain_lymphoma", label: "Linfoma primário de cérebro", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_disseminated_mycobacteriosis", label: "Micobacteriose disseminada", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_bacterial_meningitis_single", label: "Meningite bacteriana, pneumonia ou sepse (único episódio)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_pcp_pneumonia", label: "Pneumonia por Pneumocystis carinii", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_recurrent_salmonella", label: "Salmonelose (sepse recorrente não-tifóide)", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_reativ_chagas", label: "Reativação de doença de Chagas", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_toxoplasmosis_cerebral", label: "Toxoplasmose cerebral", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
    { name: "cdc_mod_cont_linf_350", label: "Contagem de linfócitos T CD4+ < 350 cel/mm³", kind: "select", schema: optionalTextSchema, defaultValue: "unknown", options: yesNoUnknownOptions },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. TRATAMENTO
// -----------------------------------------------------------------------------
const treatmentSection = {
  id: "treatment_criteria",
  title: "Tratamento",
  description: "Informações sobre o tratamento.",
  columns: 3,
  fields: [
    { name: "state_treatment", label: "UF do Tratamento", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    { name: "city_treatment", label: "Município onde se realiza o tratamento", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    { name: "health_unit_name_treatment", label: "Unidade de saúde onde se realiza o tratamento", kind: "text", schema: optionalTextSchema, defaultValue: "" },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 9. EVOLUÇÃO
// -----------------------------------------------------------------------------
const evolutionSection = {
  id: "evolution_info",
  title: "Evolução do Caso",
  description: "Informações sobre a evolução do caso.",
  columns: 3,
  fields: [
    {
      name: "case_evolution",
      label: "Evolução do caso",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "9",
      options: [
        { label: "1 - Vivo", value: "1" },
        { label: "2 - Óbito por Aids", value: "2" },
        { label: "3 - Óbito por outras causas", value: "3" },
        { label: "4 - Transferência para outro município", value: "4" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    { name: "date_death", label: "Data do óbito", kind: "date", schema: optionalTextSchema, defaultValue: "" },
    {
      name: "death_criteria",
      label: "Declaração de óbito com menção de aids (ou HIV e causa associada), sem classificação por outro critério",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "unknown",
      options: yesNoUnknownOptions,
    },
  ],
} satisfies NotificationSectionDefinition;

const sections = [
  patientSection,
  residenceSection,
  transmissionModeSection,
  transfusionAccidentSection,
  laboratorySection,
  criteriaRjCaracasSection,
  cdcCriteriaSection,
  treatmentSection,
  evolutionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const aidsNotificationDefinition = defineNotificationType({
  id: 1,
  slug: "aids",
  label: "AIDS",
  description: `Formulario com dados do paciente, historico sexual, diagnostico e evolucao do caso.

A AIDS é o estágio mais avançado da doença que ataca o sistema imunológico. A Síndrome da Imunodeficiência Adquirida, como também é chamada, é causada pelo HIV. Como esse vírus ataca as células de defesa do nosso corpo, o organismo fica mais vulnerável a diversas doenças, de um simples resfriado a infecções mais graves como tuberculose ou câncer. O próprio tratamento dessas doenças fica prejudicado.

Saber precocemente da doença é fundamental para aumentar a sobrevida da pessoa. Por isso, o Ministério da Saúde recomenda fazer o teste sempre que passar por alguma situação de risco e usar sempre o preservativo.`,
  sections,
});