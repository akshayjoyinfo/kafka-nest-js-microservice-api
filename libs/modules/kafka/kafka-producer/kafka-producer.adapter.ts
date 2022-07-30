export abstract class IKafkaProducerService {
    
    abstract publish(message: any,topicName: string , partitionKey:string): Promise<void>;
}
