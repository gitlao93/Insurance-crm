import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { LeadStatus } from "../entities/lead.entity";
import { Type } from "class-transformer";

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus = LeadStatus.NEW;

  @Type(() => Number)
  @IsNumber()
  agentId: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  policyPlanId?: number;
}
