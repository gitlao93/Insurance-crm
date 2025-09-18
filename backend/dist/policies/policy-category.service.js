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
exports.PolicyCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const policy_category_entity_1 = require("./entities/policy-category.entity");
let PolicyCategoryService = class PolicyCategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(dto) {
        const category = this.categoryRepository.create(dto);
        return this.categoryRepository.save(category);
    }
    async findAll() {
        return this.categoryRepository.find({ relations: ["plans"] });
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ["plans"],
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async update(id, dto) {
        await this.categoryRepository.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
    }
};
exports.PolicyCategoryService = PolicyCategoryService;
exports.PolicyCategoryService = PolicyCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(policy_category_entity_1.PolicyCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PolicyCategoryService);
//# sourceMappingURL=policy-category.service.js.map