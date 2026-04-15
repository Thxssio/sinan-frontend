"use client"

import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { InputField } from "@/components/forms/input-field"

type DateFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
}

export function DateField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
}: DateFieldProps<TFieldValues>) {
  return <InputField control={control} name={name} label={label} type="date" />
}
