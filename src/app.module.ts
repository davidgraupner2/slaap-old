import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { DbModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, DatabaseService],
})
export class AppModule {}
