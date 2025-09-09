import { PolicyPlanService } from "./policy-plan.service";
import { CreatePolicyPlanDto } from "./dto/create-policy-plan.dto";
import { UpdatePolicyPlanDto } from "./dto/update-policy-plan.dto";
export declare class PolicyPlanController {
    private readonly planService;
    constructor(planService: PolicyPlanService);
    create(dto: CreatePolicyPlanDto): Promise<import("./entities/policy-plan.entity").PolicyPlan>;
    findAll(): Promise<import("./entities/policy-plan.entity").PolicyPlan[]>;
    findOne(id: string): Promise<import("./entities/policy-plan.entity").PolicyPlan>;
    update(id: string, dto: UpdatePolicyPlanDto): Promise<import("./entities/policy-plan.entity").PolicyPlan>;
    remove(id: string): Promise<void>;
}
