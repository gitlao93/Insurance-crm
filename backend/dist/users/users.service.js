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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const typeorm_2 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const existingUser = await this.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.ConflictException("User with this email already exists");
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return await this.userRepository.save(user);
    }
    async findAll(agencyId) {
        const whereCondition = {};
        if (agencyId) {
            whereCondition.agencyId = agencyId;
        }
        return await this.userRepository.find({
            where: whereCondition,
            relations: ["agency"],
        });
    }
    async findOne(id) {
        return await this.userRepository.findOne({
            where: { id },
            relations: ["agency"],
        });
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({
            where: { email, isActive: true },
            relations: ["agency"],
        });
    }
    async findByRole(role, agencyId) {
        const whereCondition = { role, isActive: true };
        if (agencyId) {
            whereCondition.agencyId = agencyId;
        }
        return await this.userRepository.find({
            where: whereCondition,
            relations: ["agency"],
        });
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (updateUserDto.password && updateUserDto.password.trim() !== "") {
            const saltRounds = 10;
            user.password = await bcrypt.hash(updateUserDto.password, saltRounds);
        }
        for (const [key, value] of Object.entries(updateUserDto)) {
            if (key === "password")
                continue;
            if (value !== undefined) {
                user[key] = value;
            }
        }
        return await this.userRepository.save(user);
    }
    async deactivate(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        user.isActive = false;
        return await this.userRepository.save(user);
    }
    async activate(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        user.isActive = true;
        return await this.userRepository.save(user);
    }
    async remove(id) {
        await this.userRepository.update(id, { isActive: false });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map