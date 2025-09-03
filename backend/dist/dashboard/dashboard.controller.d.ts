import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardStats(): Promise<{
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
    getClients(): Promise<{
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
    getPolicyHolders(): Promise<{
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
    getCollections(): Promise<{
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
