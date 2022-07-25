import { Module } from '@nestjs/common';
import { StatisticsApiController } from './statistics-api.controller';
import { StatisticsApiService } from './statistics-api.service';

@Module({
  imports: [],
  controllers: [StatisticsApiController],
  providers: [StatisticsApiService],
})
export class StatisticsApiModule {}
