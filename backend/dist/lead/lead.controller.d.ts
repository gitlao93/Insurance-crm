import { LeadService } from "./lead.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
export declare class LeadController {
    private readonly leadService;
    constructor(leadService: LeadService);
    create(dto: CreateLeadDto): Promise<import("./entities/lead.entity").Lead>;
    findAll(): Promise<import("./entities/lead.entity").Lead[]>;
    findOne(id: string): Promise<import("./entities/lead.entity").Lead>;
    update(id: string, dto: UpdateLeadDto): Promise<import("./entities/lead.entity").Lead>;
    remove(id: string): Promise<void>;
}
