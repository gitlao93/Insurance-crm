import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateAgencyDto {
  @IsString()
  @IsNotEmpty()
  agencyName: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  cityMunicipality: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  landLine: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
