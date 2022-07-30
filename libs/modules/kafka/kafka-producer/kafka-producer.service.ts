import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { IConfigService } from 'libs/modules/global/config/config.adapter';
import { ConfigurationService } from 'libs/modules/global/config/config.service';
import { IKafkaProducerService } from './kafka-producer.adapter';
import {Md5} from 'ts-md5/dist/md5';


@Injectable()
export class KafkaProducerService implements IKafkaProducerService {
    private kafkaInstance: Kafka;
    private producer: Producer;

    constructor(private configService: IConfigService) {
    }

    async publish(message: any, topicName: string, partitionKey:string): Promise<void> {
        const kafkaConfig = this.configService.getKafkaConfig(topicName);
        
        this.kafkaInstance = new Kafka(kafkaConfig)
        this.producer = this.kafkaInstance.producer();
        
        const hash = Md5.hashAsciiStr(partitionKey);
        
        console.log(hash)

        await this.producer.connect();
        await this.producer.send({
            topic: topicName,
            messages: [{ value: JSON.stringify(message), key: hash  }],
        });
    }

}
