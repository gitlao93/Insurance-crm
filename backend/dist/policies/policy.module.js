"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliciesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const policy_category_entity_1 = require("./entities/policy-category.entity");
const policy_plan_entity_1 = require("./entities/policy-plan.entity");
const policy_plan_controller_1 = require("./policy-plan.controller");
const policy_category_service_1 = require("./policy-category.service");
const policy_plan_service_1 = require("./policy-plan.service");
const policy_category_controller_1 = require("./policy-category.controller");
let PoliciesModule = class PoliciesModule {
};
exports.PoliciesModule = PoliciesModule;
exports.PoliciesModule = PoliciesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([policy_category_entity_1.PolicyCategory, policy_plan_entity_1.PolicyPlan])],
        providers: [policy_category_service_1.PolicyCategoryService, policy_plan_service_1.PolicyPlanService],
        controllers: [policy_category_controller_1.PolicyCategoryController, policy_plan_controller_1.PolicyPlanController],
        exports: [policy_category_service_1.PolicyCategoryService, policy_plan_service_1.PolicyPlanService],
    })
], PoliciesModule);
//# sourceMappingURL=policy.module.js.map