import api from "./api";

export interface Agency {
  id: number;
  agencyName: string;
  street: string;
  cityMunicipality: string;
  postalCode: string;
  email: string;
  phoneNumber?: string;
  landLine?: string;
  isActive: boolean;
  createdAt?: string; // if your backend has timestamps
}

export interface CreateAgencyRequest {
  agencyName: string;
  street: string;
  cityMunicipality: string;
  postalCode: string;
  email: string;
  phoneNumber?: string;
  landLine?: string;
  isActive?: boolean;
}

export type UpdateAgencyRequest = Partial<CreateAgencyRequest>;

export const agencyService = {
  async getAgencies(): Promise<Agency[]> {
    const response = await api.get("/agencies");
    return response.data;
  },

  async getAgencyById(id: number): Promise<Agency> {
    const response = await api.get(`/agencies/${id}`);
    return response.data;
  },

  async createAgency(data: CreateAgencyRequest): Promise<Agency> {
    const response = await api.post("/agencies", data);
    return response.data;
  },

  async updateAgency(id: number, data: UpdateAgencyRequest): Promise<Agency> {
    const response = await api.patch(`/agencies/${id}`, data);
    return response.data;
  },

  async deleteAgency(id: number): Promise<void> {
    await api.delete(`/agencies/${id}`);
  },
};
