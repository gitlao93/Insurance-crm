import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { SeederService } from "../database/seeder.service"

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule)
    const seederService = app.get(SeederService)

    await seederService.seed()

    await app.close()
    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

bootstrap()
