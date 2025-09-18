import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PolicyCategory } from "./entities/policy-category.entity";
import { PolicyPlan } from "./entities/policy-plan.entity";

import { PolicyPlanController } from "./policy-plan.controller";
import { PolicyCategoryService } from "./policy-category.service";
import { PolicyPlanService } from "./policy-plan.service";
import { PolicyCategoryController } from "./policy-category.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PolicyCategory, PolicyPlan])],
  providers: [PolicyCategoryService, PolicyPlanService],
  controllers: [PolicyCategoryController, PolicyPlanController],
  exports: [PolicyCategoryService, PolicyPlanService],
})
export class PoliciesModule {}
