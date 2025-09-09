import { PolicyCategoryService } from "./policy-category.service";
import { CreatePolicyCategoryDto } from "./dto/create-policy.dto";
import { UpdatePolicyCategoryDto } from "./dto/update-policy.dto";
export declare class PolicyCategoryController {
    private readonly categoryService;
    constructor(categoryService: PolicyCategoryService);
    create(dto: CreatePolicyCategoryDto): Promise<import("./entities/policy-category.entity").PolicyCategory>;
    findAll(): Promise<import("./entities/policy-category.entity").PolicyCategory[]>;
    findOne(id: string): Promise<import("./entities/policy-category.entity").PolicyCategory>;
    update(id: string, dto: UpdatePolicyCategoryDto): Promise<import("./entities/policy-category.entity").PolicyCategory>;
    remove(id: string): Promise<void>;
}
