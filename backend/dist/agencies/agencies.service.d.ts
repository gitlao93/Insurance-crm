import { Repository } from "typeorm";
import { Agency } from "./entities/agency.entity";
import { CreateAgencyDto } from "./dto/create-agency.dto";
import { UpdateAgencyDto } from "./dto/update-agency.dto";
export declare class AgenciesService {
    private readonly agencyRepository;
    constructor(agencyRepository: Repository<Agency>);
    create(createAgencyDto: CreateAgencyDto): Promise<Agency>;
    findAll(): Promise<Agency[]>;
    findOne(id: number): Promise<Agency>;
    update(id: number, updateAgencyDto: UpdateAgencyDto): Promise<Agency>;
    remove(id: number): Promise<void>;
}
