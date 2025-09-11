import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LeadStatus } from "../entities/lead.entity";

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEnum(LeadStatus)
  status: LeadStatus;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  agentId: number;

  @IsNotEmpty()
  policyPlanId: number;
}
