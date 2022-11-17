import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from './config/config.module';
import { DbModule } from './database/postgres/database.module';
import { DatabaseService } from './database/postgres/database.service';

@Module({
  imports: [
    AuthModule,
    DbModule,
    ConfigModule.register({ folder: './config' }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, DatabaseService],
  // exports: [DatabaseService],
})
export class AppModule {}
