import { z } from "zod"

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

const optionalTextSchema = z.string().optional()

const sections = [
  {
    id: "patient",
    title: "Dados do Paciente",
    description:
      "Capture o retrato do paciente na notificacao, mesmo quando ele ja existe no cadastro geral.",
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
  },
  {
    id: "history",
    title: "Historico Sexual",
    description:
      "Registre exposicoes e antecedentes relevantes para a investigacao epidemiologica.",
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
        options: yesNoUnknownOptions,
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
        name: "other_exposure_notes",
        label: "Outras observacoes sobre exposicao",
        kind: "textarea",
        schema: optionalTextSchema,
        defaultValue: "",
        fullWidth: true,
      },
    ],
  },
  {
    id: "diagnosis",
    title: "Dados de Diagnostico",
    description:
      "Consolide a data do diagnostico, o teste de triagem e a confirmacao pelo protocolo ministerial.",
    columns: 3,
    fields: [
      {
        name: "diagnosis_date",
        label: "Data de diagnostico",
        kind: "date",
        schema: z.string().min(1, "Data de diagnostico obrigatoria"),
        defaultValue: "",
      },
      {
        name: "screening_test_result",
        label: "Teste de triagem",
        kind: "select",
        schema: z.string().min(1, "Resultado obrigatorio"),
        defaultValue: "",
        options: screeningTestOptions,
      },
      {
        name: "ministry_protocol_status",
        label: "Protocolo do Ministerio da Saude",
        kind: "select",
        schema: z.string().min(1, "Campo obrigatorio"),
        defaultValue: "",
        options: ministryProtocolOptions,
      },
    ],
  },
  {
    id: "outcome",
    title: "Evolucao do Caso",
    description:
      "Documente evidencias laboratoriais, tratamento e situacao atual do paciente.",
    columns: 2,
    fields: [
      {
        name: "hiv_lab_evidence",
        label: "Evidencias laboratoriais de HIV",
        kind: "textarea",
        schema: z.string().min(1, "Descreva as evidencias laboratoriais"),
        defaultValue: "",
        fullWidth: true,
      },
      {
        name: "treatment_performed",
        label: "Tratamento realizado",
        kind: "textarea",
        schema: z.string().min(1, "Descreva o tratamento realizado"),
        defaultValue: "",
        fullWidth: true,
      },
      {
        name: "health_outcome",
        label: "Estado de saude",
        kind: "select",
        schema: z.string().min(1, "Estado de saude obrigatorio"),
        defaultValue: "",
        options: healthOutcomeOptions,
      },
      {
        name: "outcome_details",
        label: "Complicacoes e observacoes finais",
        kind: "textarea",
        schema: optionalTextSchema,
        defaultValue: "",
        fullWidth: true,
      },
    ],
  },
] as const satisfies readonly NotificationSectionDefinition[]

export const aidsNotificationDefinition = defineNotificationType({
  id: 1,
  slug: "aids",
  label: "AIDS",
  description: `Formulario com dados do paciente, historico sexual, diagnostico e evolucao do caso.

A AIDS e o estagio mais avancado da doenca que ataca o sistema imunologico. A Sindrome da Imunodeficiencia Adquirida, como tambem e chamada, e causada pelo HIV. Como esse virus ataca as celulas de defesa do nosso corpo, o organismo fica mais vulneravel a diversas doencas, de um simples resfriado a infeccoes mais graves como tuberculose ou cancer. O proprio tratamento dessas doencas fica prejudicado.

Ha alguns anos, receber o diagnostico de aids era uma sentenca de morte. Mas, hoje em dia, e possivel ser soropositivo e viver com qualidade de vida. Basta tomar os medicamentos indicados e seguir corretamente as recomendacoes medicas.

Saber precocemente da doenca e fundamental para aumentar ainda mais a sobrevida da pessoa. Por isso, o Ministerio da Saude recomenda fazer o teste sempre que passar por alguma situacao de risco e usar sempre o preservativo.`,
  sections,
})
