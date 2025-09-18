import { LeadService } from "./lead.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
export declare class LeadController {
    private readonly leadService;
    constructor(leadService: LeadService);
    create(createLeadDto: CreateLeadDto): Promise<import("./entities/lead.entity").Lead>;
    findAll(req: any): Promise<import("./entities/lead.entity").Lead[]>;
    findOne(id: number): Promise<import("./entities/lead.entity").Lead>;
    update(id: number, updateLeadDto: UpdateLeadDto): Promise<import("./entities/lead.entity").Lead>;
    remove(id: number): Promise<void>;
}
