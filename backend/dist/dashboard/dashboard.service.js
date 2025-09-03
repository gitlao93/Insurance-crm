"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const agency_entity_1 = require("../agencies/entities/agency.entity");
const typeorm_2 = require("@nestjs/typeorm");
let DashboardService = class DashboardService {
    constructor(userRepository, agencyRepository) {
        this.userRepository = userRepository;
        this.agencyRepository = agencyRepository;
    }
    async getDashboardStats(user) {
        let totalClients = 0;
        let activePolicies = 0;
        let pendingCollections = 0;
        let monthlyRevenue = 0;
        switch (user.role) {
            case user_entity_1.UserRole.ADMIN:
                totalClients = 156;
                activePolicies = 342;
                pendingCollections = 8;
                monthlyRevenue = 45600;
                break;
            case user_entity_1.UserRole.AGENT:
                totalClients = 24;
                activePolicies = 45;
                pendingCollections = 0;
                monthlyRevenue = 8450;
                break;
            case user_entity_1.UserRole.COLLECTION_SUPERVISOR:
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
    async getClients(user) {
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
        if (user.role === user_entity_1.UserRole.AGENT) {
            return allClients.filter((client) => client.assignedAgent === `${user.firstName} ${user.lastName}`);
        }
        return allClients;
    }
    async getPolicyHolders(user) {
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
        if (user.role === user_entity_1.UserRole.AGENT) {
            return allPolicies.filter((policy) => policy.assignedAgent === `${user.firstName} ${user.lastName}`);
        }
        return allPolicies;
    }
    async getCollections(user) {
        if (user.role === user_entity_1.UserRole.AGENT) {
            throw new common_1.ForbiddenException("Agents cannot access collection data");
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(agency_entity_1.Agency)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map