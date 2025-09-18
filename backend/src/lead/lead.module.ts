// src/leads/lead.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lead } from "./entities/lead.entity";
import { LeadService } from "./lead.service";
import { LeadController } from "./lead.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Lead])], // 👈 registers LeadRepository
  providers: [LeadService],
  controllers: [LeadController],
  exports: [LeadService],
})
export class LeadModule {}
