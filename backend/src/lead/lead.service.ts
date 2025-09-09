import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lead } from "./entities/lead.entity";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>
  ) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadRepository.create(dto);
    return this.leadRepository.save(lead);
  }

  async findAll(): Promise<Lead[]> {
    return this.leadRepository.find({
      relations: ["agent", "policyPlan"],
    });
  }

  async findOne(id: number): Promise<Lead> {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ["agent", "policyPlan"],
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async update(id: number, dto: UpdateLeadDto): Promise<Lead> {
    await this.leadRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.leadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
  }
}
