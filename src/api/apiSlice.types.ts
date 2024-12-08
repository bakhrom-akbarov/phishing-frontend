export type LoginRequest = { email: string; password: string }

export type LoginResponse = { token: string }

export type RegisterRequest = LoginRequest

export type ListPhishingAttemptsRequest = { page: number; limit: number }

export type PhishingAttemptItem = { id: string; email: string; linkClicked: boolean; createdAt: string }

export type ListPhishingAttemptsResponse = {
  data: PhishingAttemptItem[],
  total: number
}
