import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import * as authConstants from 'src/auth/constants';

@Injectable()
/* 
 We are leveraging the passpot.js strategies for authentocation
 - see: http://www.passportjs.org/concepts/authentication/strategies/
*/
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // This Passport js strategy calls this function to locally authenticate the user
  async validate(username: string, password: string): Promise<any> {
    /*
    If a user is returned from the AuthService - then the user was validated using the username and password
    */
    const user = await this.authService.validateUserLocally(username, password);
    if (!user) {
      throw new UnauthorizedException(authConstants.CREDENTIALS_INCORRECT);
    }

    // If the user was found - passport.js adds the user to the request object as req.user
    delete user.password;
    return user;
  }
}
