import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PolicyCategory } from "./entities/policy-category.entity";
import { CreatePolicyCategoryDto } from "./dto/create-policy.dto";
import { UpdatePolicyCategoryDto } from "./dto/update-policy.dto";

@Injectable()
export class PolicyCategoryService {
  constructor(
    @InjectRepository(PolicyCategory)
    private categoryRepository: Repository<PolicyCategory>
  ) {}

  async create(dto: CreatePolicyCategoryDto): Promise<PolicyCategory> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<PolicyCategory[]> {
    return this.categoryRepository.find({ relations: ["plans"] });
  }

  async findOne(id: number): Promise<PolicyCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ["plans"],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    dto: UpdatePolicyCategoryDto
  ): Promise<PolicyCategory> {
    await this.categoryRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
