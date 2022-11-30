import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  /* Create an instance of the main app module*/
  const app = await NestFactory.create(AppModule);

  // Replace the default NestJS Logger with Winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

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

  // To change Config Folder location: set the 'CONFIG_FOLDER' environment variable to a different environment name such as '/config'
  const config = app.get(ConfigService);

  // Start the server listening on the configured port (Default = 3000 if not configured)
  await app.listen(config.get('LISTENING_PORT') || 3000);
}
bootstrap();
