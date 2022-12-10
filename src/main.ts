import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import 'winston-daily-rotate-file';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  /* Create an instance of the main app module*/
  const app = await NestFactory.create(AppModule);

  // Replace the default NestJS Logger with Winston
  /*
    The following Logging levels should be adhered to: https://reflectoring.io/node-logging-winston/
    0 - error: 
      is a serious problem or failure, that halts current activity but leaves the application in a recoverable state with no effect on other operations. The application can continue working.
    1 - warn: 
      A non-blocking warning about an unusual system exception. These logs provide context for a possible error. It logs warning signs that should be investigated.
    2 - Info: 
      This denotes major events and informative messages about the application’s current state. Useful For tracking the flow of the application.
    3 - http: 
      This logs out HTTP request-related messages. HTTP transactions ranging from the host, path, response, requests, etc.
    4 - verbose: 
      Records detailed messages that may contain sensitive information.
    5 - debug: 
      Developers and internal teams should be the only ones to see these log messages. They should be disabled in production environments. These logs will help us debug our code.
    6 - silly: 
      The current stack trace of the calling function should be printed out when silly messages are called. This information can be used to help developers and internal teams debug problems.
  */

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

  // Enable API URI Versioning and set the default version
  // - for everything to version 1 unless otherwise specified
  // see: https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Add Swagger Support for v1
  const swaggerConfig = new DocumentBuilder().setTitle('SLAAP').setDescription('Streamline Partners - Advanced Application Platform').setVersion('1.0').addTag('slaap').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Set a global prefix for all routes
  app.setGlobalPrefix('api');

  // To change Config Folder location: set the 'CONFIG_FOLDER' environment variable to a different environment name such as '/config'
  const config = app.get(ConfigService);

  // Start the server listening on the configured port (Default = 3000 if not configured)
  await app.listen(config.get('LISTENING_PORT') || 3000);
}
bootstrap();
