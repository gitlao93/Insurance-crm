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
    async getUserStats(agencyId) {
        const whereClause = agencyId ? { agencyId } : {};
        const totalUsers = await this.userRepository.count({ where: whereClause });
        const collectionSupervisors = await this.userRepository.count({
            where: { ...whereClause, role: user_entity_1.UserRole.COLLECTION_SUPERVISOR },
        });
        const agents = await this.userRepository.count({
            where: { ...whereClause, role: user_entity_1.UserRole.AGENT },
        });
        const admins = await this.userRepository.count({
            where: { ...whereClause, role: user_entity_1.UserRole.ADMIN },
        });
        return {
            totalUsers,
            collectionSupervisors,
            agents,
            admins,
        };
    }
    async getSupervisorsWithAgents(agencyId, user) {
        let supervisors;
        if (user?.role === user_entity_1.UserRole.COLLECTION_SUPERVISOR) {
            supervisors = await this.userRepository.find({
                where: { id: user.id, isActive: true },
                relations: ["subordinates"],
            });
        }
        else {
            supervisors = await this.userRepository.find({
                where: {
                    agencyId,
                    role: user_entity_1.UserRole.COLLECTION_SUPERVISOR,
                    isActive: true,
                },
                relations: ["subordinates"],
            });
        }
        return supervisors.map((sup) => ({
            id: sup.id,
            name: `${sup.firstName} ${sup.lastName}`,
            agentCount: sup.subordinates.length,
            agents: sup.subordinates.map((agent) => ({
                id: agent.id,
                name: `${agent.firstName} ${agent.lastName}`,
            })),
        }));
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