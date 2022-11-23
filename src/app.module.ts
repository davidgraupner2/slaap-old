import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DBModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston/lib/winston/config';
import { transports, format } from 'winston';
import { ConfigService } from './config/config.service';
import { json } from 'stream/consumers';

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
      useFactory: () => ({
        exitOnError: false,
        defaultMeta: { service: 'user-service' },
        transports: [
          new transports.Console({
            level: 'error',
            // format: format.combine(
            //   format.colorize({ all: true }),
            //   format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss.SSS A' }),
            //   format.align(),
            //   format.json(),
            // ),
          }),
          new transports.File({
            filename: 'logs/application.log',
            level: 'info',
            format: format.combine(
              format.colorize({ all: true }),
              format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss.SSS A' }),
              format.align(),
              format.json(),
            ),
          }),
          new transports.File({
            filename: 'logs/debug.log',
            level: 'debug',
          }),
        ],
      }),
      inject: [ConfigService],

      //

      // level: 'debug',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
