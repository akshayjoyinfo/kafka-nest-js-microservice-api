import { StatisticsMsController } from './statistics-ms.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from '../../../../libs/modules/global/config/config.service';
import { IConfigService } from '../../../../libs/modules/global/config/config.adapter';

@Module({
  imports: [ConfigModule],
  controllers: [StatisticsMsController],
  providers: [{
    provide: IConfigService,
    useClass: ConfigurationService
  }]
})
export class StatisticsMsModule {}
