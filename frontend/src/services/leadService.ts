import api from "./api";

export type LeadStatus = "New" | "In-Progress" | "Converted" | "Dropped";

export interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: LeadStatus;
  note?: string;
  agentId: number;
  policyPlanId: number;
  policyPlan?: {
    id: number;
    planName: string;
    categoryId: number;
    category?: { categoryId: number; categoryName: string };
  };
  createdAt: string;
}

export interface CreateLeadRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  agentId: number;
  policyPlanId: number;
  status: LeadStatus;
  note?: string;
}

export const leadService = {
  async getLeads(): Promise<Lead[]> {
    const response = await api.get("/leads");
    return response.data;
  },

  async createLead(data: CreateLeadRequest): Promise<Lead> {
    const response = await api.post("/leads", data);
    return response.data;
  },

  async updateLead(
    id: number,
    data: Partial<CreateLeadRequest>
  ): Promise<Lead> {
    const response = await api.patch(`/leads/${id}`, data);
    return response.data;
  },

  async deleteLead(id: number): Promise<void> {
    await api.delete(`/leads/${id}`);
  },
};
