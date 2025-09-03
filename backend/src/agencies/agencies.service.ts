import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Agency } from "./entities/agency.entity";
import { CreateAgencyDto } from "./dto/create-agency.dto";
import { UpdateAgencyDto } from "./dto/update-agency.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>
  ) {}
  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    const agency = this.agencyRepository.create(createAgencyDto);
    return await this.agencyRepository.save(agency);
  }

  async findAll(): Promise<Agency[]> {
    return await this.agencyRepository.find({
      where: { isActive: true },
      relations: ["users"],
    });
  }

  async findOne(id: number): Promise<Agency> {
    return await this.agencyRepository.findOne({
      where: { id, isActive: true },
      relations: ["users"],
    });
  }

  async update(id: number, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    await this.agencyRepository.update(id, updateAgencyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.agencyRepository.update(id, { isActive: false });
  }
}
