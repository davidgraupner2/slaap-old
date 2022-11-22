import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTAuthGuard } from './auth.guards';
import { APP_GUARD } from '@nestjs/core';

// In the below module we are registering the JWTAuthGuard
// as a global APP Guard provider to ensure all API Endpoints are protected
// except those that are explicitely made public
@Module({
  imports: [JwtModule.register({}), PassportModule],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
    { provide: APP_GUARD, useClass: JWTAuthGuard },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
