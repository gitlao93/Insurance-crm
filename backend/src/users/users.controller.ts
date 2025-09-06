import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Note: In a real implementation, you would inject the request to check user permissions
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles("admin", "collection_supervisor")
  async findAll(@Query("agencyId") agencyId?: string) {
    const agencyIdNumber = agencyId ? +agencyId : undefined;
    return this.usersService.findAll(agencyIdNumber);
  }

  @Get(":id")
  @Roles("admin", "agent", "collection_supervisor")
  async findOne(@Param("id") id: string) {
    const userId = +id;
    // Note: In a real implementation, you would check user permissions here
    return this.usersService.findOne(userId);
  }

  @Patch(":id")
  @Roles("admin")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = +id;
    return this.usersService.update(userId, updateUserDto);
  }

  @Patch(":id/deactivate")
  @Roles("admin")
  async deactivate(@Param("id") id: string) {
    const userId = +id;
    return this.usersService.deactivate(userId);
  }

  @Patch(":id/activate")
  @Roles("admin")
  async activate(@Param("id") id: string) {
    const userId = +id;
    return this.usersService.activate(userId);
  }

  @Delete(":id")
  @Roles("admin")
  async remove(@Param("id") id: string) {
    const userId = +id;
    // Note: In a real implementation, you would check user permissions here
    return this.usersService.remove(userId);
  }
}
