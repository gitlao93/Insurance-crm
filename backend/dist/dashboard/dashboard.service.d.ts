import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Agency } from "../agencies/entities/agency.entity";
export declare class DashboardService {
    private readonly userRepository;
    private readonly agencyRepository;
    constructor(userRepository: Repository<User>, agencyRepository: Repository<Agency>);
    getUserStats(agencyId?: number): Promise<{
        totalUsers: number;
        collectionSupervisors: number;
        agents: number;
        admins: number;
    }>;
    getSupervisorsWithAgents(agencyId: number, user?: User): Promise<{
        id: number;
        name: string;
        agentCount: number;
        agents: {
            id: number;
            name: string;
        }[];
    }[]>;
}
