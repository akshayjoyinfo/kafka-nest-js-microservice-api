/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { KafkaProducerModule } from 'libs/modules/kafka/kafka-producer/kafka-producer.module';
import { IKafkaProducerService } from '../../../../libs/modules/kafka/kafka-producer/kafka-producer.adapter';
import { KafkaProducerService } from '../../../../libs/modules/kafka/kafka-producer/kafka-producer.service';
import { StatisticsController } from './statistics.controller';

@Module({
    imports: [KafkaProducerModule],
    controllers: [StatisticsController]
})
export class StatisticsApiModule {}
