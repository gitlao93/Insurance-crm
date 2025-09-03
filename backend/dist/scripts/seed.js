"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const seeder_service_1 = require("../database/seeder.service");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const seederService = app.get(seeder_service_1.SeederService);
        await seederService.seed();
        await app.close();
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map