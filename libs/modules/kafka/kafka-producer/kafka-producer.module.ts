import { Global, Module } from '@nestjs/common';
import { ConfigModule } from 'libs/modules/global/config/config.module';
import { IConfigService } from '../../global/config/config.adapter';
import { IKafkaProducerService } from './kafka-producer.adapter';
import { KafkaProducerService } from './kafka-producer.service';


@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: IKafkaProducerService,
            useFactory: (config: IConfigService) => new KafkaProducerService(config),
            inject: [IConfigService],
          }],
    exports: [ IKafkaProducerService]
})
export class KafkaProducerModule { }
