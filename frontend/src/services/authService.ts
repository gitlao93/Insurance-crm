import api from "./api"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: "admin" | "agent" | "collection_supervisor"
    agency: {
      id: number
      agencyName: string
    }
  }
}

export interface ValidateTokenRequest {
  token: string
}

export interface ValidateTokenResponse {
  valid: boolean
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post("/auth/login", credentials)
    return response.data
  },

  async validateToken(token: string): Promise<ValidateTokenResponse> {
    const response = await api.post("/auth/validate", { token })
    return response.data
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me")
    return response.data
  },
}
