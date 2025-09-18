"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePolicyPlanDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_policy_plan_dto_1 = require("./create-policy-plan.dto");
class UpdatePolicyPlanDto extends (0, mapped_types_1.PartialType)(create_policy_plan_dto_1.CreatePolicyPlanDto) {
}
exports.UpdatePolicyPlanDto = UpdatePolicyPlanDto;
//# sourceMappingURL=update-policy-plan.dto.js.map