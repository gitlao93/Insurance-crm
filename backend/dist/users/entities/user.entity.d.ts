import { Agency } from "../../agencies/entities/agency.entity";
export declare enum UserRole {
    ADMIN = "admin",
    AGENT = "agent",
    COLLECTION_SUPERVISOR = "collection_supervisor"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    landlineNumber: string | null;
    officeHours: string | null;
    role: UserRole;
    isActive: boolean;
    agency: Agency;
    agencyId: number;
}
