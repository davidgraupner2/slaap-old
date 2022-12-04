import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  // This strategy first verifies the JWT Token and its signature and decodes the token
  // Then it invokes the validate function below passing in the decoded token
  async validate(req: Request, payload: any) {
    // Get access to the current refresh token by the JTI (Refresh Token Id)
    // This is stored against the user record

    const refresh_token = await this.usersService.getRefreshToken(
      payload.sub,
      payload.jti,
    );

    // If the token is not revoked - continue
    if (refresh_token && refresh_token.revoked === false) {
      // Passport.js will build a user object using the data returned from this function
      // and attach that to the request object
      return { ...payload };
    }
  }
}
