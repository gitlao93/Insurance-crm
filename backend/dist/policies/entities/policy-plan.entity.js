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
exports.PolicyPlan = void 0;
const typeorm_1 = require("typeorm");
const policy_category_entity_1 = require("./policy-category.entity");
let PolicyPlan = class PolicyPlan {
};
exports.PolicyPlan = PolicyPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PolicyPlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], PolicyPlan.prototype, "planName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PolicyPlan.prototype, "monthlyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "PHP" }),
    __metadata("design:type", String)
], PolicyPlan.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], PolicyPlan.prototype, "coverageAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "active" }),
    __metadata("design:type", String)
], PolicyPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PolicyPlan.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => policy_category_entity_1.PolicyCategory, (category) => category.plans, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "categoryId" }),
    __metadata("design:type", policy_category_entity_1.PolicyCategory)
], PolicyPlan.prototype, "category", void 0);
exports.PolicyPlan = PolicyPlan = __decorate([
    (0, typeorm_1.Entity)("policy_plans")
], PolicyPlan);
//# sourceMappingURL=policy-plan.entity.js.map