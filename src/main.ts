import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { microserviceOptions } from './config/microservice.config';


async function bootstrap() {
  /* const app = await NestFactory.create(AppModule);
  await app.listen(3000); */
  const logger = new Logger('UserManagementMicroservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions,
  );
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listen(() => {
    logger.debug(`UMS is listening on port ${microserviceOptions.options['url']}`);
  });
}
bootstrap();
