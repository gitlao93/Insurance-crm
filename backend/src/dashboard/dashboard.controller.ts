import { Controller, Get, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { User, UserRole } from "src/users/entities/user.entity";
import { Agency } from "src/agencies/entities/agency.entity";

@Controller("dashboard")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("stats")
  @Roles("admin", "agent", "collection_supervisor")
  async getDashboardStats() {
    // Note: In a real implementation, you would pass the authenticated user
    return this.dashboardService.getDashboardStats({
      id: 1,
      role: UserRole.ADMIN,
      agencyId: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      landlineNumber: "",
      officeHours: "",
      isActive: false,
      agency: new Agency(),
    });
  }

  @Get("clients")
  @Roles("admin", "agent")
  async getClients() {
    // Note: In a real implementation, you would pass the authenticated user
    return this.dashboardService.getClients({
      id: 1,
      role: UserRole.ADMIN,
      agencyId: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      landlineNumber: "",
      officeHours: "",
      isActive: false,
      agency: new Agency(),
    });
  }

  @Get("policy-holders")
  @Roles("admin", "agent", "collection_supervisor")
  async getPolicyHolders() {
    // Note: In a real implementation, you would pass the authenticated user
    return this.dashboardService.getPolicyHolders({
      id: 1,
      role: UserRole.ADMIN,
      agencyId: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      landlineNumber: "",
      officeHours: "",
      isActive: false,
      agency: new Agency(),
    });
  }

  @Get("collections")
  @Roles("admin", "collection_supervisor")
  async getCollections() {
    // Note: In a real implementation, you would pass the authenticated user
    return this.dashboardService.getCollections({
      id: 1,
      role: UserRole.ADMIN,
      agencyId: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      landlineNumber: "",
      officeHours: "",
      isActive: false,
      agency: new Agency(),
    });
  }
}
