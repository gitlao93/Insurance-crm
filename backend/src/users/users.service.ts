import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists

    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findAll(agencyId?: number): Promise<User[]> {
    const whereCondition: any = { isActive: true };
    if (agencyId) {
      whereCondition.agencyId = agencyId;
    }

    return await this.userRepository.find({
      where: whereCondition,
      relations: ["agency"],
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ["agency"],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email, isActive: true },
      relations: ["agency"],
    });
  }

  async findByRole(role: UserRole, agencyId?: number): Promise<User[]> {
    const whereCondition: any = { role, isActive: true };
    if (agencyId) {
      whereCondition.agencyId = agencyId;
    }

    return await this.userRepository.find({
      where: whereCondition,
      relations: ["agency"],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Handle password hashing only if a new password is provided
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds
      );
    }

    // Merge changes into the entity
    Object.assign(user, updateUserDto);

    // Save updated entity (this runs validations, subscribers, hooks, etc.)
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.update(id, { isActive: false });
  }
}
