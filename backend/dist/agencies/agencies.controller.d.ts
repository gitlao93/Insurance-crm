import { AgenciesService } from "./agencies.service";
import { CreateAgencyDto } from "./dto/create-agency.dto";
import { UpdateAgencyDto } from "./dto/update-agency.dto";
export declare class AgenciesController {
    private readonly agenciesService;
    constructor(agenciesService: AgenciesService);
    create(createAgencyDto: CreateAgencyDto): Promise<import("./entities/agency.entity").Agency>;
    findAll(): Promise<import("./entities/agency.entity").Agency[]>;
    findOne(id: string): Promise<import("./entities/agency.entity").Agency>;
    update(id: string, updateAgencyDto: UpdateAgencyDto): Promise<import("./entities/agency.entity").Agency>;
    remove(id: string): Promise<void>;
}
