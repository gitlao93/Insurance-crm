import { User } from "../../users/entities/user.entity";
export declare class Agency {
    id: number;
    agencyName: string;
    street: string;
    cityMunicipality: string;
    postalCode: string;
    email: string;
    phoneNumber: string;
    landLine: string;
    isActive: boolean;
    users: User[];
}
