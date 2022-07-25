import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
