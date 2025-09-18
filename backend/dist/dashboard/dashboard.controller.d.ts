import { DashboardService } from "./dashboard.service";
import { User } from "src/users/entities/user.entity";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getUserStats(req: any, agencyId?: string): Promise<{
        totalUsers: number;
        collectionSupervisors: number;
        agents: number;
        admins: number;
    }>;
    getSupervisors(user: User, agencyId?: number): Promise<{
        id: number;
        name: string;
        agentCount: number;
        agents: {
            id: number;
            name: string;
        }[];
    }[]>;
}
