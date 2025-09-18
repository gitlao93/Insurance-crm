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

  private async createUsers(agencies: Agency[]): Promise<User[]> {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users: User[] = [];

    for (const agency of agencies) {
      // 1 Admin per agency
      const admin = this.userRepository.create({
        firstName: `Admin`,
        lastName: agency.cityMunicipality,
        email: `admin.${agency.cityMunicipality.toLowerCase().replace(/\s/g, "")}@goodlife.com`,
        password: hashedPassword,
        phoneNumber: "+63-917-000-0000",
        landlineNumber: "(02) 8000-0000",
        officeHours: "8:00 AM - 5:00 PM",
        role: UserRole.ADMIN,
        isActive: true,
        agencyId: agency.id,
      });
      await this.userRepository.save(admin);
      users.push(admin);

      // 2 Supervisors per agency
      for (let s = 1; s <= 2; s++) {
        const supervisor = this.userRepository.create({
          firstName: `Supervisor${s}`,
          lastName: agency.cityMunicipality,
          email: `supervisor${s}.${agency.cityMunicipality.toLowerCase().replace(/\s/g, "")}@goodlife.com`,
          password: hashedPassword,
          phoneNumber: `+63-917-100-000${s}`,
          landlineNumber: null,
          officeHours: "8:00 AM - 5:00 PM",
          role: UserRole.COLLECTION_SUPERVISOR,
          isActive: true,
          agencyId: agency.id,
          supervisorId: admin.id, // Admin is the supervisor of supervisors
        });
        await this.userRepository.save(supervisor);
        users.push(supervisor);

        // 2 Agents per supervisor
        for (let a = 1; a <= 2; a++) {
          const agent = this.userRepository.create({
            firstName: `Agent${s}${a}`,
            lastName: agency.cityMunicipality,
            email: `agent${s}${a}.${agency.cityMunicipality.toLowerCase().replace(/\s/g, "")}@goodlife.com`,
            password: hashedPassword,
            phoneNumber: `+63-917-200-000${s}${a}`,
            landlineNumber: null,
            officeHours: "9:00 AM - 6:00 PM",
            role: UserRole.AGENT,
            isActive: true,
            agencyId: agency.id,
            supervisorId: supervisor.id, // Agents report to their supervisor
          });
          await this.userRepository.save(agent);
          users.push(agent);
        }
      }
    }

    return users;
  }
}
