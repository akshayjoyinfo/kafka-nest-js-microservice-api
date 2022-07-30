import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IConfigService } from '../../../libs/modules/global/config/config.adapter';
import { StatisticsMsModule } from './modules/statistics-ms.module';

async function bootstrap() {

  const app = await NestFactory.create(StatisticsMsModule);
  const configService= app.get(IConfigService);
  const PORT = configService.get('MS_PORT');
  const microserviceOptions = configService.getKafkaConfigMicroservice('event-latency');  
  const containerMicroserviceOptions = configService.getKafkaConfigMicroservice('container-latency');  
  const containerMicroserviceOptionssecpmd = configService.getKafkaConfigMicroservice('some-latency');  
  
  app.connectMicroservice(microserviceOptions);
  app.connectMicroservice(containerMicroserviceOptions);
  app.connectMicroservice(containerMicroserviceOptionssecpmd);
  
  await app.startAllMicroservices();

  await app.listen(PORT);
  console.log(
    `🌕 Microservice ready to receive KAFKA messages in PORT - ${PORT}\n Environment `,
  );

}
bootstrap();
