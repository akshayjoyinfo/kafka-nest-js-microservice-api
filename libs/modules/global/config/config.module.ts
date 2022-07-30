import { Global, Module } from '@nestjs/common';
import { IConfigService } from './config.adapter';
import { ConfigurationService } from './config.service';
@Global()
@Module({
    providers: [
        {
          provide: IConfigService,
          useClass: ConfigurationService,
        },
      ],
      exports: [IConfigService],
})
export class ConfigModule {}
