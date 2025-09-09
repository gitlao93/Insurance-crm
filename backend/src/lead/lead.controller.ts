import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { LeadService } from "./lead.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@Controller("leads")
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.leadService.create(dto);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.leadService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateLeadDto) {
    return this.leadService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.leadService.remove(+id);
  }
}
