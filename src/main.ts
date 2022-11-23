import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  // Firstly create an instance of the Winston Logger

  /* Create an instance of the main app module*/
  const app = await NestFactory.create(AppModule);

  // Replace the default NestJS Logger with Winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  //, {
  // logger: WinstonModule.createLogger({
  //   level: 'debug',
  //   exitOnError: false,
  //   transports: [
  //     new transports.Console({
  //       level: 'error',
  //       format: format.simple(),
  //     }),
  //     new transports.File({
  //       filename: 'logs/application.log',
  //       level: 'info',
  //     }),
  //     new transports.File({
  //       filename: 'logs/debug.log',
  //       level: 'debug',
  //     }),
  //   ],
  // }),
  //});

  //Set Winston as the default Nest Logger
  // - Rather than the default logger
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

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
