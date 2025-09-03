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
exports.AgenciesController = void 0;
const common_1 = require("@nestjs/common");
const agencies_service_1 = require("./agencies.service");
const create_agency_dto_1 = require("./dto/create-agency.dto");
const update_agency_dto_1 = require("./dto/update-agency.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let AgenciesController = class AgenciesController {
    constructor(agenciesService) {
        this.agenciesService = agenciesService;
    }
    create(createAgencyDto) {
        return this.agenciesService.create(createAgencyDto);
    }
    findAll() {
        return this.agenciesService.findAll();
    }
    findOne(id) {
        return this.agenciesService.findOne(+id);
    }
    update(id, updateAgencyDto) {
        return this.agenciesService.update(+id, updateAgencyDto);
    }
    remove(id) {
        return this.agenciesService.remove(+id);
    }
};
exports.AgenciesController = AgenciesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agency_dto_1.CreateAgencyDto]),
    __metadata("design:returntype", void 0)
], AgenciesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgenciesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgenciesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agency_dto_1.UpdateAgencyDto]),
    __metadata("design:returntype", void 0)
], AgenciesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgenciesController.prototype, "remove", null);
exports.AgenciesController = AgenciesController = __decorate([
    (0, common_1.Controller)("agencies"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [agencies_service_1.AgenciesService])
], AgenciesController);
//# sourceMappingURL=agencies.controller.js.map