import { LeadStatus } from "../entities/lead.entity";
export declare class CreateLeadDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    status: LeadStatus;
    note?: string;
    agentId: number;
    policyPlanId: number;
}
