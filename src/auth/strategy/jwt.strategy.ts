import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { AuthService } from '../auth.service';
import { CREDENTIALS_INCORRECT } from '../constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth.guards';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // This strategy first verifies the JWT Token and its signature and decodes the token
  // Then it invokes the validate function below passing in the decoded token
  async validate(payload: any) {
    // Return
    return { userId: payload.sub, email: payload.email };
  }
}
