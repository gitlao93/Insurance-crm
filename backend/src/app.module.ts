import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AgenciesModule } from "./agencies/agencies.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { User } from "./users/entities/user.entity";
import { Agency } from "./agencies/entities/agency.entity";
import { SeederModule } from "./database/seeder.module";
import { PolicyCategory } from "./policies/entities/policy-category.entity";
import { PolicyPlan } from "./policies/entities/policy-plan.entity";
import { PoliciesModule } from "./policies/policy.module";
import { LeadModule } from "./lead/lead.module";
import { Lead } from "./lead/entities/lead.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      database: "goodlife_insurance_db",
      entities: [User, Agency, PolicyCategory, PolicyPlan, Lead],
      synchronize: true, // ⚠️ disable in prod
      logging: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "24h" },
    }),
    AuthModule,
    UsersModule,
    AgenciesModule,
    DashboardModule,
    SeederModule,
    PoliciesModule,
    LeadModule, // 👈 provides LeadService
  ],
})
export class AppModule {}
