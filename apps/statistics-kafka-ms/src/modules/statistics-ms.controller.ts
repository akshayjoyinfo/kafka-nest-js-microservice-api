/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ParseMessagePipe } from '../common/parse-message.pipe';

@Controller()
export class StatisticsMsController {
  @MessagePattern('event-latency')
  getHello(@Payload() message): void {
    console.log(`${JSON.stringify(message)},`); 
  }

  @MessagePattern('container-latency')
  getContainerLatency(@Payload() message): void {
    console.log(`${JSON.stringify(message)},`); 
  }

  @MessagePattern('some-latency')
  getSomeLatency(@Payload() message): void {
    console.log(`${JSON.stringify(message)},`); 
  }
}
