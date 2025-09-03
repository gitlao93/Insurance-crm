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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const agency_entity_1 = require("../agencies/entities/agency.entity");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboardStats() {
        return this.dashboardService.getDashboardStats({
            id: 1,
            role: user_entity_1.UserRole.ADMIN,
            agencyId: 1,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            landlineNumber: "",
            officeHours: "",
            isActive: false,
            agency: new agency_entity_1.Agency(),
        });
    }
    async getClients() {
        return this.dashboardService.getClients({
            id: 1,
            role: user_entity_1.UserRole.ADMIN,
            agencyId: 1,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            landlineNumber: "",
            officeHours: "",
            isActive: false,
            agency: new agency_entity_1.Agency(),
        });
    }
    async getPolicyHolders() {
        return this.dashboardService.getPolicyHolders({
            id: 1,
            role: user_entity_1.UserRole.ADMIN,
            agencyId: 1,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            landlineNumber: "",
            officeHours: "",
            isActive: false,
            agency: new agency_entity_1.Agency(),
        });
    }
    async getCollections() {
        return this.dashboardService.getCollections({
            id: 1,
            role: user_entity_1.UserRole.ADMIN,
            agencyId: 1,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            landlineNumber: "",
            officeHours: "",
            isActive: false,
            agency: new agency_entity_1.Agency(),
        });
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)("stats"),
    (0, roles_decorator_1.Roles)("admin", "agent", "collection_supervisor"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)("clients"),
    (0, roles_decorator_1.Roles)("admin", "agent"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getClients", null);
__decorate([
    (0, common_1.Get)("policy-holders"),
    (0, roles_decorator_1.Roles)("admin", "agent", "collection_supervisor"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getPolicyHolders", null);
__decorate([
    (0, common_1.Get)("collections"),
    (0, roles_decorator_1.Roles)("admin", "collection_supervisor"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getCollections", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)("dashboard"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map