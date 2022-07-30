/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { IKafkaProducerService } from 'libs/modules/kafka/kafka-producer/kafka-producer.adapter';
import { retry } from 'rxjs';

@Controller()
export class StatisticsController {
    constructor(private readonly kafkaService: IKafkaProducerService){

    }
  @Get()
  getHello(): string {
    return 'Hi';
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Publish Statistics to KAFKA',
  })
  async ingestCustomerOrder(@Body() anyMessage: Welcome) {
    console.log(
        anyMessage
    );
    anyMessage.timestamp = new Date();
    
    await this.kafkaService.publish(anyMessage, 'event-latency',anyMessage.id.toString());
    return 'Published';
  }

  @Post('container')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Publish Container Statistics to KAFKA',
  })
  async ingestContainerLatency(@Body() anyMessage: WelcomeContainer) {
    console.log(
        anyMessage
    );
    
    anyMessage.timestamp = new Date();
    await this.kafkaService.publish(anyMessage, 'container-latency', anyMessage.id.toString());
    return 'Published container-latency';
  }

  @Post('some')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Publish Container Statistics to KAFKA',
  })
  async ingestSomeLatency(@Body() anyMessage: WelcomeContainer) {
    console.log(
        anyMessage
    );
    
    anyMessage.timestamp = new Date();
    await this.kafkaService.publish(anyMessage, 'some-latency', anyMessage.id.toString());
    return 'Published container-latency';
  }
}


export interface Welcome {
    userId:    number;
    id:        number;
    title:     string;
    completed: boolean;
    timestamp:  Date
}

export interface WelcomeContainer {
  id:        number;
  title:     string;
  timestamp:  Date
}