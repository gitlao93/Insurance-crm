import { PolicyCategory } from "./policy-category.entity";
export declare class PolicyPlan {
    id: number;
    planName: string;
    monthlyRate: number;
    currency: string;
    coverageAmount: number;
    status: string;
    categoryId: number;
    category: PolicyCategory;
}
