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
exports.Lead = exports.LeadStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const policy_plan_entity_1 = require("../../policies/entities/policy-plan.entity");
var LeadStatus;
(function (LeadStatus) {
    LeadStatus["NEW"] = "New";
    LeadStatus["IN_PROGRESS"] = "In-Progress";
    LeadStatus["CONVERTED"] = "Converted";
    LeadStatus["DROPPED"] = "Dropped";
})(LeadStatus || (exports.LeadStatus = LeadStatus = {}));
let Lead = class Lead {
};
exports.Lead = Lead;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lead.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Lead.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Lead.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: LeadStatus, default: LeadStatus.NEW }),
    __metadata("design:type", String)
], Lead.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lead.prototype, "agentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "agentId" }),
    __metadata("design:type", user_entity_1.User)
], Lead.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Lead.prototype, "policyPlanId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => policy_plan_entity_1.PolicyPlan, (plan) => plan.id, { onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "policyPlanId" }),
    __metadata("design:type", policy_plan_entity_1.PolicyPlan)
], Lead.prototype, "policyPlan", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lead.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Lead.prototype, "updatedAt", void 0);
exports.Lead = Lead = __decorate([
    (0, typeorm_1.Entity)("leads")
], Lead);
//# sourceMappingURL=lead.entity.js.map