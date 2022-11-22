import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  // This strategy first verifies the JWT Token and its signature and decodes the token
  // Then it invokes the validate function below passing in the decoded token
  validate(req: Request, payload: any) {
    // Extract the refresh token from the Authorization Header
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    // Attach the Refres Token to the user object which the stragegy will place into the request object
    return { ...payload, refreshToken };
  }
}
