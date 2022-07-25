import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsApiController } from './statistics-api.controller';
import { StatisticsApiService } from './statistics-api.service';

describe('StatisticsApiController', () => {
  let statisticsApiController: StatisticsApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsApiController],
      providers: [StatisticsApiService],
    }).compile();

    statisticsApiController = app.get<StatisticsApiController>(StatisticsApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(statisticsApiController.getHello()).toBe('Hello World!');
    });
  });
});
