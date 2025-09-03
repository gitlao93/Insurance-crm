import api from "./api"

export interface DashboardStats {
  totalClients: number
  activePolicies: number
  pendingCollections: number
  monthlyRevenue: number
  recentActivities: Array<{
    id: number
    type: string
    description: string
    timestamp: string
    status: "success" | "warning" | "error"
  }>
}

export interface Client {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending"
  assignedAgent: string
  totalPolicies: number
  lastContact: string
}

export interface PolicyHolder {
  id: number
  policyNumber: string
  holderName: string
  policyType: string
  premium: number
  status: "active" | "expired" | "pending" | "cancelled"
  startDate: string
  endDate: string
  clientId: number
  clientName: string
  assignedAgent: string
}

export interface Collection {
  id: number
  policyNumber: string
  clientName: string
  amountDue: number
  dueDate: string
  daysOverdue: number
  status: "pending" | "overdue" | "in_progress" | "resolved"
  lastContact: string
  assignedAgent: string
  notes: string
}

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get("/dashboard/stats")
    return response.data
  },

  async getClients(): Promise<Client[]> {
    const response = await api.get("/dashboard/clients")
    return response.data
  },

  async getPolicyHolders(): Promise<PolicyHolder[]> {
    const response = await api.get("/dashboard/policy-holders")
    return response.data
  },

  async getCollections(): Promise<Collection[]> {
    const response = await api.get("/dashboard/collections")
    return response.data
  },
}
