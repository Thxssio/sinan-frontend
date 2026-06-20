import { z } from "zod";

import {
  educationLevelOptions,
  raceColorOptions,
  sexOptions,
  yesNoUnknownOptions,
  type NotificationSectionDefinition,
  defineNotificationType,
} from "@/features/notifications/definitions/shared"

const optionalTextSchema = z.string().optional();

const labResultOptions = [
  { value: "1", label: "Positivo/reagente" },
  { value: "2", label: "Negativo/não reagente" },
  { value: "3", label: "Inconclusivo" },
  { value: "4", label: "Não realizado" },
  { value: "5", label: "Indeterminado" },
  { value: "6", label: "Detectável" },
  { value: "7", label: "Indetectável" },
  { value: "9", label: "Ignorado" },
]

// -----------------------------------------------------------------------------
// 2. DADOS DO PACIENTE (Campos 8 a 16)
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
  description: "Informações de endereço de residência do paciente.",
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
// Dados Complementares do Caso
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 3. DADOS DA MÃE (Campos 31 a 35)
// -----------------------------------------------------------------------------
const motherSection = {
  id: "motherPatient",
  title: "Dados da Mão do Paciente",
  description: "Capture o retrato da mãe do paciente na notificacao.",
  columns: 3,
  fields: [

    {
      name: "age_mother",
      label: "Idade da mãe",
      kind: "number",
      schema: optionalTextSchema,
      defaultValue: ""
    },
    {
      name: "mother_occupation",
      label: "Ocupação da mãe",
      kind: "text",
      schema: z.string().optional(),
      defaultValue: "",
    },
    {
      name: "mother_education_level",
      label: "Escolaridade da mãe",
      kind: "select",
      schema: z.string().min(1, "Escolaridade obrigatoria"),
      defaultValue: "",
      options: educationLevelOptions,
    },
    {
      name: "race_color_mother",
      label: "Raca/Cor da mãe",
      kind: "select",
      schema: z.string().min(1, "Raca/Cor obrigatoria"),
      defaultValue: "",
      options: raceColorOptions,
    },
    {
      name: "investigation_type",
      label: "Tipo de investigação",
      kind: "text",
      schema: z.string().min(1, "Obrigatoria"),
      defaultValue: "Aids em menores de 13 anos",
    }
  ],
} satisfies NotificationSectionDefinition;


// -----------------------------------------------------------------------------
// INVESTIGAÇÃO DE AIDS EM MENORES DE 13 ANOS
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 4. Antecedentes (Campos 36 a 38)
// -----------------------------------------------------------------------------
const transmissionModeSection = {
  id: "transmission",
  title: "Modo de Transmissão",
  description:
    "Registre os modods de transmissão",
  columns: 3,
  fields: [
    {
      name: "vertical_transmission",
      label: "Transmissao vertical",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatorio"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "sexual_exposure",
      label: "Relacoes sexuais como exposicao",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatorio"),
      defaultValue: "",
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
      label: "Uso de drogas injetaveis",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatorio"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "blood_transfusion",
      label: "Transfusão de sangue",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatorio"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "blood_transfusion_hemophilia",
      label: "Tratamento/hemotransfusão para hemofilia",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatorio"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "biological_material",
      label: "Acidente com material biológico composterior soroconversão até 6 meses",
      kind: "select",
      schema: z.string().min(1, "Campo obrigatorio"),
      defaultValue: "",
      options: yesNoUnknownOptions,
    },

  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 4. Antecedentes (Campos 39 a 43)
// -----------------------------------------------------------------------------
const transfusionAccidentSection = {
  id: "transfusion_accident_info",
  title: "Informações sobre Transfusão/Acidente",
  description:
    "Dados sobre transfusão ou acidente com material biológico, quando aplicável.",
  columns: 3,
  fields: [
    {
      name: "transfusion_accident_date",
      label: "Data da Transfusão/Acidente",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "transfusion_accident_state",
      label: "UF onde ocorreu",
      kind: "text",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "transfusion_accident_municipality",
      label: "Município onde ocorreu a transfusão/acidente",
      kind: "text",
      schema: optionalTextSchema,
      defaultValue: "",
    },
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
      label: "Após investigação realizada conforme algoritmo do PN DST/AIDS, a transfusão/acidente com material biológico foi considerada causa da infecção pelo HIV?",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. Dados de Laboratório (Campo 44)
// -----------------------------------------------------------------------------

const laboratorySection = {
  id: "laboratory",
  title: "Dados do Laboratório",
  description:
    "Evidência laboratorial de infecção pelo HIV.",
  columns: 3,
  fields: [
    {
      name: "nucleic_acid_test_1_date",
      label: "Data da coleta — 1º teste de detecção de ácido nucléico (Antes dos 18 meses de vida)",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "nucleic_acid_test_1_result",
      label: "Resultado — 1º teste de detecção de ácido nucléico (Antes dos 18 meses de vida)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: labResultOptions,
    },
    {
      name: "nucleic_acid_test_2_date",
      label: "Data da coleta — 2º teste de detecção de ácido nucléico (Antes dos 18 meses de vida)",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "nucleic_acid_test_2_result",
      label: "Resultado — 2º teste de detecção de ácido nucléico (Antes dos 18 meses de vida)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: labResultOptions,
    },
    {
      name: "nucleic_acid_test_3_date",
      label: "Data da coleta — 3º teste de detecção de ácido nucléico (Antes dos 18 meses de vida)",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "nucleic_acid_test_3_result",
      label: "Resultado — 3º teste de detecção de ácido nucléico (Antes dos 18 meses de vida)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: labResultOptions,
    },
    {
      name: "screening_test_date",
      label: "Data da coleta — Teste de triagem anti-HIV (Após os 18 meses de vida)",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "screening_test_result",
      label: "Resultado do teste de triagem anti-HIV (Após os 18 meses de vida)",
      kind: "select",
      schema: z.string().min(1, "Resultado obrigatório"),
      defaultValue: "",
      options: labResultOptions,
    },
    {
      name: "confirmatory_test_date",
      label: "Data da coleta — Teste confirmatório anti-HIV",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "confirmatory_test_result",
      label: "Resultado do teste confirmatório anti-HIV",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: labResultOptions,
    },
    {
      name: "rapid_test_1_date",
      label: "Data da coleta — Teste rápido 1",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "rapid_test_1_result",
      label: "Resultado — Teste rápido 1",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: labResultOptions,
    },
    {
      name: "rapid_test_2_date",
      label: "Data da coleta — Teste rápido 2",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "rapid_test_2_result",
      label: "Resultado — Teste rápido 2",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: labResultOptions,
    },
    {
      name: "rapid_test_3_date",
      label: "Data da coleta — Teste rápido 3",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "rapid_test_3_result",
      label: "Resultado — Teste rápido 3",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: labResultOptions,
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. Critério CDC adaptado (Campo 45)
// -----------------------------------------------------------------------------

const cdcCriteriaSection = {
  id: "cdc_criteria",
  title: "Critério CDC Adaptado",
  description:
    "Doenças, sinais e sintomas utilizados como critério diagnóstico para AIDS em menores de 13 anos conforme o CDC adaptado.",
  columns: 3,
  fields: [
    // Doenças, sinais ou sintomas de caráter leve
    {
      name: "cdc_mod_chronic_parotid ",
      label: "Aumento crônico de parótida",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_persistent dermatitis",
      label: "Dermatite persistente",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_splenomegaly",
      label: "Esplenomegalia",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_hepatomegaly",
      label: "Hepatomegalia",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_infec_vas",
      label: "Infecções persistentes ou recorrentes de VAS (Otite ou Sinusite)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_lymphadenopathy",
      label: "Linfadenopatia >= 0.5 cm em mais de 2 sítios",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    // Doenças, sinais ou sintomas de caráter moderado/grave
    {
      name: "cdc_mod_anemia_30d",
      label: "Anemia por mais de 30 dias",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_esophageal_candidiasis",
      label: "Candidose de esôfago",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_tracheal_candidiasis",
      label: "Candidose de traquéia, brônquios ou pulmões",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_oral_candidiasis_resistant",
      label: "Candidose oral resistente ao tratamento",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_cmv_other",
      label: "Citomegalovirose (qualquer outro local que não fígado, baço ou linfonodo > 1 mês de idade)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_extrapulmonary_cryptococcosis",
      label: "Criptococose extrapulmonar",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_cryptosporidiosis_1m",
      label: "Criptosporidiose com diarréia > 1 mês",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_recurrent_diarrhea",
      label: "Diarréia recorrente ou crônica",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_hiv_encephalopathy",
      label: "Encefalopatia pelo HIV",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_persistent_fever_1m",
      label: "Febre persistente > 1 mês",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_recurrent_herpetic_stomatitis",
      label: "Gengivo-estomatite herpética recorrente (mais de 2 episódios em 1 ano)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_hiv_hepatitis",
      label: "Hepatite por HIV",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_herpes_simplex_bronchi",
      label: "Herpes simples em brônquios, pulmões ou trato gastrintestinal",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_herpes_simplex_mucocutaneous",
      label: "Herpes simples mucocutâneo > 1 mês em crianças > 1 mês idade",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_herpes_zoster",
      label: "Herpes zoster (ao menos 2 episódios distintos ou em mais de um dermátomo)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_disseminated_histoplasmosis",
      label: "Histoplasmose disseminada",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_recurrent_bacterial_infections",
      label: "Infecções bacterianas de repetição/múltiplas (sepse, pneumonia, meningite, ósteoartrites, abcessos em órgãos internos)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_cmv_lt1m",
      label: "Infecção por citomegalovírus < 1 mês de idade",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_isosporiasis_1m",
      label: "Isosporidiose intestinal crônica, por um período superior a 1 mês",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_leiomyosarcoma",
      label: "Leiomiossarcoma",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_progressive_multifocal_leukoencephalopathy",
      label: "Leucoencefalopatia multifocal progressiva",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_lymphopenia_30d",
      label: "Linfopenia por mais de 30 dias",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_non_hodgkin_lymphoma",
      label: "Linfoma não Hodgkin e outros linfomas",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_primary_brain_lymphoma",
      label: "Linfoma primário de cérebro",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_cardiomyopathy",
      label: "Miocardiopatia",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_disseminated_mycobacteriosis",
      label: "Micobacteriose disseminada (exceto tuberculose e hanseníase)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_bacterial_meningitis_single",
      label: "Meningite bacteriana, pneumonia ou sepse (único episódio)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_nephropathy",
      label: "Nefropatia",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_nocardiosis",
      label: "Nocardiose",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_lymphoid_interstitial_pneumonia",
      label: "Pneumonia linfóide intersticial",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_pcp_pneumonia",
      label: "Pneumonia por Pneumocystis carinii",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_recurrent_salmonella",
      label: "Salmonelose (sepse recorrente não-tifóide)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_kaposi_sarcoma",
      label: "Sarcoma de Kaposi",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_wasting_syndrome",
      label: "Síndrome da emaciação (Aids Wasting Syndrome)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_toxoplasmosis_cerebral_gt1m",
      label: "Toxoplasmose cerebral em crianças com mais de 1 mês de idade",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_toxoplasmosis_lt1m",
      label: "Toxoplasmose iniciada antes de 1 mês de idade",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_thrombocytopenia_30d",
      label: "Trombocitopenia por mais de 30 dias",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_pulmonary_tuberculosis",
      label: "Tuberculose pulmonar",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_disseminated_tuberculosis",
      label: "Tuberculose disseminada ou extrapulmonar",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_disseminated_varicella",
      label: "Varicela disseminada",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    // Achados laboratoriais (contagem de linfócitos T CD4+ definidora de imunodeficiência de acordo com a idade)
    {
      name: "cdc_mod_cont_linf_15",
      label: "contagem de linfócitos T CD4+ definidora de imunodeficiência de acordo com a idade : < 1.500 células por mm3 (<25%)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_cont_linf_10",
      label: "contagem de linfócitos T CD4+ definidora de imunodeficiência de acordo com a idade : < 1.000 células por mm3 (<25%)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
    {
      name: "cdc_mod_cont_linf_50",
      label: "contagem de linfócitos T CD4+ definidora de imunodeficiência de acordo com a idade: < 500 células por mm3 (<25%)",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. Tratamento (Campo 47 a 49)
// -----------------------------------------------------------------------------
const treatementSection = {
  id: "treatment_criteria",
  title: "Tratamento",
  description:
    "Informações sobre o tratamento.",
  columns: 3,
  fields: [
    {
      name: "state_treatment",
      label: "UF",
      kind: "text",
      schema: z.string().min(2, "UF obrigatória"),
      defaultValue: "",
    },
    {
      name: "city_treatment",
      label: "Município onde se realiza otratamento",
      kind: "text",
      schema: z.string().min(1, "Município obrigatório"),
      defaultValue: "",
    },
    {
      name: "health_unit_name_treatment",
      label: "Unidade de saúde onde se realiza otratamento",
      kind: "text",
      schema: z.string().min(1, "Unidade obrigatória"),
      defaultValue: "",
    },
  ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. Evolução (Campo 46, 50 e 51)
// -----------------------------------------------------------------------------

const evolutionSection = {
  id: "evolution_info",
  title: "Evolução do Caso",
  description:
    "Informações sobre a evolução do caso.",
  columns: 3,
  fields: [
    {
      name: "case_evolution",
      label: "Evolução do caso",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: [
        { label: "1 - Vivo", value: "1" },
        { label: "2 - Óbito por Aids", value: "2" },
        { label: "3 - Óbito por outras causas", value: "3" },
        { label: "4 - Transferência para outro município", value: "4" },
        { label: "9 - Ignorado", value: "9" },
      ],
    },
    {
      name: "date_death",
      label: "Data do óbito",
      kind: "date",
      schema: optionalTextSchema,
      defaultValue: "",
    },
    {
      name: "death_criteria",
      label: "Declaração de óbito com menção de aids, ou HIV e causa de morte associada àimunodeficiência, sem classificação por outro critério após investigação",
      kind: "select",
      schema: optionalTextSchema,
      defaultValue: "",
      options: yesNoUnknownOptions,
    },
  ],
} satisfies NotificationSectionDefinition;
const sections = [
  patientSection,
  residenceSection,
  motherSection,
  cdcCriteriaSection,
  laboratorySection,
  transfusionAccidentSection,
  transmissionModeSection,
  evolutionSection,
  treatementSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const aidsChildrenNotificationDefinition = defineNotificationType({
  id: 2,
  slug: "aids_under_13",
  label: "AIDS (menores de 13 anos)",
  description: `Para fins de notificação entende-se por caso de aids o indivíduo que se enquadra nas definições adotadas pelo Ministério da Saúde.
    Os critérios para caracterização de casos de aids estão descritos em publicação específica do Ministério da Saúde (www.aids.gov.br).`,
  sections,
});