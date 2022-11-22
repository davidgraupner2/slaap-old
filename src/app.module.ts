import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DBModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston/lib/winston/config';
import { transports } from 'winston';

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

    WinstonModule.forRoot({
      //
      level: 'debug',
      exitOnError: false,
      transports: [new transports.File({ filename: 'logs/application.log' })],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
