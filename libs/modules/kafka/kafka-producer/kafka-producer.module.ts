import { Global, Module } from '@nestjs/common';
import { ConfigModule } from 'libs/modules/global/config/config.module';
import { KafkaProducerService } from './kafka-producer.service';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [KafkaProducerService]
})
export class KafkaProducerModule { }
