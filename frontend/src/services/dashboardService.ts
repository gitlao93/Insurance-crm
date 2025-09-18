import api from "./api";

export interface UserStats {
  totalUsers: number;
  collectionSupervisors: number;
  agents: number;
  admins: number;
}

export interface SupervisorBox {
  id: number;
  name: string;
  agentCount: number;
  agents: { id: number; name: string }[];
}

export const dashboardService = {
  /**
   * Fetch user statistics for dashboard
   * @param agencyId Optional agency ID. If not provided, fetches for logged-in user's agency
   */
  async getUserStats(agencyId?: number): Promise<UserStats> {
    const response = await api.get("/dashboard/user-stats", {
      params: agencyId ? { agencyId } : {},
    });
    return response.data;
  },

  async getSupervisorsWithAgents(agencyId?: number): Promise<SupervisorBox[]> {
    const response = await api.get("/dashboard/supervisors", {
      params: { agencyId },
    });
    return response.data;
  },
};
