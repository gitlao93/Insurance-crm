import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeederService } from "./seeder.service";
import { Agency } from "../agencies/entities/agency.entity";
import { User } from "../users/entities/user.entity";
import { PolicyCategory } from "src/policies/entities/policy-category.entity";
import { PolicyPlan } from "src/policies/entities/policy-plan.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Agency, User, PolicyCategory, PolicyPlan]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
