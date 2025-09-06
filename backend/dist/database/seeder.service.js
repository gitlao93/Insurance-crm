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
                agencyName: "GoodLife Damayan CDO",
                street: "J. Seriña St",
                cityMunicipality: "Cagayan de Oro City",
                postalCode: "9000",
                email: "cdo.branch@goodlife.com",
                phoneNumber: "09674589666",
                landLine: "(02) 1100-0000",
                isActive: true,
            },
            {
                agencyName: "GoodLife Damayan Davao",
                street: "Brgy. 24-C Boulevard",
                cityMunicipality: "Davao City",
                postalCode: "8003",
                email: "davao.branch@goodlife.com",
                phoneNumber: "09674589633",
                landLine: "(02) 2200-0000",
                isActive: true,
            },
        ];
        const agencies = this.agencyRepository.create(agencyData);
        return await this.agencyRepository.save(agencies);
    }
    async createUsers(agencies) {
        const hashedPassword = await bcrypt.hash("password123", 10);
        const users = [];
        for (const agency of agencies) {
            const admin = this.userRepository.create({
                firstName: `Admin`,
                lastName: agency.cityMunicipality,
                email: `admin.${agency.cityMunicipality.toLowerCase().replace(/\s/g, "")}@goodlife.com`,
                password: hashedPassword,
                phoneNumber: "+63-917-000-0000",
                landlineNumber: "(02) 8000-0000",
                officeHours: "8:00 AM - 5:00 PM",
                role: user_entity_1.UserRole.ADMIN,
                isActive: true,
                agencyId: agency.id,
            });
            await this.userRepository.save(admin);
            users.push(admin);
            for (let s = 1; s <= 2; s++) {
                const supervisor = this.userRepository.create({
                    firstName: `Supervisor${s}`,
                    lastName: agency.cityMunicipality,
                    email: `supervisor${s}.${agency.cityMunicipality.toLowerCase().replace(/\s/g, "")}@goodlife.com`,
                    password: hashedPassword,
                    phoneNumber: `+63-917-100-000${s}`,
                    landlineNumber: null,
                    officeHours: "8:00 AM - 5:00 PM",
                    role: user_entity_1.UserRole.COLLECTION_SUPERVISOR,
                    isActive: true,
                    agencyId: agency.id,
                    supervisorId: admin.id,
                });
                await this.userRepository.save(supervisor);
                users.push(supervisor);
                for (let a = 1; a <= 2; a++) {
                    const agent = this.userRepository.create({
                        firstName: `Agent${s}${a}`,
                        lastName: agency.cityMunicipality,
                        email: `agent${s}${a}.${agency.cityMunicipality.toLowerCase().replace(/\s/g, "")}@goodlife.com`,
                        password: hashedPassword,
                        phoneNumber: `+63-917-200-000${s}${a}`,
                        landlineNumber: null,
                        officeHours: "9:00 AM - 6:00 PM",
                        role: user_entity_1.UserRole.AGENT,
                        isActive: true,
                        agencyId: agency.id,
                        supervisorId: supervisor.id,
                    });
                    await this.userRepository.save(agent);
                    users.push(agent);
                }
            }
        }
        return users;
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