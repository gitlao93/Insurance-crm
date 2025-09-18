import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(agencyId?: number): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByRole(role: UserRole, agencyId?: number): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    deactivate(id: number): Promise<User>;
    activate(id: number): Promise<User>;
    remove(id: number): Promise<void>;
}
