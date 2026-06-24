"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ClipboardList, Save, Search, UserPlus } from "lucide-react"
import * as React from "react"
import { useForm, useWatch, type Resolver } from "react-hook-form"

import { DateField } from "@/components/forms/date-field"
import { InputField } from "@/components/forms/input-field"
import { SelectField } from "@/components/forms/select-field"
import { TextareaField } from "@/components/forms/textarea-field"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreatePatient, usePatients } from "@/hooks/use-patients"
import { useUnits } from "@/hooks/use-units"
import {
  getNotificationTypeDefinition,
  notificationStatusOptions,
  notificationTypeOptions,
  type NotificationFieldDefinition,
  type NotificationSectionDefinition,
} from "@/lib/notification-types"
import {
  notificationFormSchema,
  notificationSchema,
  type NotificationFormSchema,
  type NotificationSchema,
} from "@/schemas/notification.schema"
import { patientSchema } from "@/schemas/patient.schema"
import { getApiErrorMessage } from "@/services/api"
import type {
  NotificationTypeSlug,
} from "@/types/notification"
import type { Patient } from "@/types/patient"
import type { Unit } from "@/types/unit"

const defaultNotificationType = "aids" satisfies NotificationTypeSlug
const emptyPatients: Patient[] = []
const emptyUnits: Unit[] = []
const emptyNewPatient: NotificationFormSchema["new_patient"] = {
  name: "",
  document: "",
  birth_date: "",
  phone: "",
}

type AidsPatientSnapshot = {
  patient_name: string
  patient_cpf: string
  patient_birth_date: string
}

type TimelineItem = {
  date: string
  label: string
  source: string
}

type NotificationFormProps = {
  onSubmit: (values: NotificationSchema) => void | Promise<void>
  isSubmitting?: boolean
}

function buildFormDataDefaults(
  notificationType: NotificationTypeSlug,
  patient?: Patient
): NotificationFormSchema["form_data"] {
  const definition = getNotificationTypeDefinition(notificationType)
  const defaults = { ...definition.defaultValues }

  if (notificationType === "aids" && patient) {
    return {
      ...defaults,
      patient_name: patient.name,
      patient_cpf: patient.document ?? "",
      patient_birth_date: patient.birth_date ?? "",
    }
  }

  return defaults
}

function getSectionGridClass(columns: 1 | 2 | 3 = 2) {
  if (columns === 1) {
    return "grid-cols-1"
  }

  if (columns === 3) {
    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
  }

  return "grid-cols-1 md:grid-cols-2"
}

function getFieldSpanClass(columns: 1 | 2 | 3 = 2) {
  if (columns === 3) {
    return "md:col-span-2 xl:col-span-3"
  }

  if (columns === 2) {
    return "md:col-span-2"
  }

  return "col-span-1"
}

function isFieldEmpty(field: NotificationFieldDefinition, value: unknown) {
  if (field.kind === "checkbox") {
    return value === undefined || value === null
  }

  if (field.kind === "number") {
    return value === undefined || value === null || Number.isNaN(value)
  }

  return value === undefined || value === null || String(value).trim() === ""
}

function buildRequiredFieldErrors(
  sections: readonly NotificationSectionDefinition[],
  formData: Record<string, unknown>
) {
  return sections.flatMap((section) =>
    section.fields
      .filter((field) => isFieldEmpty(field, formData[field.name]))
      .map((field) => ({
        name: field.name,
        label: field.label,
      }))
  )
}

function formatDateForTimeline(value: string) {
  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) {
    return value
  }

  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(year, month - 1, day)
  )
}

function isDateValue(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function buildTimelineItems({
  selectedPatient,
  newPatientBirthDate,
  notificationDate,
  occurrenceDate,
  sections,
  formData,
}: {
  selectedPatient?: Patient
  newPatientBirthDate: string
  notificationDate?: string
  occurrenceDate?: string
  sections: readonly NotificationSectionDefinition[]
  formData: Record<string, unknown>
}) {
  const items: TimelineItem[] = []
  const patientBirthDate = selectedPatient?.birth_date ?? newPatientBirthDate

  if (isDateValue(patientBirthDate)) {
    items.push({
      date: patientBirthDate,
      label: "Nascimento do paciente",
      source: "Cadastro do paciente",
    })
  }

  if (isDateValue(occurrenceDate)) {
    items.push({
      date: occurrenceDate,
      label: "Ocorrência do agravo",
      source: "Notificação",
    })
  }

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      const value = formData[field.name]

      if (field.kind === "date" && isDateValue(value)) {
        items.push({
          date: value,
          label: field.label,
          source: section.title,
        })
      }
    })
  })

  if (isDateValue(notificationDate)) {
    items.push({
      date: notificationDate,
      label: "Registro da notificação",
      source: "Sistema",
    })
  }

  return items
    .filter(
      (item, index, list) =>
        list.findIndex(
          (current) =>
            current.date === item.date &&
            current.label === item.label &&
            current.source === item.source
        ) === index
    )
    .sort((left, right) => left.date.localeCompare(right.date))
}

function matchesPatientSearch(patient: Patient, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  if (!normalizedSearch) {
    return true
  }

  const normalizedDocumentSearch = searchTerm.replace(/\D/g, "")
  const patientDocument = (patient.document ?? "").replace(/\D/g, "")

  return (
    patient.name.toLowerCase().includes(normalizedSearch) ||
    (normalizedDocumentSearch.length > 0 &&
      patientDocument.includes(normalizedDocumentSearch))
  )
}

function buildPatientSnapshot(patient?: Patient): AidsPatientSnapshot | null {
  if (!patient) {
    return null
  }

  return {
    patient_name: patient.name,
    patient_cpf: patient.document ?? "",
    patient_birth_date: patient.birth_date ?? "",
  }
}

function buildNewPatientSnapshot(
  patient: {
    name: string
    document: string
    birth_date: string
  }
): AidsPatientSnapshot {
  return {
    patient_name: patient.name,
    patient_cpf: patient.document,
    patient_birth_date: patient.birth_date,
  }
}

function mergeAidsPatientSnapshot(
  formData: NotificationFormSchema["form_data"],
  nextSnapshot: AidsPatientSnapshot,
  previousSnapshot: AidsPatientSnapshot | null
) {
  if (!("patient_name" in formData)) {
    return formData
  }

  const patient_name =
    formData.patient_name === "" ||
      formData.patient_name === previousSnapshot?.patient_name
      ? nextSnapshot.patient_name
      : formData.patient_name

  const patient_cpf =
    formData.patient_cpf === "" ||
      formData.patient_cpf === previousSnapshot?.patient_cpf
      ? nextSnapshot.patient_cpf
      : formData.patient_cpf

  const patient_birth_date =
    formData.patient_birth_date === "" ||
      formData.patient_birth_date === previousSnapshot?.patient_birth_date
      ? nextSnapshot.patient_birth_date
      : formData.patient_birth_date

  if (
    patient_name === formData.patient_name &&
    patient_cpf === formData.patient_cpf &&
    patient_birth_date === formData.patient_birth_date
  ) {
    return formData
  }

  return {
    ...formData,
    patient_name,
    patient_cpf,
    patient_birth_date,
  }
}

export function NotificationForm({
  onSubmit,
  isSubmitting,
}: NotificationFormProps) {
  const patientsQuery = usePatients()
  const createPatient = useCreatePatient()
  const unitsQuery = useUnits()
  const patients = patientsQuery.data?.data ?? emptyPatients
  const units = unitsQuery.data?.data ?? emptyUnits
  const [patientSearch, setPatientSearch] = React.useState("")
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState<
    string | null
  >(null)
  const [createdInlinePatient, setCreatedInlinePatient] =
    React.useState<Patient | null>(null)
  const deferredPatientSearch = React.useDeferredValue(patientSearch)
  const lastSyncedPatientSnapshotRef =
    React.useRef<AidsPatientSnapshot | null>(null)

  const form = useForm<NotificationFormSchema>({
    resolver:
      zodResolver(notificationFormSchema) as unknown as Resolver<NotificationFormSchema>,
    defaultValues: {
      patient_id: undefined,
      patient_mode: "existing",
      new_patient: emptyNewPatient,
      unit_id: units[0]?.id,
      notification_type_slug: defaultNotificationType,
      status: "pending",
      notification_date: new Date().toISOString().slice(0, 10),
      occurrence_date: "",
      notes: "",
      form_data: buildFormDataDefaults(defaultNotificationType),
    },
  })

  const selectedType = useWatch({
    control: form.control,
    name: "notification_type_slug",
  })
  const selectedPatientId = useWatch({
    control: form.control,
    name: "patient_id",
  })
  const patientMode = useWatch({
    control: form.control,
    name: "patient_mode",
  })
  const newPatient = useWatch({
    control: form.control,
    name: "new_patient",
  })
  const status = useWatch({
    control: form.control,
    name: "status",
  })
  const notificationDate = useWatch({
    control: form.control,
    name: "notification_date",
  })
  const occurrenceDate = useWatch({
    control: form.control,
    name: "occurrence_date",
  })
  const formData = useWatch({
    control: form.control,
    name: "form_data",
  })
  const newPatientName = newPatient?.name ?? ""
  const newPatientDocument = newPatient?.document ?? ""
  const newPatientBirthDate = newPatient?.birth_date ?? ""

  const selectedPatient =
    patients.find((patient) => patient.id === selectedPatientId) ??
    (createdInlinePatient && createdInlinePatient.id === selectedPatientId
      ? createdInlinePatient
      : undefined)

  const definition = getNotificationTypeDefinition(
    selectedType ?? defaultNotificationType
  )
  const normalizedPatientSearch = deferredPatientSearch.trim()
  const filteredPatients = normalizedPatientSearch
    ? patients
      .filter((patient) => matchesPatientSearch(patient, normalizedPatientSearch))
      .slice(0, 8)
    : []
  const timelineItems = buildTimelineItems({
    selectedPatient,
    newPatientBirthDate,
    notificationDate,
    occurrenceDate,
    sections: definition.sections,
    formData,
  })

  React.useEffect(() => {
    if (units.length === 0) {
      return
    }

    if (!form.getValues("unit_id")) {
      form.setValue("unit_id", units[0].id)
    }
  }, [units, form])

  React.useEffect(() => {
    if (selectedType !== "aids") {
      lastSyncedPatientSnapshotRef.current = null
      return
    }

    const currentFormData = form.getValues("form_data")

    if (!("patient_name" in currentFormData)) {
      lastSyncedPatientSnapshotRef.current = null
      return
    }

    const nextSnapshot =
      patientMode === "existing"
        ? buildPatientSnapshot(selectedPatient)
        : buildNewPatientSnapshot({
          name: newPatientName,
          document: newPatientDocument,
          birth_date: newPatientBirthDate,
        })

    if (!nextSnapshot) {
      lastSyncedPatientSnapshotRef.current = null
      return
    }

    const nextFormData = mergeAidsPatientSnapshot(
      currentFormData,
      nextSnapshot,
      lastSyncedPatientSnapshotRef.current
    )

    if (nextFormData !== currentFormData) {
      form.setValue("form_data", nextFormData, {
        shouldDirty: true,
        shouldValidate: false,
      })
    }

    lastSyncedPatientSnapshotRef.current = nextSnapshot
  }, [
    selectedPatient,
    selectedType,
    patientMode,
    newPatientBirthDate,
    newPatientDocument,
    newPatientName,
    form,
  ])

  const unitOptions = units.map((unit) => ({
    label: `${unit.name} - ${unit.city}/${unit.state}`,
    value: String(unit.id),
  }))

  const submitLabel =
    createPatient.isPending
      ? "Cadastrando paciente..."
      : isSubmitting
        ? "Salvando notificação..."
        : status === "resolved"
          ? "Finalizar notificação"
          : status === "in_review"
            ? "Salvar e enviar para análise"
            : "Salvar pendente"

  function handlePatientModeChange(mode: NotificationFormSchema["patient_mode"]) {
    setSubmitErrorMessage(null)
    form.setValue("patient_mode", mode, {
      shouldDirty: true,
      shouldValidate: true,
    })

    if (mode === "new") {
      form.setValue("patient_id", undefined, {
        shouldDirty: true,
        shouldValidate: false,
      })
      form.clearErrors("patient_id")
      setPatientSearch("")
    }
  }

  function handlePatientSelect(patient: Patient) {
    setSubmitErrorMessage(null)
    form.setValue("patient_id", patient.id, {
      shouldDirty: true,
      shouldValidate: true,
    })
    form.setValue("patient_mode", "existing", {
      shouldDirty: true,
      shouldValidate: false,
    })
    form.clearErrors("patient_id")
    setPatientSearch("")
  }

  async function handleSubmit(values: NotificationFormSchema) {
    setSubmitErrorMessage(null)

    try {
      const parsedValues = notificationFormSchema.parse(values)
      const selectedDefinition = getNotificationTypeDefinition(
        parsedValues.notification_type_slug
      )
      const requiredFieldErrors = buildRequiredFieldErrors(
        selectedDefinition.sections,
        parsedValues.form_data
      )

      form.clearErrors("form_data")

      if (requiredFieldErrors.length > 0) {
        requiredFieldErrors.forEach((fieldError) => {
          form.setError(`form_data.${fieldError.name}` as never, {
            type: "required",
            message: "Campo obrigatório",
          })
        })
        setSubmitErrorMessage(
          `Preencha todos os campos obrigatórios da ficha. Pendentes: ${requiredFieldErrors
            .slice(0, 5)
            .map((fieldError) => fieldError.label)
            .join(", ")}${requiredFieldErrors.length > 5 ? "..." : ""}`
        )
        return
      }

      let patientId = parsedValues.patient_id

      if (parsedValues.patient_mode === "new") {
        const createdPatient = await createPatient.mutateAsync(
          patientSchema.parse(parsedValues.new_patient)
        )

        patientId = createdPatient.id
        setCreatedInlinePatient(createdPatient)
        form.setValue("patient_id", createdPatient.id, {
          shouldDirty: true,
          shouldValidate: false,
        })
        form.setValue("patient_mode", "existing", {
          shouldDirty: true,
          shouldValidate: false,
        })
        form.clearErrors("patient_id")
      }

      const notificationPayload = notificationSchema.parse({
        patient_id: patientId,
        unit_id: parsedValues.unit_id,
        status: parsedValues.status,
        notification_date: parsedValues.notification_date,
        occurrence_date: parsedValues.occurrence_date,
        notes: parsedValues.notes,
        notification_type_slug: parsedValues.notification_type_slug,
        form_data: parsedValues.form_data,
      })

      await onSubmit(notificationPayload)
    } catch (error) {
      setSubmitErrorMessage(getApiErrorMessage(error))
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="grid gap-4 rounded-2xl border border-border bg-muted/30 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-brand-soft p-2 text-brand">
              <ClipboardList className="size-5" />
            </div>
            <div className="grid gap-1">
              <h2 className="text-lg font-semibold">Identificação da notificação</h2>
              <p className="text-sm text-muted-foreground">
                Escolha o formulário, vincule a unidade e selecione um paciente
                existente ou cadastre um novo sem sair da notificação.
              </p>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-border bg-card p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="grid gap-1">
                <h3 className="text-base font-semibold">Paciente</h3>
                <p className="text-sm text-muted-foreground">
                  Pesquise por nome ou CPF para localizar rapidamente o cadastro
                  correto. Se não encontrar, crie o paciente neste fluxo.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={patientMode === "existing" ? "default" : "outline"}
                  onClick={() => handlePatientModeChange("existing")}
                >
                  <Search data-icon="inline-start" />
                  Pesquisar paciente
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={patientMode === "new" ? "default" : "outline"}
                  onClick={() => handlePatientModeChange("new")}
                >
                  <UserPlus data-icon="inline-start" />
                  Cadastrar novo paciente
                </Button>
              </div>
            </div>

            {patientMode === "existing" ? (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="patient-search"
                  >
                    Buscar por nome ou CPF
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="patient-search"
                      value={patientSearch}
                      onChange={(event) => setPatientSearch(event.currentTarget.value)}
                      placeholder="Digite nome ou CPF do paciente"
                      className="pl-9"
                      disabled={patientsQuery.isPending}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {patientsQuery.isPending
                      ? "Carregando pacientes..."
                      : "A busca usa os pacientes já carregados na tela."}
                  </p>
                </div>

                {selectedPatient ? (
                  <div className="grid gap-1 rounded-xl border border-brand/20 bg-brand-soft/40 p-4">
                    <p className="text-sm font-medium text-brand">
                      Paciente selecionado: {selectedPatient.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      CPF: {selectedPatient.document || "Não informado"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nascimento: {selectedPatient.birth_date || "Não informado"}
                    </p>
                  </div>
                ) : null}

                {normalizedPatientSearch ? (
                  filteredPatients.length > 0 ? (
                    <div className="grid gap-2">
                      {filteredPatients.map((patient) => (
                        <button
                          key={patient.id}
                          type="button"
                          className="grid gap-1 rounded-xl border border-border px-4 py-3 text-left transition-colors hover:border-brand/40 hover:bg-muted"
                          onClick={() => handlePatientSelect(patient)}
                        >
                          <span className="text-sm font-medium text-foreground">
                            {patient.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            CPF: {patient.document || "Não informado"}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                      Nenhum paciente encontrado com esse filtro.
                      <button
                        type="button"
                        className="ml-1 font-medium text-brand transition-colors hover:text-brand-hover"
                        onClick={() => handlePatientModeChange("new")}
                      >
                        Cadastre um novo paciente.
                      </button>
                    </div>
                  )
                ) : !selectedPatient ? (
                  <div className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                    Digite nome ou CPF para pesquisar um paciente cadastrado.
                  </div>
                ) : null}

                {form.formState.errors.patient_id ? (
                  <p className="text-sm text-destructive">
                    {String(form.formState.errors.patient_id.message ?? "")}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Os dados abaixo serão validados e o paciente será criado
                  automaticamente antes do envio da notificação.
                </p>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <InputField
                    control={form.control}
                    name={"new_patient.name"}
                    label="Nome"
                    placeholder="Nome completo"
                  />
                  <InputField
                    control={form.control}
                    name={"new_patient.document"}
                    label="CPF"
                    placeholder="00000000000"
                  />
                  <DateField
                    control={form.control}
                    name={"new_patient.birth_date"}
                    label="Nascimento"
                  />
                  <InputField
                    control={form.control}
                    name={"new_patient.phone"}
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SelectField
              control={form.control}
              name="unit_id"
              label="Unidade notificadora"
              placeholder="Selecione uma unidade"
              options={unitOptions}
              parseValue={Number}
              disabled={unitsQuery.isPending}
              description={
                unitsQuery.isPending ? "Carregando unidades..." : undefined
              }
            />
            <SelectField
              control={form.control}
              name="notification_type_slug"
              label="Tipo de formulário"
              options={notificationTypeOptions}
              onValueChange={(value) => {
                form.clearErrors("form_data")
                form.setValue(
                  "form_data",
                  buildFormDataDefaults(
                    value as NotificationTypeSlug,
                    patientMode === "existing" ? selectedPatient : undefined
                  ),
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  }
                )
              }}
            />
            <SelectField
              control={form.control}
              name="status"
              label="Status do fluxo"
              options={notificationStatusOptions}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DateField
              control={form.control}
              name="notification_date"
              label="Data da notificação"
            />
            <DateField
              control={form.control}
              name="occurrence_date"
              label="Data da ocorrência"
            />
          </div>

          <div className="rounded-2xl border border-brand/20 bg-card p-4">
            <p className="text-sm font-medium text-brand">{definition.label}</p>
            <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
              {definition.description}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Todos os campos da ficha são obrigatórios. Campos com valor padrão
              já vêm preenchidos automaticamente e podem ser ajustados antes do
              envio.
            </p>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="grid gap-1">
            <h3 className="text-base font-semibold">Cronologia do paciente</h3>
            <p className="text-sm text-muted-foreground">
              Linha do tempo consolidada a partir do cadastro do paciente, da
              ocorrência, da notificação e das datas preenchidas nesta ficha.
            </p>
          </div>

          {timelineItems.length > 0 ? (
            <ol className="grid gap-3">
              {timelineItems.map((item) => (
                <li
                  className="grid grid-cols-[8rem_1fr] gap-3 rounded-xl border border-border px-4 py-3 text-sm"
                  key={`${item.date}-${item.label}-${item.source}`}
                >
                  <time className="font-medium text-foreground">
                    {formatDateForTimeline(item.date)}
                  </time>
                  <div className="grid gap-0.5">
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.source}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
              Preencha datas da ficha para montar a cronologia.
            </div>
          )}
        </section>

        {definition.sections.map((section: NotificationSectionDefinition) => (
          <section
            key={section.id}
            className="grid gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <div className="grid gap-1">
              <h3 className="text-base font-semibold">{section.title}</h3>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>

            <div className={`grid gap-4 ${getSectionGridClass(section.columns)}`}>
              {section.fields.map((field: NotificationFieldDefinition) => {
                const name = `form_data.${field.name}` as never

                return (
                  <div
                    key={field.name}
                    className={field.fullWidth ? getFieldSpanClass(section.columns) : ""}
                  >
                    {field.kind === "select" ? (
                      <SelectField
                        control={form.control}
                        name={name}
                        label={`${field.label} *`}
                        placeholder={field.placeholder}
                        options={field.options ?? []}
                      />
                    ) : field.kind === "textarea" ? (
                      <TextareaField
                        control={form.control}
                        name={name}
                        label={`${field.label} *`}
                        placeholder={field.placeholder}
                      />
                    ) : field.kind === "date" ? (
                      <DateField
                        control={form.control}
                        name={name}
                        label={`${field.label} *`}
                      />
                    ) : field.kind === "checkbox" ? (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field: checkboxField }) => (
                          <FormItem className="flex min-h-8 items-center gap-3 rounded-lg border border-border px-3 py-2">
                            <FormControl>
                              <input
                                className="size-4 rounded border-border accent-brand"
                                type="checkbox"
                                checked={!!checkboxField.value}
                                onChange={(event) =>
                                  checkboxField.onChange(event.target.checked)
                                }
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {field.label} *
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <InputField
                        control={form.control}
                        name={name}
                        label={`${field.label} *`}
                        placeholder={field.placeholder}
                        type={field.kind === "number" ? "number" : "text"}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        <section className="grid gap-4 rounded-2xl border border-border bg-card p-5">
          <TextareaField
            control={form.control}
            name="notes"
            label="Observações gerais"
            placeholder="Registre complementos relevantes sobre a notificação."
          />
        </section>

        {submitErrorMessage ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {submitErrorMessage}
          </div>
        ) : null}

        <Button
          type="submit"
          className="w-fit"
          disabled={
            isSubmitting ||
            createPatient.isPending ||
            patientsQuery.isPending ||
            unitsQuery.isPending
          }
        >
          <Save data-icon="inline-start" />
          {submitLabel}
        </Button>
      </form>
    </Form>
  )
}
