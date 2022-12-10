import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IdTokenService } from './id.token.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { JwtStrategy, LocalStrategy, JwtRefreshStrategy } from './passport.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './passport.guards';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      // Inject the ConfigService, so we can read the
      // JWT Configuration Options
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    IdTokenService,
    UsersService,
    Logger,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    TenantService,
    // Register the JWTAuthGuard as a global guard
    // i.e. All routes require JWT Authentication unless marked as public
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
