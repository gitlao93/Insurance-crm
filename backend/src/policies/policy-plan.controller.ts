import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { PolicyPlanService } from "./policy-plan.service";
import { CreatePolicyPlanDto } from "./dto/create-policy-plan.dto";
import { UpdatePolicyPlanDto } from "./dto/update-policy-plan.dto";

@Controller("policy-plans")
export class PolicyPlanController {
  constructor(private readonly planService: PolicyPlanService) {}

  @Post()
  create(@Body() dto: CreatePolicyPlanDto) {
    return this.planService.create(dto);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.planService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePolicyPlanDto) {
    return this.planService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.planService.remove(+id);
  }
}
