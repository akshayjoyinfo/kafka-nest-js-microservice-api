import { NestFactory } from '@nestjs/core';
import { StatisticsApiModule } from './statistics-api.module';

async function bootstrap() {
  const app = await NestFactory.create(StatisticsApiModule);
  await app.listen(3000);
}
bootstrap();
