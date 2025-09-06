import { Injectable, ForbiddenException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User, UserRole } from "../users/entities/user.entity";
import { Agency } from "../agencies/entities/agency.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>
  ) {}

  async getUserStats(agencyId?: number) {
    const whereClause = agencyId ? { agencyId } : {};

    // Total users
    const totalUsers = await this.userRepository.count({ where: whereClause });

    // Count by roles
    const collectionSupervisors = await this.userRepository.count({
      where: { ...whereClause, role: UserRole.COLLECTION_SUPERVISOR },
    });

    const agents = await this.userRepository.count({
      where: { ...whereClause, role: UserRole.AGENT },
    });

    const admins = await this.userRepository.count({
      where: { ...whereClause, role: UserRole.ADMIN },
    });

    return {
      totalUsers,
      collectionSupervisors,
      agents,
      admins,
    };
  }

  async getSupervisorsWithAgents(agencyId: number, user?: User) {
    let supervisors: User[];

    if (user?.role === UserRole.COLLECTION_SUPERVISOR) {
      // If supervisor, show only self
      supervisors = await this.userRepository.find({
        where: { id: user.id, isActive: true },
        relations: ["subordinates"],
      });
    } else {
      // Admin: fetch all active supervisors in agency
      supervisors = await this.userRepository.find({
        where: {
          agencyId,
          role: UserRole.COLLECTION_SUPERVISOR,
          isActive: true,
        },
        relations: ["subordinates"],
      });
    }

    return supervisors.map((sup) => ({
      id: sup.id,
      name: `${sup.firstName} ${sup.lastName}`,
      agentCount: sup.subordinates.length,
      agents: sup.subordinates.map((agent) => ({
        id: agent.id,
        name: `${agent.firstName} ${agent.lastName}`,
      })),
    }));
  }
}
