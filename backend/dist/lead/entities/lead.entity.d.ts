import { User } from "../../users/entities/user.entity";
import { PolicyPlan } from "../../policies/entities/policy-plan.entity";
export declare enum LeadStatus {
    NEW = "New",
    IN_PROGRESS = "In-Progress",
    CONVERTED = "Converted",
    DROPPED = "Dropped"
}
export declare class Lead {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    status: LeadStatus;
    note?: string;
    agentId: number;
    agent: User;
    policyPlanId: number;
    policyPlan: PolicyPlan;
    createdAt: Date;
    updatedAt: Date;
}
