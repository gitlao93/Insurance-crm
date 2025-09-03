import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SeederService } from "./seeder.service"
import { Agency } from "../agencies/entities/agency.entity"
import { User } from "../users/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Agency, User])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
