import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport.strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { JwtStrategy } from './passport.strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
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
  providers: [AuthService, Logger, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
