import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Agency } from "../agencies/entities/agency.entity";
export declare class DashboardService {
    private readonly userRepository;
    private readonly agencyRepository;
    constructor(userRepository: Repository<User>, agencyRepository: Repository<Agency>);
    getDashboardStats(user: User): Promise<{
        totalClients: number;
        activePolicies: number;
        pendingCollections: number;
        monthlyRevenue: number;
        recentActivities: {
            id: number;
            type: string;
            description: string;
            timestamp: string;
            status: string;
        }[];
    }>;
    getClients(user: User): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        status: string;
        assignedAgent: string;
        totalPolicies: number;
        lastContact: string;
        agencyId: number;
    }[]>;
    getPolicyHolders(user: User): Promise<{
        id: number;
        policyNumber: string;
        holderName: string;
        policyType: string;
        premium: number;
        status: string;
        startDate: string;
        endDate: string;
        assignedAgent: string;
        agencyId: number;
    }[]>;
    getCollections(user: User): Promise<{
        id: number;
        policyNumber: string;
        clientName: string;
        amountDue: number;
        dueDate: string;
        daysOverdue: number;
        status: string;
        lastContact: string;
        assignedAgent: string;
        notes: string;
        agencyId: number;
    }[]>;
}
