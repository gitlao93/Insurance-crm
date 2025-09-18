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
exports.PolicyCategoryController = void 0;
const common_1 = require("@nestjs/common");
const policy_category_service_1 = require("./policy-category.service");
const create_policy_dto_1 = require("./dto/create-policy.dto");
const update_policy_dto_1 = require("./dto/update-policy.dto");
let PolicyCategoryController = class PolicyCategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(dto) {
        return this.categoryService.create(dto);
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        return this.categoryService.findOne(+id);
    }
    update(id, dto) {
        return this.categoryService.update(+id, dto);
    }
    remove(id) {
        return this.categoryService.remove(+id);
    }
};
exports.PolicyCategoryController = PolicyCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_policy_dto_1.CreatePolicyCategoryDto]),
    __metadata("design:returntype", void 0)
], PolicyCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PolicyCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PolicyCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_policy_dto_1.UpdatePolicyCategoryDto]),
    __metadata("design:returntype", void 0)
], PolicyCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PolicyCategoryController.prototype, "remove", null);
exports.PolicyCategoryController = PolicyCategoryController = __decorate([
    (0, common_1.Controller)("policy-categories"),
    __metadata("design:paramtypes", [policy_category_service_1.PolicyCategoryService])
], PolicyCategoryController);
//# sourceMappingURL=policy-category.controller.js.map