import api from "./api";

// ========== Types ==========
export interface PolicyCategory {
  id: number;
  categoryName: string;
  description?: string;
  plans?: PolicyPlan[];
}

export interface PolicyPlan {
  id: number;
  categoryId: number;
  planName: string;
  monthlyRate: number;
  currency: string;
  coverageAmount: number;
  status: "active" | "inactive";
  note?: string;
  category?: PolicyCategory;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePolicyCategoryRequest {
  categoryName: string;
  description?: string;
}

export interface UpdatePolicyCategoryRequest
  extends Partial<CreatePolicyCategoryRequest> {}

export interface CreatePolicyPlanRequest {
  categoryId: number;
  planName: string;
  monthlyRate: number;
  currency: string;
  coverageAmount: number;
  status?: "active" | "inactive";
}

export interface UpdatePolicyPlanRequest
  extends Partial<CreatePolicyPlanRequest> {}

// ========== API Service ==========
export const policyService = {
  // ---- Categories ----
  async getCategories(): Promise<PolicyCategory[]> {
    const response = await api.get("/policy-categories");
    return response.data;
  },

  async getCategoryById(id: number): Promise<PolicyCategory> {
    const response = await api.get(`/policy-categories/${id}`);
    return response.data;
  },

  async createCategory(
    data: CreatePolicyCategoryRequest
  ): Promise<PolicyCategory> {
    const response = await api.post("/policy-categories", data);
    return response.data;
  },

  async updateCategory(
    id: number,
    data: UpdatePolicyCategoryRequest
  ): Promise<PolicyCategory> {
    const response = await api.patch(`/policy-categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(id: number): Promise<void> {
    await api.delete(`/policy-categories/${id}`);
  },

  // ---- Plans ----
  async getPlans(categoryId?: number): Promise<PolicyPlan[]> {
    const params = categoryId ? { categoryId } : {};
    const response = await api.get("/policy-plans", { params });
    console.log("Fetched plans:", response.data);
    return response.data;
  },

  async getPlanById(id: number): Promise<PolicyPlan> {
    const response = await api.get(`/policy-plans/${id}`);
    return response.data;
  },

  async createPlan(data: CreatePolicyPlanRequest): Promise<PolicyPlan> {
    const response = await api.post("/policy-plans", data);
    return response.data;
  },

  async updatePlan(
    id: number,
    data: UpdatePolicyPlanRequest
  ): Promise<PolicyPlan> {
    const response = await api.patch(`/policy-plans/${id}`, data);
    return response.data;
  },

  async deletePlan(id: number): Promise<void> {
    await api.delete(`/policy-plans/${id}`);
  },
};
