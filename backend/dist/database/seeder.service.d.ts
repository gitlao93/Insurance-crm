import { Repository } from "typeorm";
import { Agency } from "../agencies/entities/agency.entity";
import { User } from "../users/entities/user.entity";
export declare class SeederService {
    private agencyRepository;
    private userRepository;
    constructor(agencyRepository: Repository<Agency>, userRepository: Repository<User>);
    seed(): Promise<void>;
    private createAgencies;
    private createUsers;
}
