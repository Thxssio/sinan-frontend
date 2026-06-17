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

const yesNoIgnoredOptions = [
    { label: "1 - Sim", value: "1" },
    { label: "2 - Não", value: "2" },
    { label: "9 - Ignorado", value: "9" },
];

const timeUnitOptions = [
    { label: "1 - Hora", value: "1" },
    { label: "2 - Dia", value: "2" },
    { label: "3 - Mês", value: "3" },
    { label: "4 - Ano", value: "4" },
];

const examResultOptions = [
    { label: "1 - Positivo", value: "1" },
    { label: "2 - Negativo", value: "2" },
    { label: "3 - Inconclusivo", value: "3" },
    { label: "4 - Não realizado", value: "4" },
    { label: "9 - Ignorado", value: "9" },
];

// -----------------------------------------------------------------------------
// 1. DADOS GERAIS (Campos 1 a 7)
// -----------------------------------------------------------------------------
const generalSection = {
    id: "general",
    title: "Dados Gerais",
    description: "Informações básicas da notificação e unidade de saúde.",
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
            defaultValue: "acidente_material_biologico",
            options: [
                { label: "ACIDENTE DE TRABALHO COM EXPOSIÇÃO À MAT. BIOLÓGICO", value: "acidente_material_biologico" },
            ],
        },
        {
            name: "cid10",
            label: "Código (CID10)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "Z20.9",
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
            name: "dt_accident",
            label: "Data do Acidente",
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
                { label: "4 - Idade gestacional Ignorada", value: "4" },
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
            options: [
                ...educationLevelOptions,
                { label: "10 - Não se aplica", value: "10" }
            ],
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
// 4. DADOS COMPLEMENTARES DO CASO (Campos 31 a 33)
// -----------------------------------------------------------------------------
const complementarySection = {
    id: "complementary",
    title: "Dados Complementares do Caso",
    description: "Informações sobre ocupação e mercado de trabalho.",
    columns: 3,
    fields: [
        { name: "occupation", label: "Ocupação", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "work_market_status",
            label: "Situação no Mercado de Trabalho",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "99",
            options: [
                { label: "01 - Empregado registrado com carteira assinada", value: "01" },
                { label: "02 - Empregado não registrado", value: "02" },
                { label: "03 - Autônomo/conta própria", value: "03" },
                { label: "04 - Servidor público estatuário", value: "04" },
                { label: "05 - Servidor público celetista", value: "05" },
                { label: "06 - Aposentado", value: "06" },
                { label: "07 - Desempregado", value: "07" },
                { label: "08 - Trabalho temporário", value: "08" },
                { label: "09 - Cooperativado", value: "09" },
                { label: "10 - Trabalhador avulso", value: "10" },
                { label: "11 - Empregador", value: "11" },
                { label: "12 - Outros", value: "12" },
                { label: "99 - Ignorado", value: "99" },
            ],
        },
        {
            name: "work_time_unit",
            label: "Tempo de Trabalho na Ocupação (Unidade)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "",
            options: timeUnitOptions,
        },
        {
            name: "work_time_value",
            label: "Tempo de Trabalho na Ocupação (Valor)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 5. DADOS DA EMPRESA CONTRATANTE (Campos 34 a 45)
// -----------------------------------------------------------------------------
const companySection = {
    id: "company",
    title: "Dados da Empresa Contratante",
    description: "Informações sobre a empresa onde o paciente trabalha.",
    columns: 3,
    fields: [
        { name: "company_cnpj_cpf", label: "Registro/CNPJ ou CPF", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_name", label: "Nome da Empresa ou Empregador", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_cnae", label: "Atividade Econômica (CNAE)", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_state", label: "UF da Empresa", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_city", label: "Município da Empresa", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_district", label: "Distrito", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_neighborhood", label: "Bairro", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_address", label: "Endereço", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_number", label: "Número", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_reference", label: "Ponto de Referência", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        { name: "company_phone", label: "(DDD) Telefone", kind: "text", schema: optionalTextSchema, defaultValue: "" },
        {
            name: "company_is_outsourced",
            label: "O Empregador é Empresa Terceirizada",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Não se aplica", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 6. ACIDENTE COM MATERIAL BIOLÓGICO (Campos 46 a 52)
// -----------------------------------------------------------------------------
const biologicalMaterialExposureSection = {
    id: "biological_exposure",
    title: "Acidente com Material Biológico",
    description: "Detalhes do acidente, circunstâncias e exames.",
    columns: 3,
    fields: [
        // 46 Tipo de Exposição (Multi-select / Checkboxes represented as select options for form parity)
        { name: "exp_type_percutaneous", label: "Tipo de Exposição: Percutânea", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_type_intact_skin", label: "Tipo de Exposição: Pele íntegra", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_type_mucosa", label: "Tipo de Exposição: Mucosa (oral/ocular)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_type_non_intact_skin", label: "Tipo de Exposição: Pele não íntegra", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "exp_type_others", label: "Tipo de Exposição: Outros", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },

        // 47 Material Orgânico
        {
            name: "organic_material",
            label: "Material orgânico",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Sangue", value: "1" },
                { label: "2 - Líquor", value: "2" },
                { label: "3 - Líquido pleural", value: "3" },
                { label: "4 - Líquido ascítico", value: "4" },
                { label: "5 - Líquido amniótico", value: "5" },
                { label: "6 - Fluido com sangue", value: "6" },
                { label: "7 - Soro/plasma", value: "7" },
                { label: "8 - Outros", value: "8" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        { name: "organic_material_others", label: "Outro Material Orgânico", kind: "text", schema: optionalTextSchema, defaultValue: "" },

        // 48 Circunstância do Acidente
        {
            name: "accident_circumstance",
            label: "Circunstância do Acidente",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "99",
            options: [
                { label: "01 - Administ. de medicação endovenosa", value: "01" },
                { label: "02 - Administ. de medicação intramuscular", value: "02" },
                { label: "03 - Administ. de medicação subcutânea", value: "03" },
                { label: "04 - Administ. de medicação intradérmica", value: "04" },
                { label: "05 - Punção venosa/arterial para coleta de sangue", value: "05" },
                { label: "06 - Punção venosa/arterial não especificada", value: "06" },
                { label: "07 - Descarte inadequado de material perfurocortante em saco de lixo", value: "07" },
                { label: "08 - Descarte inadequado de material perfurocortante em bancada, cama, chão, etc...", value: "08" },
                { label: "09 - Lavanderia", value: "09" },
                { label: "10 - Lavagem de material", value: "10" },
                { label: "11 - Manipulação de caixa com material perfurocortante", value: "11" },
                { label: "12 - Procedimento cirúrgico", value: "12" },
                { label: "13 - Procedimento odontológico", value: "13" },
                { label: "14 - Procedimento laboratorial", value: "14" },
                { label: "15 - Dextro", value: "15" },
                { label: "16 - Reencape", value: "16" },
                { label: "98 - Outros", value: "98" },
                { label: "99 - Ignorado", value: "99" },
            ],
        },

        // 49 Agente
        {
            name: "agent",
            label: "Agente",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Agulha com lúmen (luz)", value: "1" },
                { label: "2 - Agulha sem lúmen/maciça", value: "2" },
                { label: "3 - Intracath", value: "3" },
                { label: "4 - Vidros", value: "4" },
                { label: "5 - Lâmina/lanceta (qualquer tipo)", value: "5" },
                { label: "6 - Outros", value: "6" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },

        // 50 Uso de EPI
        { name: "epi_glove", label: "Uso de EPI: Luva", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "epi_apron", label: "Uso de EPI: Avental", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "epi_glasses", label: "Uso de EPI: Óculos", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "epi_mask", label: "Uso de EPI: Máscara", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "epi_face_shield", label: "Uso de EPI: Proteção facial", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "epi_boots", label: "Uso de EPI: Bota", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },

        // 51 Situação vacinal
        {
            name: "vaccine_status_hepb",
            label: "Situação vacinal do acidentado em relação à hepatite B (3 doses)",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Vacinado", value: "1" },
                { label: "2 - Não vacinado", value: "2" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },

        // 52 Resultados de exames do acidentado
        { name: "exam_zero_anti_hiv", label: "Exame data ZERO: Anti-HIV", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },
        { name: "exam_zero_hbsag", label: "Exame data ZERO: HbsAg", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },
        { name: "exam_zero_anti_hbs", label: "Exame data ZERO: Anti-HBs", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },
        { name: "exam_zero_anti_hcv", label: "Exame data ZERO: Anti-HCV", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 7. PACIENTE FONTE E CONDUTA (Campos 53 a 55)
// -----------------------------------------------------------------------------
const sourceAndConductSection = {
    id: "source_and_conduct",
    title: "Dados do Paciente Fonte e Conduta",
    description: "Resultados sorológicos do paciente fonte e condutas pós-acidente.",
    columns: 3,
    fields: [
        // 53 Paciente Fonte Conhecida?
        {
            name: "source_patient_known",
            label: "Paciente Fonte Conhecida?",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: yesNoIgnoredOptions,
        },

        // 54 Resultados sorológicos paciente fonte
        { name: "source_exam_hbsag", label: "Sorologia Paciente Fonte: Hbs Ag", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },
        { name: "source_exam_anti_hiv", label: "Sorologia Paciente Fonte: Anti-HIV", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },
        { name: "source_exam_anti_hbc", label: "Sorologia Paciente Fonte: Anti-HBc", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },
        { name: "source_exam_anti_hcv", label: "Sorologia Paciente Fonte: Anti-HCV", kind: "select", schema: optionalTextSchema, defaultValue: "9", options: examResultOptions },

        // 55 Conduta no momento do acidente
        { name: "conduct_no_indication", label: "Conduta: Sem indicação de quimioprofilaxia", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_refused", label: "Conduta: Recusou quimioprofilaxia indicada", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_azt_3tc", label: "Conduta: AZT+3TC", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_azt_3tc_indinavir", label: "Conduta: AZT+3TC+Indinavir", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_azt_3tc_nelfinavir", label: "Conduta: AZT+3TC+Nelfinavir", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_hepb_vaccine", label: "Conduta: Vacina contra hepatite B", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_hbig", label: "Conduta: Imunoglobulina humana contra hepatite B (HBIG)", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_other_arv", label: "Conduta: Outro Esquema de ARV", kind: "select", schema: optionalTextSchema, defaultValue: "", options: yesNoIgnoredOptions },
        { name: "conduct_other_arv_specify", label: "Especifique o Outro Esquema", kind: "text", schema: optionalTextSchema, defaultValue: "" },
    ],
} satisfies NotificationSectionDefinition;

// -----------------------------------------------------------------------------
// 8. CONCLUSÃO (Campos 56 a 58)
// -----------------------------------------------------------------------------
const conclusionSection = {
    id: "conclusion",
    title: "Conclusão",
    description: "Evolução do caso e informações complementares.",
    columns: 3,
    fields: [
        {
            name: "case_evolution",
            label: "Evolução do Caso",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Alta com conversão sorológica", value: "1" },
                { label: "2 - Alta sem conversão sorológica", value: "2" },
                { label: "3 - Alta paciente fonte negativo", value: "3" },
                { label: "4 - Abandono", value: "4" },
                { label: "5 - Óbito por acidente com exposição à material biológico", value: "5" },
                { label: "6 - Óbito por Outra Causa", value: "6" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        {
            name: "case_evolution_virus_specify",
            label: "Especificar vírus (se conversão sorológica)",
            kind: "text",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "dt_death",
            label: "Se Óbito, Data",
            kind: "date",
            schema: optionalTextSchema,
            defaultValue: "",
        },
        {
            name: "cat_issued",
            label: "Foi emitida a Comunicação de Acidente do Trabalho",
            kind: "select",
            schema: optionalTextSchema,
            defaultValue: "9",
            options: [
                { label: "1 - Sim", value: "1" },
                { label: "2 - Não", value: "2" },
                { label: "3 - Não se aplica", value: "3" },
                { label: "9 - Ignorado", value: "9" },
            ],
        },
        {
            name: "additional_observations",
            label: "Informações complementares e observações",
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
    complementarySection,
    companySection,
    biologicalMaterialExposureSection,
    sourceAndConductSection,
    conclusionSection,
] as const satisfies readonly NotificationSectionDefinition[];

export const biologicalMaterialExposureNotificationDefinition = defineNotificationType({
    id: 11,
    slug: "biological_material_exposure",
    label: "Acidente de Trabalho com Exposição à Material Biológico",
    description: `Todo caso de acidente de trabalho ocorrido com quaisquer categorias profissionais, envolvendo exposição direta ou indireta do trabalhador a material biológico (orgânico) potencialmente contaminado por patógenos (vírus, bactérias, fungos, príons e protozoários), por meio de material perfuro-cortante ou não.`,
    sections,
});