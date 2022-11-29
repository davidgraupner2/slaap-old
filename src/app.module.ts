import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DBModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { ConfigService } from './config/config.service';
import { SchemaModule } from './schema/schema.module';

// Make it easier to set the logging format for Winston below
const { combine, timestamp, prettyPrint, colorize, errors, json } = format;

@Module({
  imports: [
    AuthModule,
    ConfigModule.register({ folder: process.env.CONFIG_FOLDER || './config' }),
    DBModule,
    UsersModule,

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
          // Logging levels are set by the configuration file
          new transports.File({
            filename: 'logs/application.log',
            level: configService.get('LOGGING_LEVEL') || 'error',
          }),
        ],
      }),
      // Inject the ConfigService, so we can read the
      // required logging level from the config file
      inject: [ConfigService],
    }),

    SchemaModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
