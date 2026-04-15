import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { PatientSchema } from "@/schemas/patient.schema"
import { patientService } from "@/services/patient.service"

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: patientService.list,
  })
}

export function useCreatePatient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: PatientSchema) => patientService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
  })
}
