import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { UnitSchema } from "@/schemas/unit.schema"
import { unitService } from "@/services/unit.service"

export function useUnits() {
  return useQuery({
    queryKey: ["units"],
    queryFn: unitService.list,
  })
}

export function useCreateUnit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UnitSchema) => unitService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["units"] }),
  })
}
