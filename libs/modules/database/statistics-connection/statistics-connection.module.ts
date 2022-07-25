import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IConfigService } from 'libs/modules/global/config/config.adapter';
import { ConfigModule } from 'libs/modules/global/config/config.module';
import { ConfigurationService } from 'libs/modules/global/config/config.service';

@Global()
@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            name: 'statistics',
            imports: [ConfigModule],
            useFactory: (configService: IConfigService) =>
              configService.getConfigDb,
            inject: [IConfigService],
          }),
    ]
})
export class StatisticsConnectionModule {}
