import { Repository } from "typeorm";
import { Lead } from "./entities/lead.entity";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
export declare class LeadService {
    private leadRepository;
    constructor(leadRepository: Repository<Lead>);
    create(dto: CreateLeadDto): Promise<Lead>;
    findAll(): Promise<Lead[]>;
    findOne(id: number): Promise<Lead>;
    update(id: number, dto: UpdateLeadDto): Promise<Lead>;
    remove(id: number): Promise<void>;
}
