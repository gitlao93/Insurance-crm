import api from "./api";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  landlineNumber?: string;
  officeHours?: string;
  role?: "admin" | "agent" | "collection_supervisor";
  agency?: {
    id: number;
    agencyName: string;
  };
  isActive?: boolean;
  createdAt?: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  landlineNumber?: string;
  officeHours?: string;
  role: "admin" | "agent" | "collection_supervisor";
  agencyId: number;
}

export const userService = {
  async getUsers(agencyId?: number): Promise<User[]> {
    const params = agencyId ? { agencyId } : {};
    const response = await api.get("/users", { params });
    return response.data;
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await api.post("/users", userData);
    return response.data;
  },

  async updateUser(
    id: number,
    userData: Partial<CreateUserRequest>
  ): Promise<User> {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
