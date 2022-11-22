import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

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

  // Get an instance of the ConfigService (Reads configuration from a .env file)
  // Note: By default the config file will be "./config/development.env"
  //
  // To change Config FileName: set the 'NODE_ENV' environment variable to a different environment name such as 'production'
  // -- Config file will then be: "./config/production.env"
  //
  // To change Config Folder location: set the 'CONFIG_FOLDER' environment variable to a different environment name such as '/config'
  const config = app.get(ConfigService);

  // Start the server listening on the configured port (Default = 3000 if not configured)
  await app.listen(config.get('LISTENING_PORT') || 3000);
}
bootstrap();
