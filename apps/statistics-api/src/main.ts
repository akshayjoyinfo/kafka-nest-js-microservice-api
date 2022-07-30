import { HttpStatus, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { url } from 'inspector';
import { bold } from 'colorette';
import { version } from 'prettier';
import { AppExceptionFilter } from '../../../libs/utils/filters/app-exception.filter';
import { StatisticsApiModule } from './modules/statistics-api.module';
import { DEFAULT_TAG, SWAGGER_API_ROOT } from 'libs/utils/documentation/constants';
import { IConfigService } from '../../../libs/modules/global/config/config.adapter';

async function bootstrap() {
  const app = await NestFactory.create(StatisticsApiModule,{
    bufferLogs: true,
    cors: true,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());

  // app.useGlobalInterceptors(
  //   new ExceptionInterceptor(),
  //   new HttpLoggerInterceptor(loggerService),
  //   new TracingInterceptor({ app: name, version }, loggerService),
  // );

  const configService= app.get(IConfigService);
  const PORT = configService.get('API_PORT');
  const ENV= configService.get('NODE_ENV');

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle('Statistics API')
    .setDescription('Statistics API')
    .setVersion('v1')
    .addTag(DEFAULT_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  console.log(`🟢 Statistics API listening at ${bold(PORT)} on ${bold(ENV?.toUpperCase())} 🟢\n`);

  await app.listen(PORT);

  const openApiURL = `/${SWAGGER_API_ROOT}`;

  console.log(`🔵 swagger listening at ${bold(openApiURL)}`);
}
bootstrap();
