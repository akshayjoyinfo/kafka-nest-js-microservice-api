import { Controller, Get } from '@nestjs/common';
import { StatisticsApiService } from './statistics-api.service';

@Controller()
export class StatisticsApiController {
  constructor(private readonly statisticsApiService: StatisticsApiService) {}

  @Get()
  getHello(): string {
    return this.statisticsApiService.getHello();
  }
}
