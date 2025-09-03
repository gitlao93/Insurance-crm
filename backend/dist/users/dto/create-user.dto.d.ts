import { UserRole } from "../entities/user.entity";
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    landlineNumber?: string;
    officeHours?: string;
    role?: UserRole;
    agencyId: number;
}
