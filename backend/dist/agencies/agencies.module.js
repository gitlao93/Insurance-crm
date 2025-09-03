"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgenciesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const agencies_service_1 = require("./agencies.service");
const agencies_controller_1 = require("./agencies.controller");
const agency_entity_1 = require("./entities/agency.entity");
let AgenciesModule = class AgenciesModule {
};
exports.AgenciesModule = AgenciesModule;
exports.AgenciesModule = AgenciesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([agency_entity_1.Agency])],
        controllers: [agencies_controller_1.AgenciesController],
        providers: [agencies_service_1.AgenciesService],
        exports: [agencies_service_1.AgenciesService],
    })
], AgenciesModule);
//# sourceMappingURL=agencies.module.js.map