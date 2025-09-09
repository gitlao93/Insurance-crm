import { Repository } from "typeorm";
import { Agency } from "../agencies/entities/agency.entity";
import { User } from "../users/entities/user.entity";
import { PolicyCategory } from "../policies/entities/policy-category.entity";
import { PolicyPlan } from "../policies/entities/policy-plan.entity";
export declare class SeederService {
    private agencyRepository;
    private userRepository;
    private categoryRepository;
    private planRepository;
    constructor(agencyRepository: Repository<Agency>, userRepository: Repository<User>, categoryRepository: Repository<PolicyCategory>, planRepository: Repository<PolicyPlan>);
    seed(): Promise<void>;
    private createAgencies;
    private createUsers;
    private createPolicies;
}
