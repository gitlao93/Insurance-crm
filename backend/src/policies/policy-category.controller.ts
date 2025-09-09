import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { PolicyCategoryService } from "./policy-category.service";
import { CreatePolicyCategoryDto } from "./dto/create-policy.dto";
import { UpdatePolicyCategoryDto } from "./dto/update-policy.dto";

@Controller("policy-categories")
export class PolicyCategoryController {
  constructor(private readonly categoryService: PolicyCategoryService) {}

  @Post()
  create(@Body() dto: CreatePolicyCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePolicyCategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
