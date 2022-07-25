export abstract class IKafkaProducerService {
    
    abstract publish(message: any,topicName: string ): Promise<void>;
}
