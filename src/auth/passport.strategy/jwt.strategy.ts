import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UsersService } from 'src/users/users.service';
import { ACCESS_TOKEN_REVOKED } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /* 
  Passport.js first validates that the token supplied is valid/ decodes the token and then
  calls validate below - passing in the payload that was supplied in the token
  - Validate must return either 'undefined' (the default) or an object to add to the payload
  - If 'undefined' is returned / access is denied and a 'Unauthorized' exception is thrown
  */
  async validate(payload: any) {
    // Get access to the current access token by the JTI (Access Token Id)
    // This is stored against the user record
    const access_token = await this.userService.getAccessToken(
      payload.sub,
      payload.jti,
    );

    // If the token is not revoked - continue
    if (access_token && access_token.revoked === false) {
      // Passport.js will build a user object using the data returned from this function
      // and attach that to the request object
      console.log('jwit: ', payload);
      return {
        id: payload.sub,
        username: payload.username,
        token_id: payload.jti,
      };
    }
  }
}
