import { PartialType } from "@nestjs/mapped-types";
import { CreatePolicyCategoryDto } from "./create-policy.dto";

export class UpdatePolicyCategoryDto extends PartialType(
  CreatePolicyCategoryDto
) {}
