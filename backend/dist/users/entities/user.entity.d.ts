import { Agency } from "../../agencies/entities/agency.entity";
export declare enum UserRole {
    ADMIN = "admin",
    AGENT = "agent",
    COLLECTION_SUPERVISOR = "collection_supervisor",
    SUPER_ADMIN = "super_admin"
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
    supervisor: User | null;
    supervisorId: number | null;
    subordinates: User[];
}
