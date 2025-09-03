import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Agency } from "../agencies/entities/agency.entity";
import { User, UserRole } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async seed() {
    console.log("🌱 Starting database seeding...");

    // Delete in correct order (users first, then agencies)
    await this.userRepository.createQueryBuilder().delete().execute();
    await this.agencyRepository.createQueryBuilder().delete().execute();

    // Reset auto-increment counters
    await this.userRepository.query("ALTER TABLE users AUTO_INCREMENT = 1");
    await this.agencyRepository.query(
      "ALTER TABLE agencies AUTO_INCREMENT = 1"
    );

    // Seed agencies
    const agencies = await this.createAgencies();
    console.log(`✅ Created ${agencies.length} agencies`);

    // Seed users
    const users = await this.createUsers(agencies);
    console.log(`✅ Created ${users.length} users`);

    console.log("🎉 Database seeding completed successfully!");
  }

  private async createAgencies(): Promise<Agency[]> {
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

  private async createUsers(agencies: Agency[]): Promise<User[]> {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const userData = [
      // Metro Insurance Solutions Users
      {
        firstName: "John",
        lastName: "Admin",
        email: "john.admin@goodlifecdo.com",
        password: hashedPassword,
        phoneNumber: "+63-917-123-4567",
        landlineNumber: "(02) 8123-4567",
        officeHours: "8:00 AM - 5:00 PM",
        role: UserRole.ADMIN,
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
        role: UserRole.AGENT,
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
        role: UserRole.AGENT,
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
        role: UserRole.COLLECTION_SUPERVISOR,
        isActive: true,
        agencyId: agencies[0].id,
      },
    ];

    const users = this.userRepository.create(userData);
    return await this.userRepository.save(users);
  }
}
