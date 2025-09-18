import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LeadService } from "./lead.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("leads")
@UseGuards(JwtAuthGuard)
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  async findAll(@Request() req) {
    const user = req.user; // now this will exist
    console.log("user: ", user);

    if (user.role === "agent") {
      return this.leadService.findByAgent(user.id);
    }
    return this.leadService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.leadService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(id, updateLeadDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.leadService.remove(id);
  }
}
