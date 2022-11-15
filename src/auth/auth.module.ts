import { Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { DbModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DbModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
