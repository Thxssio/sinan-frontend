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
    woundsOptions,
    animalConditionOptions,
    animalSpeciesOptions,
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

// 32 -Tipo de Exposição ao Vírus Rábico
const exposureTypeSection = {
    id: "exposure_type",
    title: "Tipo de Exposição ao Vírus Rábico",
    description: "Tipo de contatos que levaram a exposição ao vírus rábico.",
    columns: 3,
    fields: [
        {
            name: "st_indirect_contact",
            label: "Contato Indireto",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown", //opção ignorado
            options: yesNoUnknownOptions,
        },
        {
            name: "st_scrath",
            label: "Arranhadura",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
                {
            name: "st_licking",
            label: "Lambedura",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
                {
            name: "st_bite",
            label: "Mordedura",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue:"unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_other",
            label: "Outro",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],
} satisfies NotificationSectionDefinition;

const locationSection = {
    id: "location",
    title: "Localização",
    description: "Local do corpo que ocorreu o contato",
    columns: 3,
    fields: [
        {
            name: "st_mucosa",
            label: "Mucosa",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_head_neck",
            label: "Cabeça/Pescoç",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_hand_feet",
            label: "Mãos/Pés",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_trunk",
            label: "Tronco",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_upper_extremities",
            label: "Membros Superiores",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {
            name: "st_lower_extremities",
            label: "Membros Inferiores",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],
} satisfies NotificationSectionDefinition;

const woundSection = {
    id: "Wound",
    title: "Ferimento",
    description: "Tipo de Ferimento",
    columns: 3,
    fields: [
        {
            name: "st_wound",
            label: "Ferimento",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: woundsOptions,
        },
        {
            name: "st_deep_wound",
            label: "Ferimento Profundo",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {   
            name: "st_superficial_wound",
            label: "Ferimento Superficial",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
        {   
            name: "st_avulsion_wound",
            label: "Ferimento Dilacerante",
            kind: "select",
            schema: z.string().min(1, "Obrigatorio"),
            defaultValue: "unknown",
            options: yesNoUnknownOptions,
        },
    ],

} satisfies NotificationSectionDefinition;

const treatmentSection = {
    id: "treatment",
    title: "Conduta e Tratamento Atual",
    description: "Histórico de tratamentos e tratamento profilático indicado no atendimento.",
    columns: 2,
    fields: [
      {
        name: "previous_treatment",
        label: "Antecedentes de Tratamento Anti-Rábico?",
        kind: "select",
        schema: z.string().min(1, "Campo obrigatório"),
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
      {
        name: "indicated_treatment",
        label: "Tratamento Indicado",
        kind: "select",
        schema: z.string().min(1, "Tratamento indicado obrigatório"),
        defaultValue: "",
        options: yesNoUnknownOptions, //arrumar isso
      },
      {
        name: "serum_indicated",
        label: "Indicação do Soro Anti-Rábico?",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
      {
        name: "adverse_event",
        label: "Evento Adverso à Vacina/Soro",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
    ],
  },

const animalAgressorSection = {
    id: "animal_aggressor",
    title: "Animal Agressor",
    description: "Informações sobre o animal envolvido na exposição.",
    columns: 2,
    fields: [
      {
        // 40
        name: "animal_species",
        label: "Espécie do Animal Agressor",
        kind: "select",
        schema: z.string().min(1, "Espécie obrigatória"),
        defaultValue: "",
        options: animalSpeciesOptions,
      },
      {
        //41
        name: "animal_condition",
        label: "Condição do Animal",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: animalConditionOptions,
      },
      {
        //42
        name: "observable_animal",
        label: "Animal Passível de Observação?",
        kind: "select",
        schema: optionalTextSchema,
        defaultValue: "",
        options: yesNoUnknownOptions,
      },
    ],
  },