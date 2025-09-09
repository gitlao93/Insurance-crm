import { Repository } from "typeorm";
import { PolicyCategory } from "./entities/policy-category.entity";
import { CreatePolicyCategoryDto } from "./dto/create-policy.dto";
import { UpdatePolicyCategoryDto } from "./dto/update-policy.dto";
export declare class PolicyCategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<PolicyCategory>);
    create(dto: CreatePolicyCategoryDto): Promise<PolicyCategory>;
    findAll(): Promise<PolicyCategory[]>;
    findOne(id: number): Promise<PolicyCategory>;
    update(id: number, dto: UpdatePolicyCategoryDto): Promise<PolicyCategory>;
    remove(id: number): Promise<void>;
}
