import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsString } from "class-validator";

// make password optional in update
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["password"] as const)
) {
  @IsString()
  @IsOptional()
  password?: string;
}
