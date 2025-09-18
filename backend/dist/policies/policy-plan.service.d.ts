import { Repository } from "typeorm";
import { PolicyPlan } from "./entities/policy-plan.entity";
import { CreatePolicyPlanDto } from "./dto/create-policy-plan.dto";
import { UpdatePolicyPlanDto } from "./dto/update-policy-plan.dto";
import { PolicyCategory } from "./entities/policy-category.entity";
export declare class PolicyPlanService {
    private planRepository;
    private categoryRepository;
    constructor(planRepository: Repository<PolicyPlan>, categoryRepository: Repository<PolicyCategory>);
    create(dto: CreatePolicyPlanDto): Promise<PolicyPlan>;
    findAll(): Promise<PolicyPlan[]>;
    findOne(id: number): Promise<PolicyPlan>;
    update(id: number, dto: UpdatePolicyPlanDto): Promise<PolicyPlan>;
    remove(id: number): Promise<void>;
}
