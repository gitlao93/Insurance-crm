import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DashboardController } from "./dashboard.controller"
import { DashboardService } from "./dashboard.service"
import { User } from "../users/entities/user.entity"
import { Agency } from "../agencies/entities/agency.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User, Agency])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
