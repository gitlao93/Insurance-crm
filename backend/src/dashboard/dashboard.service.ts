import { Injectable, ForbiddenException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User, UserRole } from "../users/entities/user.entity";
import { Agency } from "../agencies/entities/agency.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>
  ) {}

  async getDashboardStats(user: User) {
    // Role-based data filtering
    let totalClients = 0;
    let activePolicies = 0;
    let pendingCollections = 0;
    let monthlyRevenue = 0;

    switch (user.role) {
      case UserRole.ADMIN:
        // Admin sees all data for their agency
        totalClients = 156;
        activePolicies = 342;
        pendingCollections = 8;
        monthlyRevenue = 45600;
        break;
      case UserRole.AGENT:
        // Agent sees only their own data
        totalClients = 24;
        activePolicies = 45;
        pendingCollections = 0; // Agents don't see collections
        monthlyRevenue = 8450;
        break;
      case UserRole.COLLECTION_SUPERVISOR:
        // Collection supervisor sees collection-related data
        totalClients = 89;
        activePolicies = 178;
        pendingCollections = 23;
        monthlyRevenue = 23400;
        break;
    }

    return {
      totalClients,
      activePolicies,
      pendingCollections,
      monthlyRevenue,
      recentActivities: [
        {
          id: 1,
          type: "Client",
          description: "New client registration completed",
          timestamp: "2 hours ago",
          status: "success",
        },
        {
          id: 2,
          type: "Policy",
          description: "Policy renewal pending approval",
          timestamp: "4 hours ago",
          status: "warning",
        },
        {
          id: 3,
          type: "Collection",
          description: "Payment overdue - follow up required",
          timestamp: "1 day ago",
          status: "error",
        },
      ],
    };
  }

  async getClients(user: User) {
    // Mock data with role-based filtering
    const allClients = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "(555) 123-4567",
        status: "active",
        assignedAgent: "Agent Smith",
        totalPolicies: 3,
        lastContact: "2024-01-15",
        agencyId: user.agencyId,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@email.com",
        phone: "(555) 987-6543",
        status: "pending",
        assignedAgent: `${user.firstName} ${user.lastName}`,
        totalPolicies: 1,
        lastContact: "2024-01-10",
        agencyId: user.agencyId,
      },
    ];

    // Filter based on role
    if (user.role === UserRole.AGENT) {
      return allClients.filter(
        (client) =>
          client.assignedAgent === `${user.firstName} ${user.lastName}`
      );
    }

    return allClients;
  }

  async getPolicyHolders(user: User) {
    // Mock data with role-based filtering
    const allPolicies = [
      {
        id: 1,
        policyNumber: "POL-2024-001",
        holderName: "John Doe",
        policyType: "Life Insurance",
        premium: 1200,
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        assignedAgent: "Agent Smith",
        agencyId: user.agencyId,
      },
      {
        id: 2,
        policyNumber: "POL-2024-002",
        holderName: "Jane Smith",
        policyType: "Auto Insurance",
        premium: 800,
        status: "pending",
        startDate: "2024-02-01",
        endDate: "2025-01-31",
        assignedAgent: `${user.firstName} ${user.lastName}`,
        agencyId: user.agencyId,
      },
    ];

    // Filter based on role
    if (user.role === UserRole.AGENT) {
      return allPolicies.filter(
        (policy) =>
          policy.assignedAgent === `${user.firstName} ${user.lastName}`
      );
    }

    return allPolicies;
  }

  async getCollections(user: User) {
    // Only admin and collection supervisors can access collections
    if (user.role === UserRole.AGENT) {
      throw new ForbiddenException("Agents cannot access collection data");
    }

    return [
      {
        id: 1,
        policyNumber: "POL-2024-001",
        clientName: "John Doe",
        amountDue: 1200,
        dueDate: "2024-01-15",
        daysOverdue: 10,
        status: "overdue",
        lastContact: "2024-01-20",
        assignedAgent: "Agent Smith",
        notes: "Client requested payment extension",
        agencyId: user.agencyId,
      },
    ];
  }
}
