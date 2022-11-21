import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [],
  providers: [AuthService, UsersService, JwtStrategy, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
