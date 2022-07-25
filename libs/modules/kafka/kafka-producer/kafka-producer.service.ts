import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { IConfigService } from 'libs/modules/global/config/config.adapter';
import { ConfigurationService } from 'libs/modules/global/config/config.service';
import { IKafkaProducerService } from './kafka-producer.adapter';

@Injectable()
export class KafkaProducerService implements IKafkaProducerService {
    private kafkaInstance: Kafka;
    private configService: IConfigService
    private producer: Producer;

    constructor() {
    }

    async publish(message: any, topicName: string): Promise<void> {

        this.kafkaInstance = new Kafka(this.configService.getKafkaConfig(topicName))
        this.producer = this.kafkaInstance.producer();

        await this.producer.connect();
        await this.producer.send({
            topic: topicName,
            messages: [{ value: JSON.stringify(message) }],
        });
    }

}
