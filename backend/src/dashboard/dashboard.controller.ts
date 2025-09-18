import { Controller, Get, Query, UseGuards, Req } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { User } from "src/users/entities/user.entity";
import { GetUser } from "src/auth/decorators/get-user.decorator";

@Controller("dashboard")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("user-stats")
  @Roles("admin")
  async getUserStats(@Req() req: any, @Query("agencyId") agencyId?: string) {
    // If admin passes agencyId, use it; otherwise use the logged-in user's agency
    const id = agencyId ? Number(agencyId) : req.user.agencyId;
    return this.dashboardService.getUserStats(id);
  }

  @Get("supervisors")
  @Roles("admin", "collection_supervisor")
  async getSupervisors(
    @GetUser() user: User,
    @Query("agencyId") agencyId?: number
  ) {
    const targetAgencyId = agencyId || user.agencyId;
    return this.dashboardService.getSupervisorsWithAgents(targetAgencyId, user);
  }
}
