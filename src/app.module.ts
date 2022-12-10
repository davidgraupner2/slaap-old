import {
  Module,
  Logger,
  MiddlewareConsumer,
  NestModule,
  Scope,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { NestLikeConsoleFormatOptions, WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalLoggingInterceptor } from './interceptors/global.logging.interceptor';
import { GlobalHttpExceptionFilter } from './filters/global.httpexception.filter';
import { TenantModule } from './tenant/tenant.module';

// Make it easier to set the logging format for Winston below
const { combine, timestamp, prettyPrint, colorize, errors, json } = format;

@Module({
  imports: [
    ConfigModule.register({ folder: process.env.CONFIG_FOLDER || './config' }),

    //////////////////////////////////////
    // Configure system wide logging here
    //////////////////////////////////////
    //
    // Logging uses:
    // winston - https://github.com/winstonjs/  (Logging Provider)
    // nest-winston - https://www.npmjs.com/package/nest-winston (Integrates Winston into nestjs)
    //
    // Logging Levels: https://github.com/winstonjs/winston#logging-levels
    // Custom Transports: https://github.com/winstonjs/winston#adding-custom-transports

    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        exitOnError: false,
        format: combine(errors({ stack: true }), timestamp(), json()),
        transports: [
          // Errors will always log to the console
          new transports.Console({
            level: 'error',
          }),
          // We are using the daily file rotation transport
          // - See: https://www.npmjs.com/package/winston-daily-rotate-file
          new transports.DailyRotateFile({
            dirname: configService.get('LOGGING_DIRECTORY'),
            filename: configService.get('LOGGING_PLATFORM'),
            datePattern: configService.get('LOGGING_PLATFORM_DATE_FORMAT'),
            maxFiles: configService.get('LOGGING_MAX_FILES'),
            level: configService.get('LOGGING_LEVEL') || 'error',
            zippedArchive:
              configService.get('LOGGING_LEVEL') === 'true' || false,
          }),
        ],
      }),
      // Inject the ConfigService, so we can read the
      // required logging level from the config file
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    // Add a global interceptor for logging purposes
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggingInterceptor,
      scope: Scope.REQUEST,
    },
    // Add a global exception filter to enrich exceptions
    {
      provide: APP_FILTER,
      useClass: GlobalHttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    /*
      Register additional middleware using:
    */
    // consumer.apply(HTTPLogger).forRoutes('*');
  }
}
