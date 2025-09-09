import { PolicyPlan } from "./policy-plan.entity";
export declare class PolicyCategory {
    id: number;
    categoryName: string;
    description: string;
    plans: PolicyPlan[];
}
