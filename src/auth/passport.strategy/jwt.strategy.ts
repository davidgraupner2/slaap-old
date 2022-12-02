import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /* 
  Passport.js first validates that the token supplied is valid/ decodes the token and then
  calls validate below - passing in the payload that was supplied in the token
  */
  async validate(payload: any) {
    // Passport.js will build a user object using the data returned from this function
    // and attach that to the request object
    return { userId: payload.sub, username: payload.username };
  }
}
