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
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const agency_entity_1 = require("../agencies/entities/agency.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
let SeederService = class SeederService {
    constructor(agencyRepository, userRepository) {
        this.agencyRepository = agencyRepository;
        this.userRepository = userRepository;
    }
    async seed() {
        console.log("🌱 Starting database seeding...");
        await this.userRepository.createQueryBuilder().delete().execute();
        await this.agencyRepository.createQueryBuilder().delete().execute();
        await this.userRepository.query("ALTER TABLE users AUTO_INCREMENT = 1");
        await this.agencyRepository.query("ALTER TABLE agencies AUTO_INCREMENT = 1");
        const agencies = await this.createAgencies();
        console.log(`✅ Created ${agencies.length} agencies`);
        const users = await this.createUsers(agencies);
        console.log(`✅ Created ${users.length} users`);
        console.log("🎉 Database seeding completed successfully!");
    }
    async createAgencies() {
        const agencyData = [
            {
                agencyName: "GoodLife Damayan",
                street: "J. Seriña St",
                cityMunicipality: "Cagayan de Oro City",
                postalCode: "9000",
                isActive: true,
            },
            {
                agencyName: "GoodLife Damayan",
                street: "Brgy. 24-C Boulevard",
                cityMunicipality: "Davao City",
                postalCode: "8003",
                isActive: true,
            },
        ];
        const agencies = this.agencyRepository.create(agencyData);
        return await this.agencyRepository.save(agencies);
    }
    async createUsers(agencies) {
        const hashedPassword = await bcrypt.hash("password123", 10);
        const userData = [
            {
                firstName: "John",
                lastName: "Admin",
                email: "john.admin@goodlifecdo.com",
                password: hashedPassword,
                phoneNumber: "+63-917-123-4567",
                landlineNumber: "(02) 8123-4567",
                officeHours: "8:00 AM - 5:00 PM",
                role: user_entity_1.UserRole.ADMIN,
                isActive: true,
                agencyId: agencies[0].id,
            },
            {
                firstName: "Maria",
                lastName: "Agenteuno",
                email: "maria.agent1@goodlifecdo.com",
                password: hashedPassword,
                phoneNumber: "+63-917-234-5678",
                landlineNumber: "(02) 8234-5678",
                officeHours: "9:00 AM - 6:00 PM",
                role: user_entity_1.UserRole.AGENT,
                isActive: true,
                agencyId: agencies[0].id,
            },
            {
                firstName: "Carlos",
                lastName: "DosAgente",
                email: "carlos.agent2@goodlifecdo.com",
                password: hashedPassword,
                phoneNumber: "+63-917-345-6789",
                landlineNumber: null,
                officeHours: "8:30 AM - 5:30 PM",
                role: user_entity_1.UserRole.AGENT,
                isActive: true,
                agencyId: agencies[0].id,
            },
            {
                firstName: "Ana",
                lastName: "Collens",
                email: "ana.collection@goodlifecdo.com",
                password: hashedPassword,
                phoneNumber: "+63-917-456-7890",
                landlineNumber: "(02) 8456-7890",
                officeHours: "8:00 AM - 5:00 PM",
                role: user_entity_1.UserRole.COLLECTION_SUPERVISOR,
                isActive: true,
                agencyId: agencies[0].id,
            },
        ];
        const users = this.userRepository.create(userData);
        return await this.userRepository.save(users);
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(agency_entity_1.Agency)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], SeederService);
//# sourceMappingURL=seeder.service.js.map