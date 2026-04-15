export type ApiListResponse<T> = {
  data: T[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export type ApiMessageResponse = {
  message: string
}

export type ApiErrorResponse = {
  message?: string
  errors?: Record<string, string[]>
}
