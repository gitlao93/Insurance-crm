"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const agencies_module_1 = require("./agencies/agencies.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const user_entity_1 = require("./users/entities/user.entity");
const agency_entity_1 = require("./agencies/entities/agency.entity");
const seeder_module_1 = require("./database/seeder.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                database: "goodlife_insurance_db",
                entities: [user_entity_1.User, agency_entity_1.Agency],
                synchronize: true,
                logging: true,
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: "your-secret-key",
                signOptions: { expiresIn: "24h" },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            agencies_module_1.AgenciesModule,
            dashboard_module_1.DashboardModule,
            seeder_module_1.SeederModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map