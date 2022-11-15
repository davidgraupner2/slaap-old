import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { validate } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  /* Create an instance of the main app module*/
  const app = await NestFactory.create(AppModule);

  /* Add global pipe validation
  - Data Transfer Objects will be automatically validated by the system*/
  app.useGlobalPipes(
    new ValidationPipe({
      // Remove fields not required as part of the DTO
      whitelist: true,

      // Enable debug messages for now
      enableDebugMessages: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
